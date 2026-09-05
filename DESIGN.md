---
name: Portfolio Raditya Pratama
description: Personal developer portfolio with a dark-mode native, bold, and energetic aesthetic.
colors:
  primary: "#F59E0B"
  secondary: "#F9FAFB"
  background: "#121212"
  surface: "#1E1E1E"
  text-primary: "#F9FAFB"
  text-secondary: "#9CA3AF"
  border: "#333333"
typography:
  h1:
    fontFamily: "'Archivo Black', 'Impact', sans-serif"
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: -0.01em
    textTransform: uppercase
  h2:
    fontFamily: "'Archivo Black', 'Impact', sans-serif"
    fontSize: 2rem
    fontWeight: 900
    lineHeight: 1.2
    textTransform: uppercase
  body-md:
    fontFamily: "Inter, Roboto, sans-serif"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 24px
  lg: 48px
  xl: 96px
  2xl: 128px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: "12px 24px"
    fontWeight: 700
  card:
    backgroundColor: "{colors.surface}"
    border: "1px solid {colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.md}"
---

## Overview
Desain portofolio ini menonjolkan profil seorang *full-stack developer* dengan gaya yang *energetic, technical*, dan *bold*. Kombinasi warna gelap pekat dan aksen *amber/orange* neon memberikan kesan *developer-centric* ala *tools* modern.

## Colors
- **Background (`#121212`) & Surface (`#1E1E1E`)**: Digunakan secara ketat untuk mempertahankan kontras rasio yang tinggi (menembus standar WCAG AAA).
- **Primary (`#F59E0B`)**: Warna aksen utama. Gunakan secara strategis HANYA untuk CTA utama, indikator *timeline*, *marquee*, dan *hover states* agar tidak *overwhelming*.

## Typography
Penggunaan *font display* super tebal (*weight 900*) untuk *heading* adalah roh utama dari desain ini. Kontras bobot (*weight contrast*) antara *heading* yang masif dan teks *body* yang reguler harus dijaga untuk memandu mata pengguna (*hierarchy strategy*).

## Spacing & Layout
Menggunakan sistem *8px grid*. *Whitespace* pada desain ini bersifat *generous* (ruang bernapas yang luas antar *section*), memberikan kesan premium dan fokus penuh pada konten tanpa terlihat menumpuk (*dense*).

## Elevation & Depth
**Flat design murni**. Tidak ada penggunaan `box-shadow` atau bayangan sama sekali. Kedalaman antarmuka dicapai melalui dua cara:
1. *Tonal elevation* (perbedaan tingkat warna antara *background* utama dan *surface card*).
2. *Hairline border* (garis batas 1px dengan warna `#333333`).

## Rules to Never Break
- Dilarang keras menggunakan *drop shadow* (bayangan).
- Wajib mempertahankan kontras rasio minimal WCAG AA (4.5:1 untuk teks biasa).
- Desain tidak memiliki versi *Light Mode* — secara *native* dan permanen harus berada di *Dark Mode*.