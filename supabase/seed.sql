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
INSERT INTO public.case_studies (judul, isi, school_id, penulis, category, impact, badge)
VALUES
  (
    'Penerapan Loker HP Saat Jam KBM', 
    'Menerapkan sistem loker hp setiap awal kelas. Awalnya siswa keberatan, namun dalam 3 bulan fokus belajar meningkat 40%. Tingkat nilai rata-rata ujian harian juga mengalami peningkatan yang signifikan karena minimnya distraksi di jam produktif.', 
    (SELECT id FROM public.schools WHERE nama_sekolah = 'SMPN 3 Bandung' LIMIT 1), 
    'Kepala Sekolah',
    'regulasi',
    '+42% Fokus Belajar',
    'Terpopuler'
  ),
  (
    'Duta Digital Sebaya', 
    'Siswa yang memahami literasi digital dipilih sebagai duta sebaya untuk mengedukasi teman-temannya menghindari cyberbullying. Mereka dilatih menyebarkan vibe positif di media sosial sehingga menciptakan ruang lingkup pergaulan online yang aman secara mental.', 
    (SELECT id FROM public.schools WHERE nama_sekolah = 'SMAN 5 Surabaya' LIMIT 1), 
    'Guru BK',
    'literasi',
    '90% Kasus Teratasi',
    'Inovatif'
  ),
  (
    'Hari Tanpa Gawai', 
    'Setiap hari Jumat, sekolah mendeklarasikan area bebas dari perangkat elektronik non-belajar. Guru dan siswa didorong untuk bersosialisasi secara langsung. Hasilnya, keakraban sosial antar murid menjadi lebih kuat dan nyata.', 
    (SELECT id FROM public.schools WHERE nama_sekolah = 'SMAN 1 Jakarta' LIMIT 1), 
    'Dewan Guru',
    'pembelajaran',
    '100% Keterlibatan',
    'Praktik Baik'
  );

-- 5. Insert Quiz Results (Anonim)
INSERT INTO public.quiz_results (answers, result_category)
VALUES
  ('[1, 2, 0, 1, 1]'::jsonb, 'Sadar Namun Tergoda'),
  ('[2, 2, 2, 2, 2]'::jsonb, 'Disiplin & Terkendali'),
  ('[0, 0, 0, 0, 1]'::jsonb, 'Fase Waspada (Addicted)'),
  ('[1, 1, 1, 1, 1]'::jsonb, 'Sadar Namun Tergoda');

-- 6. Insert Questions
INSERT INTO public.questions (id, question_text, category)
VALUES
  (1, 'Saat ada notifikasi masuk saat belajar/bekerja, apa yang Anda lakukan?', 'Refleksi Digital'),
  (2, 'Hal terakhir yang Anda lakukan sebelum tidur?', 'Refleksi Digital'),
  (3, 'Pernahkah Anda merasa cemas saat HP Anda tertinggal di rumah?', 'Refleksi Digital'),
  (4, 'Berapa jam Anda menghabiskan waktu di aplikasi non-produktif sehari?', 'Refleksi Digital'),
  (5, 'Pernahkah Anda menunda tugas penting hanya untuk bermain game/medsos?', 'Refleksi Digital')
ON CONFLICT (id) DO UPDATE SET question_text = EXCLUDED.question_text;

-- Reset sequence for questions
SELECT setval('public.questions_id_seq', (SELECT MAX(id) FROM public.questions));

-- 7. Insert Question Options
INSERT INTO public.question_options (question_id, option_text, score)
VALUES
  (1, 'Langsung buka seketika, apapun itu.', 0),
  (1, 'Cek sekilas, kalau penting dibalas, kalau tidak nanti.', 1),
  (1, 'Abaikan sampai jam istirahat.', 2),
  
  (2, 'Scroll medsos/nonton video sampai tertidur.', 0),
  (2, 'Main HP sebentar lalu dicas jauh dari kasur.', 1),
  (2, 'Membaca buku atau ngobrol, tidak pakai HP sama sekali.', 2),
  
  (3, 'Sangat cemas, seperti kehilangan organ tubuh.', 0),
  (3, 'Sedikit cemas jika ada yang penting, tapi masih bisa ditolerir.', 1),
  (3, 'Biasa saja, sekalian detox layar.', 2),
  
  (4, 'Lebih dari 5 jam.', 0),
  (4, 'Sekitar 2 - 4 jam.', 1),
  (4, 'Kurang dari 2 jam.', 2),
  
  (5, 'Sering sekali, ini masalah besar saya.', 0),
  (5, 'Kadang-kadang, tapi akhirnya tugas selesai juga.', 1),
  (5, 'Hampir tidak pernah, prioritas tetap dijaga.', 2);
