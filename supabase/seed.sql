-- SEED DATA UNTUK PLATFORM EKOSISTEM DIGITAL 2026

-- 1. Insert Schools
INSERT INTO public.schools (id, nama_sekolah, latitude, longitude, status)
VALUES
  (uuid_generate_v4(), 'SMAN 1 Jakarta', -6.1751, 106.8272, 'komitmen'),
  (uuid_generate_v4(), 'SMPN 3 Bandung', -6.9175, 107.6191, 'komitmen'),
  (uuid_generate_v4(), 'SMAN 5 Surabaya', -7.2504, 112.7688, 'survei'),
  (uuid_generate_v4(), 'SMK Telkom Malang', -7.9839, 112.6214, 'belum'),
  (uuid_generate_v4(), 'SMPN 1 Denpasar', -8.6500, 115.2167, 'survei'),
  (uuid_generate_v4(), 'SMA Muhammadiyah 1 Yogyakarta', -7.7956, 110.3695, 'komitmen')
ON CONFLICT DO NOTHING;

-- 2. Insert Survey Results (Tersambung nama sekolah)
INSERT INTO public.survey_results (nama, nama_sekolah, jawaban)
VALUES
  ('Budi Santoso', 'SMAN 5 Surabaya', '{"q1": "1 - 3 jam", "q2": "Ada, tapi tidak tegas", "q3": "Biasa Saja"}'::jsonb),
  ('Andi Setiawan', 'SMAN 5 Surabaya', '{"q1": "> 3 jam", "q2": "Ya, sangat ketat", "q3": "Mengganggu"}'::jsonb),
  ('Siti Aminah', 'SMPN 1 Denpasar', '{"q1": "< 1 jam", "q2": "Tidak ada", "q3": "Sangat Membantu"}'::jsonb),
  ('Anonim', 'SMAN 1 Jakarta', '{"q1": "1 - 3 jam", "q2": "Ya, sangat ketat", "q3": "Sangat Membantu"}'::jsonb);

-- 3. Insert Commitments
INSERT INTO public.commitments (nama_sekolah, penanggung_jawab, signature_url)
VALUES
  ('SMAN 1 Jakarta', 'Drs. Supriyadi, M.Pd.', 'https://placeholder.co/200x100?text=Signature'),
  ('SMPN 3 Bandung', 'Hj. Ratna Ningsih, S.Pd.', 'https://placeholder.co/200x100?text=Signature'),
  ('SMA Muhammadiyah 1 Yogyakarta', 'Ahmad Dahlan, M.A.', 'https://placeholder.co/200x100?text=Signature');

-- 4. Insert Case Studies
INSERT INTO public.case_studies (judul, isi, sekolah, penulis)
VALUES
  (
    'Penerapan Loker HP Saat Jam KBM', 
    'Menerapkan sistem loker hp setiap awal kelas. Awalnya siswa keberatan, namun dalam 3 bulan fokus belajar meningkat 40%. Tingkat nilai rata-rata ujian harian juga mengalami peningkatan yang signifikan karena minimnya distraksi di jam produktif.', 
    'SMAN 3 Bandung', 
    'Kepala Sekolah SMAN 3'
  ),
  (
    'Duta Digital Sebaya', 
    'Siswa yang memahami literasi digital dipilih sebagai duta sebaya untuk mengedukasi teman-temannya menghindari cyberbullying. Mereka dilatih menyebarkan vibe positif di media sosial sehingga menciptakan ruang lingkup pergaulan online yang aman secara mental.', 
    'SMPN 1 Surabaya', 
    'Guru BK'
  ),
  (
    'Hari Tanpa Gawai', 
    'Setiap hari Jumat, sekolah mendeklarasikan area bebas dari perangkat elektronik non-belajar. Guru dan siswa didorong untuk bersosialisasi secara langsung. Hasilnya, keakraban sosial antar murid menjadi lebih kuat dan nyata.', 
    'SMAN 1 Jakarta', 
    'Dewan Guru'
  );

-- 5. Insert Quiz Results (Anonim)
INSERT INTO public.quiz_results (answers, result_category)
VALUES
  ('[1, 2, 0, 1, 1]'::jsonb, 'Sadar Namun Tergoda'),
  ('[2, 2, 2, 2, 2]'::jsonb, 'Disiplin & Terkendali'),
  ('[0, 0, 0, 0, 1]'::jsonb, 'Fase Waspada (Addicted)'),
  ('[1, 1, 1, 1, 1]'::jsonb, 'Sadar Namun Tergoda');
