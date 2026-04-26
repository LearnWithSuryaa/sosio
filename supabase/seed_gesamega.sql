-- ==============================================================================
-- SEED DATA: KUISIONER GESAMEGA
-- ==============================================================================

-- 1. Sesuaikan constraint score karena kuesioner ini memiliki 5 opsi jawaban (skor 1-5)
ALTER TABLE public.question_options DROP CONSTRAINT IF EXISTS question_options_score_check;
ALTER TABLE public.question_options ADD CONSTRAINT question_options_score_check CHECK (score BETWEEN 1 AND 5);

-- (Opsional) Kosongkan tabel pertanyaan sebelumnya jika Anda ingin mengganti soal kuis sepenuhnya
-- TRUNCATE TABLE public.questions CASCADE;

-- 2. Insert Questions
INSERT INTO public.questions (id, question_text, category) VALUES
(1, 'Seberapa sering Bapak/Ibu melihat siswa menggunakan gadget di luar konteks pembelajaran selama jam sekolah?', 'Survei GESAMEGA'),
(2, 'Sekolah kami memiliki aturan tertulis dan konsisten tentang penggunaan gadget oleh siswa.', 'Survei GESAMEGA'),
(3, 'Di mana lokasi paling sering siswa menggunakan gadget secara tidak produktif?', 'Survei GESAMEGA'),
(4, 'Kebijakan penggunaan gadget sudah dikomunikasikan ke siswa, wali murid, dan guru secara menyeluruh.', 'Survei GESAMEGA'),
(5, 'Guru-guru di sekolah kami memiliki kesepahaman dan sikap yang konsisten dalam menghadapi pelanggaran aturan gadget.', 'Survei GESAMEGA'),
(6, 'Penggunaan gadget siswa mengurangi konsentrasi dan partisipasi aktif mereka saat pembelajaran.', 'Survei GESAMEGA'),
(7, 'Saya mengamati perubahan pola interaksi antar-siswa (lebih banyak komunikasi lewat medsos daripada tatap muka).', 'Survei GESAMEGA'),
(8, 'Menurut pengamatan Bapak/Ibu, motivasi dominan siswa menggunakan gadget di kelas adalah:', 'Survei GESAMEGA'),
(9, 'Saya pernah mengintegrasikan gadget sebagai alat bantu pembelajaran secara sengaja dan terencana di kelas.', 'Survei GESAMEGA'),
(10, 'Sekolah telah melaksanakan program edukasi penggunaan gadget yang bijak secara terstruktur dan berkelanjutan.', 'Survei GESAMEGA'),
(11, 'Penggunaan gadget yang berlebihan telah mengubah cara siswa berinteraksi (lebih individualistis, kurang empati).', 'Survei GESAMEGA'),
(12, 'Secara umum, penggunaan gadget lebih banyak menjadi penghambat daripada alat bantu produktif dalam pembelajaran.', 'Survei GESAMEGA'),
(13, 'Terdapat kolaborasi aktif antara guru, wali kelas, dan orang tua dalam memantau penggunaan gadget siswa.', 'Survei GESAMEGA'),
(14, 'Budaya penggunaan gadget secara produktif dan bertanggung jawab sudah tertanam di lingkungan sekolah kami.', 'Survei GESAMEGA'),
(15, 'Sejauh mana sekolah memiliki mekanisme pengawasan penggunaan gadget yang sistematis?', 'Survei GESAMEGA'),
(16, 'Saya merasa memiliki kemampuan dan kepercayaan diri membimbing siswa menggunakan gadget secara bijak.', 'Survei GESAMEGA'),
(17, 'Orang tua siswa aktif berpartisipasi dan mendukung program pengelolaan gadget dari sekolah.', 'Survei GESAMEGA'),
(18, 'Siswa mampu secara mandiri membedakan informasi valid dari hoaks atau konten menyesatkan.', 'Survei GESAMEGA'),
(19, 'Seberapa sering Bapak/Ibu mengamati kasus cyberbullying atau konflik sosial yang dipicu gadget?', 'Survei GESAMEGA'),
(20, 'Sekolah saya bersedia menjadi fasilitator aktif dalam gerakan literasi digital kolaboratif (siswa, guru, orang tua).', 'Survei GESAMEGA')
ON CONFLICT (id) DO UPDATE SET question_text = EXCLUDED.question_text, category = EXCLUDED.category;

-- Reset sequence for questions (agar auto-increment selanjutnya berjalan dengan benar jika ada penambahan)
SELECT setval('public.questions_id_seq', (SELECT MAX(id) FROM public.questions));

