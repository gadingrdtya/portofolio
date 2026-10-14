<div align="center">

# Raditya.dev
### Personal Developer Portfolio & Engineering Showcase

Website portofolio personal dengan gaya visual modern clean Neubrutalist, didukung dark/light mode adaptif, interaktif CV viewer, dan kurasi showcase proyek full-stack, AI, dan mobile application.

[![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](LICENSE)

[Sekilas](#-sekilas-portofolio) • [Fitur Utama](#-fitur-utama) • [Proyek Unggulan](#-proyek-unggulan) • [Struktur Proyek](#-struktur-proyek) • [Instalasi Lokal](#-panduan-instalasi-lokal) • [Deployment](#-panduan-deployment)

</div>

---

## 📌 Sekilas Portofolio

**Raditya.dev** dibangun untuk merefleksikan keahlian rekayasa perangkat lunak modern: antarmuka frontend yang presisi, performa kilat, dan navigasi tanpa hambatan. 

Website ini mengadopsi estetika **Neubrutalist Tech** dengan kontras tegas, tipografi proporsional, serta arsitektur komponen React yang modular dan dapat diperluas dengan mudah saat menambah riwayat kerja atau karya baru.

---

## 🚀 Fitur Utama

### 1. 🎨 Neubrutalist Design Language & Adaptive Theming
Menggabungkan batas kontras tinggi (*high-contrast borders*), aksen amber/emas khas, dan transisi halus antara mode **Dark** (slate/surface gelap) dan **Light** yang tersimpan di memori browser pengguna (`ThemeContext`).

### 2. 📄 In-App Curriculum Vitae Modal
Pengunjung dapat langsung membaca dan meninjau berkas CV resmi dalam format PDF beresolusi tinggi tanpa harus dialihkan keluar website atau mengunduh berkas secara paksa.

### 3. ⚡ Optimized SPA Performance
Dibangun di atas **Vite bundler** untuk waktu muat instan (*instant HMR & production tree-shaking*), lazy asset rendering, dan zero runtime overhead.

### 4. 📱 Full Responsive & Accessible Flow
Layout fluid yang beradaptasi sempurna di berbagai resolusi layar—dari mobile compact hingga monitor ultrawide, lengkap dengan drawer menu mobile yang intuitif.

---

## 📂 Proyek Unggulan yang Dipamerkan

| Nama Proyek | Kategori | Ringkasan Teknologi |
| :--- | :--- | :--- |
| **Convertify** | Full-Stack Web App | Next.js, React, TypeScript, Tailwind CSS, pdf-lib, jsPDF |
| **ATSify** | Full-Stack Web App | React.js, Tailwind CSS, Node.js, Express, Supabase, Groq AI |
| **MockDrop** | 3D WebGL Web App | React.js, Three.js, TypeScript, Vite, Tailwind CSS |
| **StockOS** | Full-Stack Web App | React.js, TypeScript, Vite, Supabase, Tailwind CSS |
| **CornDoc** | Mobile App & ML | Flutter, Dart, TensorFlow Lite, Firebase Firestore |
| **Dokterklik** | Full-Stack Web App | React.js, Node.js, Express.js, MongoDB, Tailwind CSS |

---

## 🛠️ Struktur Proyek

```
PORTOFOLIO/
├── public/                     # Aset gambar proyek, favicon, dan CV PDF
│   ├── convertify.webp
│   ├── atsify.webp
│   ├── mockdrop.webp
│   ├── stockos.webp
│   ├── corndoc.webp
│   ├── dokterklik.webp
│   └── CV_Gading Raditya Pratama.pdf
├── src/
│   ├── components/             # Komponen antarmuka modular
│   │   ├── Navbar.jsx          # Header navigasi, toggle tema, & tombol CV
│   │   ├── Hero.jsx            # Headline utama & intro elevator pitch
│   │   ├── About.jsx           # Latar belakang pendidikan & sertifikasi
│   │   ├── Experience.jsx      # Riwayat pengalaman kerja profesional
│   │   ├── Skills.jsx          # Pemetaan keahlian & tech stack
│   │   ├── Projects.jsx        # Showcase grid kartu proyek
│   │   ├── CvModal.jsx         # Modal pratinjau dokumen CV
│   │   └── Footer.jsx          # Kontak direct email/WA & profil sosial
│   ├── context/                # Global state provider (Theme & Modal)
│   ├── App.jsx                 # Main layout wrapper
│   ├── index.css               # Tailwind directives & custom animations
│   └── main.jsx                # React DOM mount point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

---

## 💻 Panduan Instalasi Lokal

### Prasyarat
- [Node.js](https://nodejs.org/) v18+ dan npm

### Langkah Menjalankan
```bash
# 1. Clone repository
git clone https://github.com/gadingrdtya/portofolio.git

# 2. Masuk ke direktori
cd portofolio

# 3. Pasang dependensi
npm install

# 4. Jalankan development server
npm run dev
```

Buka peramban di `http://localhost:5173`

---

## 🌐 Panduan Deployment

Proyek ini siap di-deploy secara instan ke platform seperti **Vercel**, **Netlify**, atau **Cloudflare Pages**:

1. Hubungkan akun GitHub dengan Vercel / Netlify.
2. Pilih repository `portofolio`.
3. Build Settings default:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Klik **Deploy**.

---

## 📄 Lisensi
Didistribusikan di bawah lisensi [MIT License](LICENSE).  
Didesain dan dikembangkan oleh **Gading Raditya Pratama**.
