-- Lawyer services table
CREATE TABLE public.lawyer_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid NOT NULL REFERENCES public.lawyers(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  price integer NOT NULL DEFAULT 0,
  allow_chat boolean NOT NULL DEFAULT true,
  allow_call boolean NOT NULL DEFAULT false,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.lawyer_services ENABLE ROW LEVEL SECURITY;

-- Lawyers can manage their own services
CREATE POLICY "Lawyers can manage own services"
  ON public.lawyer_services FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.lawyers WHERE lawyers.id = lawyer_services.lawyer_id AND lawyers.user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.lawyers WHERE lawyers.id = lawyer_services.lawyer_id AND lawyers.user_id = auth.uid())
  );

-- Anyone can view active services
CREATE POLICY "Anyone can view active lawyer services"
  ON public.lawyer_services FOR SELECT
  TO public
  USING (is_active = true);

-- Admins can manage all
CREATE POLICY "Admins can manage all lawyer services"
  ON public.lawyer_services FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));

-- Case requests table
CREATE TABLE public.case_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lawyer_id uuid NOT NULL REFERENCES public.lawyers(id) ON DELETE CASCADE,
  client_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  service_id uuid REFERENCES public.lawyer_services(id) ON DELETE SET NULL,
  title text NOT NULL,
  description text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending',
  contact_method text NOT NULL DEFAULT 'chat',
  client_name text NOT NULL DEFAULT '',
  client_phone text,
  budget integer DEFAULT 0,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.case_requests ENABLE ROW LEVEL SECURITY;

-- Lawyers can view/manage requests sent to them
CREATE POLICY "Lawyers can manage their case requests"
  ON public.case_requests FOR ALL
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM public.lawyers WHERE lawyers.id = case_requests.lawyer_id AND lawyers.user_id = auth.uid())
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM public.lawyers WHERE lawyers.id = case_requests.lawyer_id AND lawyers.user_id = auth.uid())
  );

-- Clients can create and view their own requests
CREATE POLICY "Clients can create case requests"
  ON public.case_requests FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());

CREATE POLICY "Clients can view own case requests"
  ON public.case_requests FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

-- Admins can manage all
CREATE POLICY "Admins can manage all case requests"
  ON public.case_requests FOR ALL
  TO authenticated
  USING (has_role(auth.uid(), 'admin'))
  WITH CHECK (has_role(auth.uid(), 'admin'));