-- Enable uuid-ossp extension for uuid generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Table: schools
CREATE TYPE school_status AS ENUM ('belum', 'survei', 'komitmen');
CREATE TYPE validation_status AS ENUM ('pending', 'valid', 'flagged');

CREATE TABLE IF NOT EXISTS public.schools (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_sekolah TEXT NOT NULL,
  wilayah TEXT,
  latitude FLOAT NOT NULL,
  longitude FLOAT NOT NULL,
  status school_status DEFAULT 'belum',
  status_validasi validation_status DEFAULT 'pending',
  pengirim_nama TEXT,
  ip_address TEXT,
  submit_timestamp TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Table: survey_results
CREATE TABLE IF NOT EXISTS public.survey_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama TEXT,
  nama_sekolah TEXT NOT NULL,
  jawaban JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: commitments
-- Assuming penanggung_jawab indicates the person in charge
CREATE TABLE IF NOT EXISTS public.commitments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  nama_sekolah TEXT NOT NULL,
  penanggung_jawab TEXT NOT NULL,
  signature_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: case_studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  sekolah TEXT NOT NULL,
  penulis TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: quiz_results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  answers JSONB NOT NULL,
  result_category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Allow public access (Since we disabled auth per requirements)
-- This creates explicit bypass policies or just enables them for public schemas.
-- IMPORTANT: Make sure RLS is disabled or allows anonymous read/writes.

ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;

-- Creating open policies for our completely public app
CREATE POLICY "Public read/write access for schools" ON public.schools FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for survey_results" ON public.survey_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for commitments" ON public.commitments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for case_studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for quiz_results" ON public.quiz_results FOR ALL USING (true) WITH CHECK (true);

-- Setting up storage if managed via SQL (for signatures)
-- Please manually ensure 'signatures' bucket is public.
INSERT INTO storage.buckets (id, name, public) VALUES ('signatures', 'signatures', true) ON CONFLICT DO NOTHING;
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (bucket_id = 'signatures');
