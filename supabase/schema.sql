-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Cleanup existing tables and types (CAUTION: This will delete all data)
DROP TABLE IF EXISTS public.quiz_answers CASCADE;
DROP TABLE IF EXISTS public.question_options CASCADE;
DROP TABLE IF EXISTS public.questions CASCADE;
DROP TABLE IF EXISTS public.quiz_results CASCADE;
DROP TABLE IF EXISTS public.case_studies CASCADE;
DROP TABLE IF EXISTS public.commitments CASCADE;
DROP TABLE IF EXISTS public.survey_results CASCADE;
DROP TABLE IF EXISTS public.schools CASCADE;
DROP TYPE IF EXISTS school_status CASCADE;
DROP TYPE IF EXISTS validation_status CASCADE;
DROP TABLE IF EXISTS public.articles CASCADE;

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
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  nama TEXT,
  jawaban JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Table: commitments
CREATE TABLE IF NOT EXISTS public.commitments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  penanggung_jawab TEXT NOT NULL,
  signature_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Table: case_studies
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID NOT NULL REFERENCES public.schools(id) ON DELETE CASCADE,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  penulis TEXT NOT NULL,
  category VARCHAR(50) NOT NULL DEFAULT 'inovasi',
  impact VARCHAR(100),
  badge VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Table: quiz_results
CREATE TABLE IF NOT EXISTS public.quiz_results (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
  user_name TEXT,
  answers JSONB NOT NULL,
  result_category TEXT NOT NULL,
  qualification VARCHAR(50),
  indicator_color VARCHAR(20),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Table: questions
CREATE TABLE IF NOT EXISTS public.questions (
  id SERIAL PRIMARY KEY,
  question_text TEXT NOT NULL,
  category VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Table: question_options
CREATE TABLE IF NOT EXISTS public.question_options (
  id SERIAL PRIMARY KEY,
  question_id INT REFERENCES public.questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  score INT NOT NULL CHECK (score BETWEEN 0 AND 3),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Table: quiz_answers
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id SERIAL PRIMARY KEY,
  quiz_result_id UUID REFERENCES public.quiz_results(id) ON DELETE CASCADE,
  question_id INT REFERENCES public.questions(id),
  option_id INT REFERENCES public.question_options(id),
  score INT NOT NULL
);

-- 9. Table: articles
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  judul TEXT NOT NULL,
  isi TEXT NOT NULL,
  penulis TEXT NOT NULL,
  kategori VARCHAR(50),
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexing Strategy (Oracle Optimization Patterns)

-- B-Tree Indexes on Foreign Keys (Crucial for Join Performance)
CREATE INDEX IF NOT EXISTS idx_survey_results_school_id ON public.survey_results(school_id);
CREATE INDEX IF NOT EXISTS idx_commitments_school_id ON public.commitments(school_id);
CREATE INDEX IF NOT EXISTS idx_case_studies_school_id ON public.case_studies(school_id);
CREATE INDEX IF NOT EXISTS idx_quiz_results_school_id ON public.quiz_results(school_id);

-- Composite Index for Map/Dashboard Filtering
-- Optimizes queries filtering by both status and validation status
CREATE INDEX IF NOT EXISTS idx_schools_status_validation ON public.schools(status, status_validasi);

-- Index on Wilayah for Region-based Lookups
CREATE INDEX IF NOT EXISTS idx_schools_wilayah ON public.schools(wilayah);

-- Index for searching school names (Case Insensitive pattern matching)
CREATE INDEX IF NOT EXISTS idx_schools_nama_trgm ON public.schools USING gin (nama_sekolah gin_trgm_ops);

-- Allow public access
ALTER TABLE public.schools ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.survey_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commitments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Creating open policies
CREATE POLICY "Public read/write access for schools" ON public.schools FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for survey_results" ON public.survey_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for commitments" ON public.commitments FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for case_studies" ON public.case_studies FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for quiz_results" ON public.quiz_results FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read access for questions" ON public.questions FOR SELECT USING (true);
CREATE POLICY "Public read access for question_options" ON public.question_options FOR SELECT USING (true);
CREATE POLICY "Public read/write access for quiz_answers" ON public.quiz_answers FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Public read/write access for articles" ON public.articles FOR ALL USING (true) WITH CHECK (true);

-- Setting up storage
INSERT INTO storage.buckets (id, name, public) VALUES ('signatures', 'signatures', true) ON CONFLICT DO NOTHING;
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR ALL USING (bucket_id = 'signatures');