-- 3. Insert Question Options
INSERT INTO public.question_options (question_id, option_text, score) VALUES
-- Q1
(1, 'Hampir tidak pernah', 1),
(1, 'Jarang (1-2x seminggu)', 2),
(1, 'Kadang-kadang (3-4x seminggu)', 3),
(1, 'Sering (hampir setiap hari)', 4),
(1, 'Selalu (setiap hari, di setiap kelas)', 5),
-- Q2
(2, 'Belum ada aturan sama sekali', 1),
(2, 'Ada aturan, tapi tidak tegas/tertulis', 2),
(2, 'Ada aturan tertulis, kurang konsisten', 3),
(2, 'Ada aturan tertulis dan cukup konsisten', 4),
(2, 'Ada aturan tertulis dan sangat konsisten', 5),
-- Q3
(3, 'Di dalam kelas saat guru menerangkan', 1),
(3, 'Di kantin atau area istirahat', 2),
(3, 'Di koridor atau halaman sekolah', 3),
(3, 'Di toilet atau ruang tertutup', 4),
(3, 'Di berbagai tempat secara merata', 5),
-- Q4
(4, 'Belum pernah disosialisasikan', 1),
(4, 'Sosialisasi terbatas/sepihak', 2),
(4, 'Cukup tersosialisasikan', 3),
(4, 'Tersosialisasikan dengan baik', 4),
(4, 'Tersosialisasikan sangat baik dan merata', 5),
-- Q5
(5, 'Sangat tidak konsisten', 1),
(5, 'Kurang konsisten', 2),
(5, 'Cukup konsisten', 3),
(5, 'Konsisten', 4),
(5, 'Sangat konsisten', 5),
-- Q6
(6, 'Sangat tidak setuju', 1),
(6, 'Tidak setuju', 2),
(6, 'Netral', 3),
(6, 'Setuju', 4),
(6, 'Sangat setuju', 5),
-- Q7
(7, 'Sangat tidak setuju', 1),
(7, 'Tidak setuju', 2),
(7, 'Netral', 3),
(7, 'Setuju', 4),
(7, 'Sangat setuju', 5),
-- Q8
(8, 'Hiburan dan konsumsi konten', 1),
(8, 'Mencari referensi pelajaran', 2),
(8, 'Komunikasi dengan teman', 3),
(8, 'Kebiasaan tanpa tujuan jelas', 4),
(8, 'Campuran beberapa motivasi di atas', 5),
-- Q9
(9, 'Tidak pernah', 1),
(9, 'Jarang', 2),
(9, 'Kadang-kadang', 3),
(9, 'Sering', 4),
(9, 'Selalu', 5),
-- Q10
(10, 'Belum pernah', 1),
(10, 'Pernah, tapi tidak terstruktur', 2),
(10, 'Cukup terstruktur', 3),
(10, 'Terstruktur dengan baik', 4),
(10, 'Sangat terstruktur dan berkelanjutan', 5),
-- Q11
(11, 'Sangat tidak setuju', 1),
(11, 'Tidak setuju', 2),
(11, 'Netral', 3),
(11, 'Setuju', 4),
(11, 'Sangat setuju', 5),
-- Q12
(12, 'Sangat tidak setuju', 1),
(12, 'Tidak setuju', 2),
(12, 'Netral', 3),
(12, 'Setuju', 4),
(12, 'Sangat setuju', 5),
-- Q13
(13, 'Sangat tidak aktif', 1),
(13, 'Kurang aktif', 2),
(13, 'Cukup aktif', 3),
(13, 'Aktif', 4),
(13, 'Sangat aktif', 5),
-- Q14
(14, 'Sangat tidak setuju', 1),
(14, 'Tidak setuju', 2),
(14, 'Netral', 3),
(14, 'Setuju', 4),
(14, 'Sangat setuju', 5),
-- Q15
(15, 'Belum ada mekanisme sama sekali', 1),
(15, 'Ada aturan lisan, tidak tertulis', 2),
(15, 'Ada aturan tertulis, tidak konsisten', 3),
(15, 'Ada sistem pengawasan formal rutin', 4),
(15, 'Ada sistem berbasis data/teknologi terintegrasi', 5),
-- Q16
(16, 'Sangat tidak percaya diri', 1),
(16, 'Kurang percaya diri', 2),
(16, 'Cukup percaya diri', 3),
(16, 'Percaya diri', 4),
(16, 'Sangat percaya diri', 5),
-- Q17
(17, 'Sangat tidak aktif', 1),
(17, 'Kurang aktif', 2),
(17, 'Cukup aktif', 3),
(17, 'Aktif', 4),
(17, 'Sangat aktif', 5),
-- Q18
(18, 'Sangat tidak mampu', 1),
(18, 'Kurang mampu', 2),
(18, 'Cukup mampu', 3),
(18, 'Mampu', 4),
(18, 'Sangat mampu', 5),
-- Q19 (hanya 4 opsi di dokumen)
(19, 'Tidak pernah', 1),
(19, '1-2 kasus per tahun', 2),
(19, '3-5 kasus per tahun', 3),
(19, 'Lebih dari 5 kasus per tahun', 4),
-- Q20 (di dokumen tertulis no 21)
(20, 'Tidak bersedia', 1),
(20, 'Kurang bersedia', 2),
(20, 'Cukup bersedia', 3),
(20, 'Bersedia', 4),
(20, 'Sangat bersedia', 5);
