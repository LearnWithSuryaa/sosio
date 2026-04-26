-- ==============================================================================
-- SEED DATA: KUIS SISWA
-- ==============================================================================

-- Pastikan tabel question_options menerima skor 1 hingga 5.
ALTER TABLE public.question_options DROP CONSTRAINT IF EXISTS question_options_score_check;
ALTER TABLE public.question_options ADD CONSTRAINT question_options_score_check CHECK (score BETWEEN 1 AND 5);

-- (Opsional) Kosongkan pertanyaan Kuis Siswa yang lama jika ingin diulang.
-- DELETE FROM public.questions WHERE category = 'Kuis Siswa';

-- Menentukan ID awal agar tidak bentrok, kita asumsikan mulai dari ID 100
-- 1. Insert Questions
INSERT INTO public.questions (id, question_text, category) VALUES
(101, 'Berapa lama rata-rata Anda menggunakan gadget dalam sehari untuk keperluan di luar belajar?', 'Kuis Siswa'),
(102, 'Apakah Anda pernah merasa cemas atau gelisah saat gadget tidak berada dalam jangkauan tangan?', 'Kuis Siswa'),
(103, 'Saat mengerjakan tugas sekolah, apakah Anda membuka media sosial atau bermain game di waktu yang sama?', 'Kuis Siswa'),
(104, 'Apakah Anda menggunakan gadget di kamar mandi atau saat makan bersama keluarga?', 'Kuis Siswa'),
(105, 'Bagaimana reaksi Anda jika guru atau orang tua meminta Anda meletakkan gadget saat belajar?', 'Kuis Siswa'),
(106, 'Seberapa sering Anda mengecek media sosial atau pesan singkat di tengah malam hingga mengganggu waktu tidur?', 'Kuis Siswa'),
(107, 'Apakah Anda memiliki target durasi penggunaan gadget harian yang Anda usahakan untuk tidak dilampaui?', 'Kuis Siswa'),
(108, 'Saat belajar kelompok secara langsung dengan teman, apakah Anda tetap memegang gadget?', 'Kuis Siswa'),
(109, 'Apakah Anda pernah menyembunyikan penggunaan gadget dari orang tua atau guru?', 'Kuis Siswa'),
(110, 'Menurut Anda, seberapa penting gadget untuk mendukung prestasi belajar Anda?', 'Kuis Siswa'),
(111, 'Apakah Anda pernah merasa menyesal karena terlalu lama menggunakan gadget hingga melalaikan kewajiban (ibadah, belajar, membantu orang tua)?', 'Kuis Siswa'),
(112, 'Saat Anda sedang asyik bermain game atau scrolling media sosial, apakah Anda masih sadar dengan waktu yang berlalu?', 'Kuis Siswa'),
(113, 'Apakah Anda setuju bahwa sekolah perlu memiliki aturan bersama tentang kapan dan di mana gadget boleh digunakan?', 'Kuis Siswa'),
(114, 'Jika ada platform seperti GESAMEGA yang membantu siswa mengelola penggunaan gadget secara bijak, apakah Anda bersedia berpartisipasi aktif?', 'Kuis Siswa'),
(115, 'Berapa kali dalam sehari Anda membuka media sosial hanya untuk "mengecek sebentar" tetapi berakhir lama?', 'Kuis Siswa'),
(116, 'Apakah Anda menggunakan gadget saat jam istirahat sekolah untuk bermain game atau bersosial media, bukan untuk berinteraksi dengan teman secara langsung?', 'Kuis Siswa'),
(117, 'Seberapa sering Anda membuka gadget di saat pertama kali bangun tidur (sebelum cuci muka atau berdoa)?', 'Kuis Siswa'),
(118, 'Apakah Anda pernah menggunakan gadget untuk mencari informasi tambahan terkait pelajaran di luar jam sekolah?', 'Kuis Siswa'),
(119, 'Jika Anda melihat teman sekelas menulis komentar yang menghina atau mempermalukan siswa lain di media sosial, apa yang akan Anda lakukan?', 'Kuis Siswa'),
(120, 'Pernahkah Anda menerima pesan yang menyakitkan, ancaman, atau ejekan melalui media sosial atau aplikasi pesan?', 'Kuis Siswa'),
(121, 'Menurut Anda, apakah menyebarkan foto atau video teman tanpa izin (termasuk ke grup kelas) termasuk bentuk cyber bullying?', 'Kuis Siswa'),
(122, 'Ketika Anda marah atau kesal dengan seseorang, apakah Anda pernah menulis status atau postingan yang bernada menyerang, meskipun tanpa menyebut nama?', 'Kuis Siswa'),
(123, 'Sebelum membagikan informasi atau berita yang Anda terima di media sosial, apakah Anda biasanya memeriksa kebenarannya terlebih dahulu?', 'Kuis Siswa'),
(124, 'Jika Anda secara tidak sengaja melihat teman Anda sedang menjadi korban cyber bullying di grup WhatsApp atau media sosial, apa tindakan Anda?', 'Kuis Siswa')
ON CONFLICT (id) DO UPDATE SET question_text = EXCLUDED.question_text, category = EXCLUDED.category;

-- Reset sequence for questions
SELECT setval('public.questions_id_seq', (SELECT MAX(id) FROM public.questions));

