import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface LeadData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  loanAmount?: string;
  purpose?: string;
  message?: string;
  source?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiToken = Deno.env.get("PIPEDRIVE_API_TOKEN");
    if (!apiToken) {
      console.error("PIPEDRIVE_API_TOKEN not configured");
      throw new Error("Pipedrive API token not configured");
    }

    const leadData: LeadData = await req.json();
    console.log("Received lead data:", { 
      name: `${leadData.firstName} ${leadData.lastName}`,
      email: leadData.email,
      source: leadData.source 
    });

    // Build note content
    const noteContent = [
      `Phone: ${leadData.phone}`,
      leadData.loanAmount ? `Loan Amount: ${leadData.loanAmount}` : null,
      leadData.purpose ? `Purpose: ${leadData.purpose}` : null,
      leadData.message ? `Message: ${leadData.message}` : null,
      `Source: ${leadData.source || 'website'}`,
    ].filter(Boolean).join('\n');

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
      throw new Error(personResult.error || "Failed to create person");
    }

    const personId = personResult.data.id;
    console.log("Created person in Pipedrive:", personId);

    // Create lead in Pipedrive
    const leadTitle = leadData.purpose 
      ? `${leadData.firstName} ${leadData.lastName} - ${leadData.purpose}`
      : `${leadData.firstName} ${leadData.lastName} - Home Loan Enquiry`;

    const leadResponse = await fetch(
      `https://api.pipedrive.com/v1/leads?api_token=${apiToken}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: leadTitle,
          person_id: personId,
          note: noteContent,
        }),
      }
    );

    const leadResult = await leadResponse.json();

    if (!leadResult.success) {
      console.error("Failed to create lead in Pipedrive:", leadResult);
      throw new Error(leadResult.error || "Failed to create lead");
    }

    console.log("Created lead in Pipedrive:", leadResult.data.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        personId: personId,
        leadId: leadResult.data.id 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error("Error in create-pipedrive-lead function:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
