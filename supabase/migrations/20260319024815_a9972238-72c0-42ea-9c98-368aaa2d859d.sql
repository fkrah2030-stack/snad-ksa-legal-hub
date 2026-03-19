-- Add lawyer role
INSERT INTO public.user_roles (user_id, role)
VALUES ('3f2cb49c-edf6-43be-b389-8b669436acf5', 'lawyer')
ON CONFLICT DO NOTHING;

-- Create lawyer profile
INSERT INTO public.lawyers (name, specialty, city, phone, email, experience_years, price_per_hour, bio, is_active, is_verified, user_id)
VALUES ('أ. خالد المحامي', 'قانون مدني', 'جدة', '+966550001234', 'lawyer.demo@gmail.com', 8, 350, 'محامٍ متخصص في القضايا المدنية والحقوقية', true, true, '3f2cb49c-edf6-43be-b389-8b669436acf5');