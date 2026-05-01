# GESAMEGA — Gerakan Sekolah Bijak Mengelola Gadget

Platform kolaboratif nasional berbasis web untuk mendorong penggunaan gadget yang sehat, terukur, dan berdampak positif pada kualitas pendidikan di sekolah-sekolah Indonesia.

🌐 **Production:** [gesamega.web.id](https://gesamega.web.id)

---

## Daftar Isi

- [Tech Stack](#tech-stack)
- [Arsitektur Proyek](#arsitektur-proyek)
- [Struktur Direktori](#struktur-direktori)
- [Database Schema](#database-schema)
- [Fitur Utama](#fitur-utama)
- [API Routes](#api-routes)
- [Autentikasi & Keamanan](#autentikasi--keamanan)
- [Setup & Development](#setup--development)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Performa & Caching](#performa--caching)

---

## Tech Stack

| Kategori  | Teknologi                                      |
| --------- | ---------------------------------------------- |
| Framework | [Next.js 16](https://nextjs.org/) (App Router) |
| Language  | TypeScript 5                                   |
| Database  | [Supabase](https://supabase.com/) (PostgreSQL) |
| Auth      | Supabase Auth                                  |
| CSS       | Tailwind CSS v4                                |
| Animasi   | Framer Motion                                  |
| Peta      | Leaflet + React-Leaflet                        |
| QR Code   | qrcode.react                                   |
| Keamanan  | Google reCAPTCHA v3                            |
| Icons     | Lucide React                                   |
| PDF       | jsPDF                                          |
| Signature | react-signature-canvas                         |
| Tour      | driver.js                                      |
| Runtime   | Node.js (Vercel Edge-compatible)               |

---

## Arsitektur Proyek

```
Browser (React Client)
    │
    ├─ Next.js App Router (SSR / ISR / CSR)
    │       │
    │       ├─ src/middleware.ts          ← Auth guard (Edge Runtime)
    │       ├─ src/app/(main)/            ← Halaman publik
    │       ├─ src/app/admin/             ← Admin Panel (protected)
    │       └─ src/app/api/              ← API Routes (serverless)
    │
    └─ Supabase (PostgreSQL + Auth + Storage)
            ├─ Anon Key → halaman publik (RLS enforced)
            └─ Service Role Key → API admin routes only
```

### Pola Rendering per Halaman

| Halaman           | Mode | Revalidasi       |
| ----------------- | ---- | ---------------- |
| `/` (Beranda)     | ISR  | 1 jam            |
| `/kuis`           | CSR  | —                |
| `/survei`         | CSR  | —                |
| `/peta`           | CSR  | —                |
| `/artikel`        | SSR  | per request      |
| `/artikel/[slug]` | CSR  | —                |
| `/studi-kasus`    | SSR  | per request      |
| `/hasil`          | CSR  | —                |
| `/admin/*`        | SSR  | `revalidate = 0` |

---

## Struktur Direktori

```
sosio-web/
├── src/
│   ├── app/
│   │   ├── (main)/                   # Grup route publik (dengan Navbar + Footer)
│   │   │   ├── page.tsx              # Beranda (ISR)
│   │   │   ├── kuis/page.tsx         # Kuis Refleksi Digital Siswa
│   │   │   ├── survei/               # Survei sekolah
│   │   │   ├── hasil/                # Hasil statistik kuis
│   │   │   ├── peta/                 # Peta sebaran sekolah (Leaflet)
│   │   │   ├── artikel/              # Daftar & detail artikel
│   │   │   ├── studi-kasus/          # Studi kasus sekolah
│   │   │   ├── komitmen/             # Form komitmen digital sekolah
│   │   │   ├── tentang/              # Tentang GESAMEGA
│   │   │   ├── tim/                  # Tim
│   │   │   └── visi-misi/            # Visi & Misi
│   │   ├── admin/                    # Admin Panel (auth-protected)
│   │   │   ├── layout.tsx            # Sidebar layout admin (grouped UI)
│   │   │   ├── page.tsx              # Dashboard statistik (Kuis + Survei)
│   │   │   ├── data-kuis/page.tsx    # Tabel data hasil kuis
│   │   │   ├── data-survei/page.tsx  # Tabel data hasil survei instansi
│   │   │   ├── qr-generator/page.tsx # Generator QR Campaign Kuis
│   │   │   ├── qr-survei/page.tsx    # Generator QR Campaign Survei
│   │   │   └── login/page.tsx        # Halaman login admin
│   │   ├── api/
│   │   │   ├── questions/route.ts    # GET pertanyaan kuis (cached)
│   │   │   ├── submit-quiz/route.ts  # POST submit hasil kuis
│   │   │   ├── admin/
│   │   │   │   ├── qr-campaigns/route.ts  # POST/DELETE kampanye QR
│   │   │   │   ├── qr-stats/route.ts      # GET statistik QR Kuis
│   │   │   │   └── qr-stats-survei/route.ts # GET statistik QR Survei
│   │   ├── actions/
│   │   │   ├── survey.ts             # Server Action: submit survei
│   │   │   └── komitmen.ts           # Server Action: submit komitmen
│   │   ├── layout.tsx                # Root layout (metadata, font)
│   │   ├── robots.ts                 # robots.txt
│   │   └── sitemap.ts                # sitemap.xml
│   ├── components/
│   │   ├── landing/                  # Komponen section beranda
│   │   ├── layout/                   # Navbar, Footer
│   │   ├── ui/                       # Komponen UI reusable (Button, dll.)
│   │   ├── PetaMap.tsx               # Komponen peta Leaflet (dynamic import)
│   │   ├── SchoolAutocomplete.tsx    # Autocomplete pencarian sekolah
│   │   ├── TourGuide.tsx             # Onboarding tour (driver.js)
│   │   └── HeroCarousel.tsx          # Carousel hero section
│   ├── lib/
│   │   ├── supabase.ts               # Supabase anon client (umum)
│   │   ├── supabase-browser.ts       # Supabase browser client (@supabase/ssr)
│   │   ├── supabase-server.ts        # Supabase server client (cookie-aware)
│   │   ├── supabase-admin.ts         # Supabase service-role client (server only!)
│   │   ├── recaptcha.ts              # Verifikasi reCAPTCHA v3 server-side
│   │   ├── pdfGenerator.ts           # Generate PDF hasil kuis (jsPDF)
│   │   ├── utils.ts                  # Utility helpers
│   │   ├── repositories/
│   │   │   └── quizRepository.ts     # Data access layer kuis
│   │   └── services/
│   │       └── quizService.ts        # Business logic kuis & scoring
│   ├── middleware.ts                  # ⚠️ Auth guard
│   └── proxy.ts                      # (DEPRECATED — sudah dihapus)
├── supabase/
│   ├── schema.sql                    # DDL schema lengkap
│   ├── seed.sql                      # Data awal sekolah
│   ├── seed_kuis_siswa.sql           # Pertanyaan & opsi kuis siswa
│   ├── seed_articles.sql             # Artikel seed
│   └── seed_gesamega.sql             # Data GESAMEGA
├── public/                           # Static assets
├── next.config.ts
├── tsconfig.json
└── .env.local                        # Environment variables
```

---

## Database Schema

### ERD Ringkas

```
schools ──────────┬── survey_results
                  ├── commitments
                  ├── case_studies
                  └── quiz_results ─── quiz_answers ─── question_options ─── questions

articles (standalone)
qr_campaigns (standalone)
```

### Tabel

#### `schools`

| Kolom              | Tipe        | Keterangan                      |
| ------------------ | ----------- | ------------------------------- |
| `id`               | UUID        | Primary Key                     |
| `nama_sekolah`     | TEXT        | Nama lengkap sekolah            |
| `wilayah`          | TEXT        | Kota/Kabupaten                  |
| `latitude`         | FLOAT       | Koordinat peta                  |
| `longitude`        | FLOAT       | Koordinat peta                  |
| `status`           | ENUM        | `belum` / `survei` / `komitmen` |
| `status_validasi`  | ENUM        | `pending` / `valid` / `flagged` |
| `ip_address`       | TEXT        | IP pengirim (rate limiting)     |
| `submit_timestamp` | TIMESTAMPTZ | Waktu submit                    |

#### `survey_results`

| Kolom        | Tipe        | Keterangan                           |
| ------------ | ----------- | ------------------------------------ |
| `id`         | UUID        | Primary Key                          |
| `school_id`  | UUID FK     | Sekolah asal                         |
| `nama`       | TEXT        | Nama responden instansi              |
| `jawaban`    | JSONB       | Data mentah form survei              |
| `source`     | TEXT        | Source QR kampanye survei (nullable) |
| `created_at` | TIMESTAMPTZ | Waktu submit                         |

#### `quiz_results`

| Kolom             | Tipe    | Keterangan                                      |
| ----------------- | ------- | ----------------------------------------------- |
| `id`              | UUID    | Primary Key                                     |
| `school_id`       | UUID FK | Sekolah asal (nullable)                         |
| `user_name`       | TEXT    | Nama pengisi                                    |
| `answers`         | JSONB   | Array skor mentah                               |
| `result_category` | TEXT    | Kategori hasil (e.g. "Bijak")                   |
| `qualification`   | VARCHAR | Sama dengan result_category                     |
| `indicator_color` | VARCHAR | Warna indikator (emerald/teal/amber/orange/red) |
| `description`     | TEXT    | Deskripsi hasil                                 |
| `source`          | TEXT    | Source QR kampanye (nullable)                   |

#### `questions` & `question_options`

| Kolom                    | Tipe    | Keterangan                     |
| ------------------------ | ------- | ------------------------------ |
| `questions.category`     | VARCHAR | `"Kuis Siswa"` atau `"Survei"` |
| `question_options.score` | INT     | 1–3 (skor per opsi jawaban)    |

#### `qr_campaigns`

| Kolom    | Tipe        | Keterangan                             |
| -------- | ----------- | -------------------------------------- |
| `id`     | UUID        | Primary Key                            |
| `name`   | TEXT        | Nama kampanye (tampilan)               |
| `source` | TEXT UNIQUE | Slug QR (digunakan sebagai `?source=`) |

> **Catatan:** Tabel `qr_campaigns` TIDAK tersedia di `schema.sql`. Buat manual via SQL Editor Supabase:
>
> ```sql
> ALTER TABLE quiz_results ADD COLUMN IF NOT EXISTS source TEXT DEFAULT NULL;
> ALTER TABLE survey_results ADD COLUMN IF NOT EXISTS source TEXT DEFAULT NULL;
>
> CREATE TABLE IF NOT EXISTS qr_campaigns (
>   id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
>   name TEXT NOT NULL,
>   source TEXT NOT NULL UNIQUE,
>   created_at TIMESTAMPTZ DEFAULT NOW()
> );
> ```

### Indexes

```sql
-- Full-text search nama sekolah (trigram)
CREATE INDEX idx_schools_nama_trgm ON schools USING gin (nama_sekolah gin_trgm_ops);

-- Composite index dashboard/peta
CREATE INDEX idx_schools_status_validation ON schools(status, status_validasi);

-- Foreign key indexes
CREATE INDEX idx_survey_results_school_id ON survey_results(school_id);
CREATE INDEX idx_quiz_results_school_id ON quiz_results(school_id);
```

---

## Fitur Utama

### 1. Kuis Refleksi Digital (`/kuis`)

- **Akses "Hidden-by-Design":** Halaman hanya dapat dibuka jika menyertakan parameter `?source=slug` dari scan QR. Akses langsung diblokir (404).
- **Alur:** Registrasi (nama + sekolah) → Jawab pertanyaan → Hasil + kategori
- **Scoring:** Total skor dari `question_options.score` (1–3 per soal)
- **Kategori hasil:**

  | Range Skor | Kategori           | Warna   |
  | ---------- | ------------------ | ------- |
  | ≥ 60       | Sangat Bijak       | Emerald |
  | 50–59      | Bijak              | Teal    |
  | 38–49      | Cukup Bijak        | Amber   |
  | 25–37      | Perlu Pendampingan | Orange  |
  | < 25       | Darurat Digital    | Red     |

- **Strict Anti-Duplicate:** `localStorage` mencatat `kuis_completed = true`. Pengisian ulang dari perangkat (browser) yang sama diblokir sepenuhnya secara mutlak.
- **Keamanan:** reCAPTCHA v3 dengan retry 3x (mengatasi timing issue inisialisasi)

### 2. Survei Sekolah (`/survei`)

- **Akses "Hidden-by-Design":** Hanya bisa diakses dari link QR kampanye (`?source=slug`).
- Form JSONB — jawaban disimpan di `survey_results.jawaban`
- **QR Source Tracking:** Data kampanye disimpan langsung ke `survey_results.source` secara terstandarisasi.
- **Strict Anti-Duplicate:** `localStorage` mencatat `survei_completed = true` setelah berhasil, memblokir pengisian berulang dari perangkat yang sama.
- Validasi sekolah: hanya sekolah terdaftar di `schools` yang bisa submit
- Status sekolah otomatis naik dari `belum` → `survei`

### 3. Komitmen Digital (`/komitmen`)

- TTD digital via `react-signature-canvas`, disimpan ke Supabase Storage bucket `signatures`
- Submit mengubah `schools.status` → `komitmen` dan `status_validasi` → `valid`

### 4. Peta Sebaran (`/peta`)

- Leaflet map dengan marker warna per status (belum/survei/komitmen)
- **Eksklusivitas CTA:** CTA (Call to Action) untuk menuju halaman `/komitmen` HANYA muncul apabila pengunjung diarahkan otomatis paska-menyelesaikan survei (`?from=survei`). Pengunjung umum tidak melihat CTA ini, menjaga eksklusivitas alur.
- Dynamic import untuk menghindari SSR error (`leaflet` butuh `window`)

### 5. QR Generator (Admin)

- Buat kampanye QR terpisah untuk **Kuis Siswa** dan **Survei Instansi**
- Prefix otomatis `survei-` untuk membedakan jalur pelacakan data
- Download QR sebagai PNG berdesain branded
- Statistik peserta per kampanye ditampilkan real-time

### 6. Admin Panel (`/admin`)

- **UI/UX Modern:** Struktur _Sidebar_ dikelompokkan secara visual untuk mengurangi beban kognitif (Overview, Kuis Siswa, Survei Instansi).
- **Dashboard:** Statistik keseluruhan (Partisipasi, Kuis Selesai, Survei Selesai) dan grafik distribusi.
- **Data Kuis & Survei:** Tabel pemantauan data terpisah untuk masing-masing tipe kuesioner.
- **QR Kuis & Survei:** Generator QR Code terdedikasi untuk masing-masing alur.

---

## API Routes

### Public API

#### `GET /api/questions`

Mengambil daftar pertanyaan kuis.

**Query Params:**
| Param | Default | Keterangan |
|-------|---------|------------|
| `category` | — | Filter kategori: `Kuis%20Siswa` |

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "question_text": "...",
      "category": "Kuis Siswa",
      "question_options": [
        { "id": 1, "option_text": "...", "score": 1, "question_id": 101 }
      ]
    }
  ]
}
```

**Cache:** `Cache-Control: public, s-maxage=3600, stale-while-revalidate=3600`

---

#### `POST /api/submit-quiz`

Menyimpan hasil kuis ke database.

**Request Body:**

```json
{
  "user_name": "Budi",
  "school_id": "uuid-sekolah",
  "answers": [{ "question_id": 101, "option_id": 1, "score": 2 }],
  "source": "sman_4_sidoarjo",
  "captchaToken": "token-dari-recaptcha-v3"
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "totalScore": 52,
    "category": "Bijak",
    "indicator_color": "teal",
    "description": "...",
    "motivation_message": "..."
  }
}
```

**Keamanan:** Memverifikasi reCAPTCHA v3 (score ≥ 0.5) sebelum menyimpan.

---

### Admin API (Butuh autentikasi)

Semua route `/api/admin/*` dilindungi middleware. Request tanpa session valid akan mendapat respons `401 Unauthorized`.

#### `GET /api/admin/qr-stats`

Mengambil semua kampanye QR beserta jumlah peserta.

**Implementasi:** 2 query paralel (bukan N+1):

1. Fetch semua `qr_campaigns`
2. Fetch semua `quiz_results.source` yang tidak null
3. Hitung participant count di memori dengan `Map`

#### `POST /api/admin/qr-campaigns`

Membuat kampanye QR baru.

```json
{ "name": "SMAN 4 Sidoarjo", "source": "sman_4_sidoarjo" }
```

#### `DELETE /api/admin/qr-campaigns?id={uuid}`

Menghapus kampanye QR berdasarkan ID.

---

## Autentikasi & Keamanan

### Middleware (`src/middleware.ts`)

```
Matcher: ["/admin/:path*", "/api/admin/:path*"]
```

**Alur:**

1. Setiap request ke `/admin/*` atau `/api/admin/*` masuk ke middleware
2. Supabase session di-refresh via cookie
3. Jika tidak ada user:
   - Halaman → redirect ke `/admin/login`
   - API → return `401 { success: false, error: "Unauthorized" }`
4. Jika sudah login dan akses `/admin/login` → redirect ke `/admin`

> ⚠️ **PENTING:** Middleware hanya berjalan jika file bernama `middleware.ts` dan berada di `src/`. File `proxy.ts` TIDAK akan dieksekusi oleh Next.js.

### Supabase Client Strategy

| Client         | File                  | Digunakan Di                            | Key                |
| -------------- | --------------------- | --------------------------------------- | ------------------ |
| Anon Client    | `supabase.ts`         | Server Components, Server Actions       | `ANON_KEY`         |
| Browser Client | `supabase-browser.ts` | Client Components (auth)                | `ANON_KEY`         |
| Server Client  | `supabase-server.ts`  | Middleware, Server Components (session) | `ANON_KEY`         |
| Admin Client   | `supabase-admin.ts`   | API Routes admin only                   | `SERVICE_ROLE_KEY` |

> 🔴 **JANGAN expose `SERVICE_ROLE_KEY` ke client!** Key ini bypass semua RLS.

### Google reCAPTCHA v3

Diverifikasi server-side di:

- `POST /api/submit-quiz` — submit kuis
- Server Action `submitSurvey` — submit survei
- Server Action `submitKomitmen` — submit komitmen

Threshold skor: **≥ 0.5** (ditolak jika di bawah)

---

## Setup & Development

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9
- Akun [Supabase](https://supabase.com)
- Akun [Google reCAPTCHA v3](https://www.google.com/recaptcha/admin)

### Langkah Setup

```bash
# 1. Clone repository
git clone https://github.com/your-org/sosio-web.git
cd sosio-web

# 2. Install dependencies
npm install

# 3. Setup environment variables
cp .env.example .env.local
# Isi nilai di .env.local (lihat bagian Environment Variables)

# 4. Setup database Supabase
# Buka Supabase Dashboard → SQL Editor
# Jalankan file-file berikut secara berurutan:
# 1. supabase/schema.sql
# 2. supabase/seed.sql
# 3. supabase/seed_kuis_siswa.sql
# 4. supabase/seed_articles.sql (opsional)
# 5. SQL tambahan untuk qr_campaigns (lihat Database Schema)

# 5. Jalankan development server
npm run dev
```

Server berjalan di [http://localhost:3000](http://localhost:3000)

> **Catatan:** reCAPTCHA v3 TIDAK berfungsi di `localhost` karena domain tidak terdaftar di Google Console. Submit kuis akan gagal verifikasi di local. Ini normal — tambahkan `localhost` ke allowed domains di Google reCAPTCHA console untuk testing lokal.

### Build Production

```bash
npm run build
npm run start
```

---

## Environment Variables

Buat file `.env.local` di root proyek:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...

# Supabase Service Role (RAHASIA — server only, jangan expose ke client!)
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Google reCAPTCHA v3
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lxxxxxxxxxxxxxxxx
RECAPTCHA_SECRET_KEY=6Lxxxxxxxxxxxxxxxx
```

| Variable                         | Akses           | Keterangan                                |
| -------------------------------- | --------------- | ----------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`       | Public          | URL project Supabase                      |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | Public          | Anon key (RLS enforced)                   |
| `SUPABASE_SERVICE_ROLE_KEY`      | **Server only** | Bypass RLS — hanya untuk API admin        |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | Public          | Site key reCAPTCHA (frontend)             |
| `RECAPTCHA_SECRET_KEY`           | **Server only** | Secret key reCAPTCHA (verifikasi backend) |

---

## Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di [vercel.com](https://vercel.com)
3. Set semua environment variables di Settings → Environment Variables
4. Deploy otomatis setiap push ke `main`

**Konfigurasi domain:**

- Set custom domain `gesamega.web.id` di Vercel → Domains
- Pastikan DNS record mengarah ke Vercel

**Konfigurasi reCAPTCHA:**

- Tambahkan `gesamega.web.id` ke allowed domains di Google reCAPTCHA Admin Console

### next.config.ts

```ts
const nextConfig: NextConfig = {
  allowedDevOrigins: ["192.168.x.x"], // IP lokal untuk testing mobile
};
```

---

## Performa & Caching

### Strategi Cache

| Endpoint / Halaman         | Cache                       | TTL               |
| -------------------------- | --------------------------- | ----------------- |
| `GET /api/questions`       | CDN (`s-maxage`)            | 1 jam + 1 jam SWR |
| `/` (Beranda)              | ISR Next.js                 | 1 jam             |
| `/admin/*`                 | No cache (`revalidate = 0`) | —                 |
| `/artikel`, `/studi-kasus` | SSR (per request)           | —                 |

### Query Optimization

| Halaman/Endpoint     | Teknik                                |
| -------------------- | ------------------------------------- |
| Admin Dashboard      | 1 query, hitung distribusi di JS      |
| Data Kuis            | Kolom spesifik + `limit(200)`         |
| QR Stats             | 2 query paralel (bukan N+1)           |
| Beranda              | `Promise.all` paralel untuk 4 query   |
| Autocomplete Sekolah | GIN trigram index pada `nama_sekolah` |

### Service/Repository Pattern (Quiz)

```
API Route (/api/submit-quiz)
    └─ quizService.submitQuiz()      ← business logic, scoring
           └─ quizRepository.saveQuizResult()  ← data access layer
                   └─ supabase.from("quiz_results").insert(...)
```

---

## Known Issues & Notes

- **reCAPTCHA di localhost:** Selalu gagal kecuali `localhost` didaftarkan di Google Console. Ini tidak mempengaruhi production.
- **Hydration warning:** Browser extension (seperti Jetski) dapat menyebabkan hydration mismatch. Ini bukan bug aplikasi.
- **Artikel slug page:** Halaman `artikel/[slug]` masih menggunakan CSR (`"use client"`). Belum dikonversi ke Server Component untuk alasan kompatibilitas — SEO artikel tidak optimal.
- **`qr_campaigns` table:** Tidak termasuk di `schema.sql`. Perlu dibuat manual di Supabase SQL Editor (SQL tersedia di bagian Database Schema).
