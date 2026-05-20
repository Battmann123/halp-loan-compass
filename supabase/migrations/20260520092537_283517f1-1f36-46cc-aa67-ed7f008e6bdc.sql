CREATE TABLE public.lead_submission_rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  count integer NOT NULL DEFAULT 1,
  window_start timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX idx_lead_rate_limits_ip ON public.lead_submission_rate_limits(ip_address);
CREATE INDEX idx_lead_rate_limits_window ON public.lead_submission_rate_limits(window_start);

ALTER TABLE public.lead_submission_rate_limits ENABLE ROW LEVEL SECURITY;

-- No policies = only service role (used by edge function) can access. Public users get nothing.
