import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const ALLOWED_ORIGINS = [
  "https://halp-loan-compass.lovable.app",
  "https://id-preview--297bb8ad-8717-4b71-a93d-007c21542d2f.lovable.app",
  "http://localhost:5173",
  "http://localhost:8080",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };
}

const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60 * 60 * 1000; // 1 hour

const supabaseAdmin = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  { auth: { persistSession: false } }
);

// Persistent rate limiter backed by Postgres. Survives cold starts and is shared across instances.
async function isRateLimited(ip: string): Promise<boolean> {
  const now = new Date();
  const windowCutoff = new Date(now.getTime() - RATE_WINDOW_MS);

  const { data: existing, error: selectError } = await supabaseAdmin
    .from("lead_submission_rate_limits")
    .select("id, count, window_start")
    .eq("ip_address", ip)
    .maybeSingle();

  if (selectError) {
    console.error("Rate limit lookup failed:", selectError);
    return false; // Fail-open to avoid blocking legit users on transient DB issues
  }

  // No record, or current window has expired -> reset
  if (!existing || new Date(existing.window_start) < windowCutoff) {
    const { error: upsertError } = await supabaseAdmin
      .from("lead_submission_rate_limits")
      .upsert(
        { ip_address: ip, count: 1, window_start: now.toISOString(), updated_at: now.toISOString() },
        { onConflict: "ip_address" }
      );
    if (upsertError) console.error("Rate limit reset failed:", upsertError);
    return false;
  }

  if (existing.count >= RATE_LIMIT) return true;

  const { error: updateError } = await supabaseAdmin
    .from("lead_submission_rate_limits")
    .update({ count: existing.count + 1, updated_at: now.toISOString() })
    .eq("id", existing.id);
  if (updateError) console.error("Rate limit increment failed:", updateError);
  return false;
}

// Input validation schema
const leadDataSchema = z.object({
  firstName: z.string().trim().min(1).max(100),
  lastName: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().regex(/^[0-9+\s()-]{8,20}$/),
  loanAmount: z.string().trim().max(50).optional(),
  purpose: z.string().max(50).optional(),
  message: z.string().trim().max(1000).optional(),
  source: z.string().max(100).optional(),
  // Honeypot field - must be empty
  website: z.string().max(0).optional(),
});

const handler = async (req: Request): Promise<Response> => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting by IP - use Cloudflare's verified client IP, falling back to the
    // rightmost X-Forwarded-For entry (Cloudflare appends the real IP to the right).
    // The leftmost XFF value is attacker-controlled and must NOT be trusted.
    const cfIp = req.headers.get("cf-connecting-ip")?.trim();
    const xffParts = req.headers.get("x-forwarded-for")?.split(",") ?? [];
    const xffIp = xffParts.length ? xffParts[xffParts.length - 1].trim() : "";
    const ip = cfIp || xffIp || "unknown";
    if (await isRateLimited(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Enforce max body size (~10KB)
    const contentLength = parseInt(req.headers.get("content-length") || "0");
    if (contentLength > 10240) {
      return new Response(
        JSON.stringify({ error: "Request too large" }),
        { status: 413, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const apiToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (!apiToken) {
      console.error("PIPEDRIVE_API_TOKEN not configured");
      return new Response(
        JSON.stringify({ error: "Service configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Validate input
    const raw = await req.json();
    const result = leadDataSchema.safeParse(raw);
    if (!result.success) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const leadData = result.data;

    // Honeypot check - if website field has content, it's a bot
    if (leadData.website && leadData.website.length > 0) {
      // Silently accept to not tip off bots
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log("Received lead data:", {
      name: `${leadData.firstName} ${leadData.lastName}`,
      email: leadData.email,
      source: leadData.source,
    });

    // Build note content
    const noteContent = [
      `Phone: ${leadData.phone}`,
      leadData.loanAmount ? `Loan Amount: ${leadData.loanAmount}` : null,
      leadData.purpose ? `Purpose: ${leadData.purpose}` : null,
      leadData.message ? `Message: ${leadData.message}` : null,
      `Source: ${leadData.source || "website"}`,
    ].filter(Boolean).join("\n");

    // Create person in Pipedrive
    const personResponse = await fetch(
      `https://api.pipedrive.com/v1/persons?api_token=${apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${leadData.firstName} ${leadData.lastName}`,
          email: [{ value: leadData.email, primary: true }],
          phone: [{ value: leadData.phone, primary: true }],
        }),
      }
    );

    const personResult = await personResponse.json();

    if (!personResult.success) {
      console.error("Failed to create person in Pipedrive:", personResult);
      return new Response(
        JSON.stringify({ error: "Failed to process your request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const personId = personResult.data.id;
    console.log("Created person in Pipedrive:", personId);

    // Create lead in Pipedrive
    const source = leadData.source || "website";
    const leadTitle = leadData.purpose
      ? `${leadData.firstName} ${leadData.lastName} - ${leadData.purpose} [${source}]`
      : `${leadData.firstName} ${leadData.lastName} - Home Loan Enquiry [${source}]`;

    const leadResponse = await fetch(
      `https://api.pipedrive.com/v1/leads?api_token=${apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: leadTitle,
          person_id: personId,
        }),
      }
    );

    const leadResult = await leadResponse.json();

    if (!leadResult.success) {
      console.error("Failed to create lead in Pipedrive:", leadResult);
      return new Response(
        JSON.stringify({ error: "Failed to process your request" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const leadId = leadResult.data.id;
    console.log("Created lead in Pipedrive:", leadId);

    // Add note to the lead
    const noteResponse = await fetch(
      `https://api.pipedrive.com/v1/notes?api_token=${apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: noteContent,
          lead_id: leadId,
        }),
      }
    );

    const noteResult = await noteResponse.json();
    if (!noteResult.success) {
      console.warn("Failed to add note to lead:", noteResult);
    } else {
      console.log("Added note to lead:", noteResult.data.id);
    }

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in create-pipedrive-lead function:", errorMessage);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