-- 2. Insert Question Options
INSERT INTO public.question_options (question_id, option_text, score) VALUES
-- 101
(101, 'Lebih dari 7 jam', 1),
(101, '4–7 jam', 2),
(101, 'Kurang dari 4 jam', 3),
-- 102
(102, 'Sering, saya merasa tidak nyaman jika gadget jauh', 1),
(102, 'Kadang-kadang, tetapi masih bisa beraktivitas', 2),
(102, 'Tidak pernah, saya bisa tanpa gadget seharian', 3),
-- 103
(103, 'Sering, saya sulit fokus tanpa membuka yang lain', 1),
(103, 'Kadang-kadang, jika tugas terasa membosankan', 2),
(103, 'Tidak pernah, saya fokus menyelesaikan tugas dulu', 3),
-- 104
(104, 'Sering, gadget selalu bersama saya di mana pun', 1),
(104, 'Kadang-kadang, tergantung situasi', 2),
(104, 'Tidak pernah, ada waktu dan tempat yang tepat', 3),
-- 105
(105, 'Merasa kesal atau sulit menurut', 1),
(105, 'Menuruti tetapi dengan berat hati', 2),
(105, 'Memahami dan segera menuruti dengan sadar', 3),
-- 106
(106, 'Sering, hampir setiap malam', 1),
(106, 'Kadang-kadang, 1–2 kali dalam seminggu', 2),
(106, 'Tidak pernah, gadget saya tinggalkan sebelum tidur', 3),
-- 107
(107, 'Tidak pernah memikirkan durasi penggunaan', 1),
(107, 'Pernah berpikir tetapi sulit menjalankannya', 2),
(107, 'Ya, saya memiliki batasan dan berusaha mematuhinya', 3),
-- 108
(108, 'Sering, saya tetap membuka gadget meskipun sedang diskusi', 1),
(108, 'Kadang-kadang, jika ada notifikasi penting', 2),
(108, 'Tidak, saya fokus berdiskusi dengan teman', 3),
-- 109
(109, 'Sering, saya menggunakan gadget secara sembunyi-sembunyi', 1),
(109, 'Kadang-kadang, jika sedang bermain game di jam belajar', 2),
(109, 'Tidak pernah, saya terbuka tentang penggunaan gadget saya', 3),
-- 110
(110, 'Sangat penting, tanpa gadget saya tidak bisa belajar', 1),
(110, 'Cukup penting, tetapi masih bisa belajar dengan buku', 2),
(110, 'Tidak terlalu penting, saya lebih suka belajar dari guru dan buku', 3),
-- 111
(111, 'Sering, tetapi saya tidak bisa mengubahnya', 1),
(111, 'Kadang-kadang, saya mencoba mengurangi tetapi sulit', 2),
(111, 'Jarang atau tidak pernah, saya bisa mengatur waktu dengan baik', 3),
-- 112
(112, 'Tidak sadar, seringkali berjam-jam tanpa terasa', 1),
(112, 'Kadang sadar, tetapi sulit berhenti', 2),
(112, 'Sadar dan bisa menghentikan diri tepat waktu', 3),
-- 113
(113, 'Tidak setuju, gadget adalah hak pribadi saya', 1),
(113, 'Setuju asalkan tidak terlalu ketat', 2),
(113, 'Sangat setuju, itu membantu saya lebih disiplin', 3),
-- 114
(114, 'Tidak tertarik, saya bisa mengatur diri sendiri', 1),
(114, 'Mungkin, jika tidak ribet', 2),
(114, 'Sangat tertarik, saya butuh bantuan untuk lebih disiplin', 3),
-- 115
(115, 'Lebih dari 10 kali', 1),
(115, '5–10 kali', 2),
(115, 'Kurang dari 5 kali', 3),
-- 116
(116, 'Sering, saya lebih suka di gadget daripada ngobrol langsung', 1),
(116, 'Kadang-kadang, tergantung suasana', 2),
(116, 'Jarang, saya lebih suka berbicara langsung dengan teman', 3),
-- 117
(117, 'Setiap hari, itu hal pertama yang saya lakukan', 1),
(117, 'Kadang-kadang, jika ada notifikasi dari semalam', 2),
(117, 'Jarang, saya melakukan aktivitas lain dulu', 3),
-- 118
(118, 'Jarang, saya hanya pakai gadget untuk hiburan', 1),
(118, 'Kadang-kadang, jika ada tugas yang sulit', 2),
(118, 'Sering, saya memanfaatkan gadget untuk belajar mandiri', 3),
-- 119
(119, 'Diam saja, itu bukan urusan saya', 1),
(119, 'Membaca dan mengikuti komentar tersebut karena lucu', 2),
(119, 'Melaporkan komentar tersebut ke guru atau orang dewasa yang dipercaya', 3),
-- 120
(120, 'Sering, dan saya tidak tahu harus melapor ke siapa', 1),
(120, 'Pernah, tetapi saya diamkan saja', 2),
(120, 'Tidak pernah, atau jika pernah saya langsung melapor ke guru/orang tua', 3),
-- 121
(121, 'Tidak, itu hanya bercanda', 1),
(121, 'Mungkin, tergantung konteksnya', 2),
(121, 'Ya, itu melanggar privasi dan bisa menyakiti perasaan orang lain', 3),
-- 122
(122, 'Sering, itu cara saya meluapkan emosi', 1),
(122, 'Pernah, tetapi jarang dan saya menyesalinya', 2),
(122, 'Tidak pernah, saya lebih memilih bicara langsung atau mendinginkan emosi dulu', 3),
-- 123
(123, 'Tidak pernah, saya langsung share jika menarik', 1),
(123, 'Kadang-kadang, jika informasinya meragukan', 2),
(123, 'Selalu, karena hoaks bisa merugikan banyak orang', 3),
-- 124
(124, 'Abaikan, takut ikut terkena masalah', 1),
(124, 'Hanya memberitahu teman yang bersangkutan secara pribadi', 2),
(124, 'Membela korban secara tegas, melaporkan ke admin grup/guru, dan mendukung korban', 3);
