# Masukan Portofolio harits19.github.io

Daftar masukan untuk membuat web portofolio lebih "menjual" (konten + UI/UX),
diurutkan dari yang **paling mudah diimplementasikan** ke yang paling berat.
Setiap item menyertakan lokasi file, cara singkat, dan dampaknya.

---

## Ringkasan Cepat

| # | Item | Kesulitan | Dampak |
|---|------|-----------|--------|
| 1 | Typo & lokalisasi | Sangat mudah | Sedang |
| 2 | Metadata title + description | Sangat mudah | Sedang |
| 3 | JSON-LD schema (SEO) | Sangat mudah | Kecil |
| 4 | sitemap.xml + robots.txt | Sangat mudah | Kecil |
| 5 | Hapus dead code & dark mode mati | Sangat mudah | Kecil |
| 6 | Fix anchor tanpa href | Sangat mudah | Kecil |
| 7 | Focus-visible global | Sangat mudah | Kecil |
| 8 | Satu warna aksen konsisten | Sangat mudah | Sedang |
| 9 | Hapus badge redundan di kartu proyek | Sangat mudah | Kecil |
| 10 | README profesional | Sangat mudah | Sedang |
| 11 | Tambah "Projects" ke TOC sidebar | Sangat mudah | Kecil |
| 12 | Ganti tombol skip-animation → WhatsApp | Sangat mudah | Sedang |
| 13 | Ganti font (Times New Roman → sans modern) | Mudah | **Besar** |
| 14 | Kompres video 54MB | Mudah | **Besar** |
| 15 | Layout lebih lebar + grid proyek 2 kolom | Mudah | Besar |
| 16 | Batasi animasi typewriter ke hero saja | Sedang | Besar |
| 17 | OG image + social preview | Sedang | Sedang |
| 18 | Hero section + baris statistik | Sedang | **Besar** |
| 19 | CTA sticky (WhatsApp) di mobile | Sedang | Sedang |
| 20 | Rewrite copy berbasis dampak (draft) | Sedang | **Besar** |
| 21 | Foto profesional | Butuh aset | Besar |
| 22 | Screenshot/mockup proyek | Butuh aset | **Besar** |
| 23 | Link GitHub/demo publik per proyek | Butuh aset | Besar |
| 24 | Angka dampak asli dari Anda | Butuh data | **Besar** |
| 25 | Testimoni / rekomendasi | Butuh orang lain | Sedang |
| 26 | Status ketersediaan + keputusan karier | Butuh keputusan | Sedang |

Tier 1 (item 1–12) bisa diselesaikan dalam satu sesi kerja tanpa aset baru.
Tier 2 (13–20) butuh 30 menit–2 jam per item. Tier 3 (21–26) menunggu aset,
data, atau keputusan dari Anda.

---

## Tier 1 — Langsung bisa, tanpa aset baru (< 30 menit per item)

### 1. Perbaiki typo & lokalisasi yang belum tuntas
- **File:** `src/hooks/use_profile/constant.tsx`, `src/app/[locale]/components/portfolio_view.tsx`, `src/app/[locale]/components/project_card.tsx`
- **Isi:**
  - `constant.tsx:57` — EN memakai kata Indonesia: "Next.js, Tailwind, **dan** Motion" → ganti "and".
  - `portfolio_view.tsx:145` — label "Portfolio" hardcoded English walau di halaman ID → pindah ke kamus `use_dict`.
  - `project_card.tsx:61` — "Project overview" hardcoded English di halaman ID → pindah ke kamus.
  - Versi ID masih menyisakan "Probation" (constant.tsx:243) → terjemahkan ("Masa Percobaan").
- **Dampak:** detail kecil yang justru dibaca perekrut sebagai ukuran ketelitian.

### 2. Metadata title & description (SEO + tab browser)
- **File:** `src/app/layout.tsx:4-7`
- **Sekarang:** `title: "Abdullah Harits CV"`, `description: "Abdullah Harits CV"` — nol informasi.
- **Usul:**
  - Title: `Abdullah Harits — Full-Stack Software Engineer (Next.js, Go, Flutter)`
  - Description: satu kalimat jualan + kata kunci: *"Full-stack engineer 5+ tahun berpengalaman membangun aplikasi web & mobile, chatbot WhatsApp, dan sistem real-time berbasis microservices (Next.js, Go, Flutter)."*
- **Dampak:** muncul dengan benar di hasil pencarian & tab, sekaligus jadi elevator pitch pertama.

### 3. JSON-LD schema (rich result Google)
- **File:** `src/app/layout.tsx` (tambah `<script type="application/ld+json">`)
- **Isi:** schema `Person` — name, jobTitle, url, sameAs (LinkedIn, GitHub), email.
- **Dampak:** Google bisa menampilkan profil Anda sebagai rich result; kode kecil, pasang sekali.

### 4. sitemap.xml + robots.txt
- **File:** baru di `public/`
- **Isi:** `sitemap.xml` berisi `https://harits19.github.io/en/` dan `/id/`; `robots.txt` menunjuk sitemap.
- **Dampak:** membantu index Google untuk GitHub Pages. Tanpa biaya, 5 menit.

### 5. Hapus dead code & sisa dark mode
- **File:** `src/app/components/round_button.tsx`, `src/app/[locale]/components/stat_card.tsx`, `src/app/globals.css`, `src/app/layout.tsx`, `src/app/components/sidebar_view.tsx`
- **Isi:**
  - `StatCard` dan `RoundButton` tidak diimpor di mana pun — hapus, atau (lebih baik) pakai `StatCard` di hero (lihat item 18).
  - Kelas `dark:` di sidebar/layout dan `@custom-variant dark` di globals.css sudah mati (komentar di globals.css:3-6 sendiri mengakuinya) — bersihkan.
- **Dampak:** CSS/JS lebih kecil, kode lebih mudah dirawat.

### 6. Fix anchor tanpa href
- **File:** `src/app/[locale]/components/cv_view.tsx:120-123`
- **Isi:** item kontak tanpa link (mis. "Jakarta, Indonesia") dirender sebagai `<a target="_blank" href={undefined}>` → anchor invalid, tidak fokusabel. Render `<span>` saja untuk item tanpa link.
- **Dampak:** aksesibilitas keyboard & validitas HTML.

### 7. Focus-visible style global
- **File:** `src/app/globals.css`
- **Isi:** satu rule global, mis. `:focus-visible { outline: 2px solid <warna aksen>; outline-offset: 2px; }` (sekarang hanya kartu proyek yang punya focus ring, project_card.tsx:84).
- **Dampak:** navigasi keyboard jadi terlihat; sinyal kualitas teknis.

### 8. Satu warna aksen konsisten
- **File:** `src/app/[locale]/components/portfolio_view.tsx` (properti `bgClass` tiap proyek)
- **Sekarang:** tiap kartu pakai hue berbeda (cyan, emerald, amber, rose, violet, sky) → kesan "pelangi", tidak fokus.
- **Usul:** pilih satu aksen (mis. indigo atau emerald) untuk semua kartu + CTA + link.
- **Dampak:** desain terasa disiplin dan profesional; perubahan cuma beberapa string.

### 9. Hapus badge redundan di kartu proyek
- **File:** `src/app/[locale]/components/project_card.tsx:56-58`
- **Sekarang:** pill kiri-atas menampilkan 2 kata pertama judul yang sudah ditampilkan lagi di bawahnya.
- **Dampak:** visual lebih bersih, tidak ada pengulangan.

### 10. README profesional
- **File:** `README.md` (masih template create-next-app)
- **Isi:** nama, peran, ringkasan 1 paragraf, daftar tech stack, tautan live site, cara menjalankan lokal. Repo ini sering dikunjungi perekrut lewat link GitHub Anda.
- **Dampak:** kesan profesional sejak halaman GitHub, bukan template bawaan.

### 11. Tambah "Projects" ke TOC sidebar
- **File:** `src/app/components/sidebar_view.tsx:23-28`
- **Sekarang:** TOC hanya About / Experience / Education / Skills — bagian proyek (bagian terpenting!) tidak ada.
- **Dampak:** navigasi lengkap; perekrut langsung bisa lompat ke proyek.

### 12. Ganti tombol "skip animation" → tombol Hubungi
- **File:** `src/app/components/sidebar_view.tsx:33-54`
- **Sekarang:** tombol paling menonjol di sidebar adalah "skip animation" — fitur developer yang justru menyiratkan animasinya mengganggu.
- **Usul:** ganti dengan tombol WhatsApp (`https://wa.me/6283840493135`) dengan ikon + tooltip "Hubungi Saya". Logika skip-animation boleh tetap ada di kode (dipicu otomatis setelah animasi selesai) tapi tidak perlu jadi tombol.
- **Dampak:** CTA kontak selalu terlihat di semua posisi scroll.

---

## Tier 2 — Refactor kecil / butuh tooling (30 menit–2 jam per item)

### 13. Ganti font: Times New Roman → sans modern
- **File:** `src/app/globals.css:8-10`, `src/app/layout.tsx`
- **Sekarang:** seluruh situs memakai Times New Roman — kesan dokumen akademik, bukan web modern.
- **Usul:** pakai `next/font` (Inter atau Geist, sudah familier dengan ekosistem Next.js) untuk layar; serif hanya dipertahankan di `@media print` bila ingin tampilan CV klasik saat dicetak.
- **Dampak:** perubahan satu file yang langsung mengubah "rasa" seluruh halaman. Ini item termudah dengan dampak visual terbesar.

### 14. Kompres video 54MB
- **File:** `public/1engage.mp4`
- **Sekarang:** 54MB autoplay = halaman berat di mobile, pemborosan kuota data, kesan "web lambat" — ironis untuk portofolio engineer.
- **Usul:** kompres dengan ffmpeg ke H.264 720p, durasi pendek (10–20 detik), target < 2MB; tambahkan `poster` image agar ada visual sebelum video load, dan pertimbangkan play-on-hover alih-alih autoplay.
- **Contoh perintah:**
  ```bash
  ffmpeg -i 1engage.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 30 -preset slow -movflags +faststart -an 1engage-compressed.mp4
  ```
- **Dampak:** performa naik drastis; halaman Anda sendiri membuktikan "saya bisa bikin web cepat".

### 15. Layout lebih lebar + grid proyek 2 kolom
- **File:** `src/app/[locale]/components/page_view.tsx:6` (max-w-[210mm]), `portfolio_view.tsx:155` (grid-cols-1)
- **Sekarang:** halaman terkungkung lebar A4 → strip sempit di tengah layar desktop; 6 kartu proyek full-width bertumpuk = scroll sangat panjang.
- **Usul:** kontainer diperlebar (mis. max-w-6xl); bagian CV boleh tetap proporsional A4; grid proyek `grid-cols-1 md:grid-cols-2`.
- **Dampak:** desktop memanfaatkan layar, jumlah scroll berkurang setengah, terasa seperti situs yang dirancang — bukan dokumen.

### 16. Batasi animasi typewriter ke hero saja
- **File:** `src/app/components/text.tsx`, `src/hooks/use_profile/constant.tsx`, `src/app/[locale]/components/cv_view.tsx` (sistem offset charBefore)
- **Sekarang:** seluruh dokumen mengetik per karakter (0.005 dtk/karakter, ±35 detik total) → mustahil di-skim, posisi scroll melompat (CLS), Ctrl+F tidak berguna, dan tombol "skip" jadi penambal.
- **Usul:** typewriter hanya untuk headline hero (satu baris, sekali jalan); konten lain pakai fade-in halus saat scroll (`whileInView` dari motion). Refactor paling bersih: hapus mesin perhitungan offset di `cv_view.tsx` dan ganti `Text` dengan fade-in sederhana — ini justru menyederhanakan kode.
- **Dampak:** kesan "wow" tetap ada di hero, tapi tidak menghukum pengguna yang ingin membaca cepat.

### 17. OG image + social preview
- **File:** `src/app/layout.tsx` (tambah `openGraph` + `twitter` metadata)
- **Isi:** og:title, og:description, og:image (buat gambar 1200×630 berisi nama + peran), og:url.
- **Dampak:** link yang disebar lewat WhatsApp/LinkedIn/Telegram tampil dengan kartu preview — penting karena ini saluran utama portofolio Anda. (Bisa dibuat dulu gambar sederhana dengan Figma/Canva atau HTML screenshot.)

### 18. Hero section + baris statistik
- **File:** komponen baru `src/app/[locale]/components/hero_view.tsx` (dirender di atas CvView di `page_view.tsx`); `StatCard` yang sudah ada bisa dihidupkan kembali.
- **Isi:** foto/avatar, satu kalimat positioning ("Full-Stack Engineer yang membangun chatbot WhatsApp & sistem real-time"), 3–4 angka kunci (5+ tahun, 6 perusahaan, 3 platform, N teknologi), CTA "Hubungi Saya" + "Unduh CV".
- **Dampak:** menjawab "siapa kamu & kenapa rekrut saya" dalam 3 detik pertama — konversi tertinggi dari semua item.

### 19. CTA sticky di mobile
- **File:** `src/app/components/sidebar_view.tsx`
- **Sekarang:** di mobile sidebar melayang di tengah-bawah menutupi konten; kontak hanya ada di atas halaman.
- **Usul:** di mobile, ganti float bottom-center dengan bar kontak ramping (WhatsApp + Email) yang sticky di bawah; tombol lain dipindah.
- **Dampak:** kontak selalu satu jempol jauhnya — penting karena mayoritas traffic portofolio lewat mobile.

### 20. Rewrite copy berbasis dampak (draft dulu, angka menyusul)
- **File:** `src/hooks/use_profile/constant.tsx` (about_me, responsibilities, dan subtitle proyek)
- **Sekarang:** daftar tugas ("Developed X", "Integrated Y") tanpa hasil terukur; about_me menyebut "over three years" padahal karier sejak Feb 2021 = ±5 tahun (under-sell).
- **Usul:** tiap poin = tugas + dampak + angka (boleh estimasi jujur). Contoh kerangka:
  - Chatbot WhatsApp → berapa pesan/bulan, berapa pelanggan, % kenaikan konversi.
  - Broadcast engine → berapa juta pesan terkirim, latency berapa.
  - Migrasi Quasar → Next.js → % lebih cepat / lebih mudah maintenance.
- **Dampak:** perekrut membeli hasil, bukan aktivitas. Saya bisa buatkan draft dengan placeholder `[TAMBAH ANGKA]` yang tinggal Anda isi dengan data asli.

---

## Tier 3 — Butuh aset, data, atau keputusan dari Anda

### 21. Foto profesional
- Foto/avatar yang rapi di hero (dan opsional OG image). Manusia lebih mudah diingat daripada teks; menaikkan kepercayaan secara signifikan.

### 22. Screenshot/mockup proyek
- Ganti placeholder gelap berisi teks judul (project_card.tsx:49-53) dengan screenshot asli atau mockup rapi per proyek. Ini item visual paling berdampak di bagian portfolio.

### 23. Link GitHub/demo publik per proyek
- Saat ini hanya 1 dari 6 proyek punya link demo; sisanya "Internal Project" yang tidak bisa diverifikasi. Minimal 1–2 proyek open-source/personal yang bisa diakses publik, dengan README yang baik, agar perekrut bisa melihat kode Anda.

### 24. Angka dampak asli
- Data nyata untuk item 20: volume pesan chatbot, skala broadcast, hasil A/B testing, dll. Boleh miring/estimasi, tapi harus jujur dan bisa dipertanggungjawabkan.

### 25. Testimoni / rekomendasi
- 1–2 kutipan singkat dari mantan atasan/klien (atau rekomendasi LinkedIn yang ditautkan). Social proof paling kuat untuk perekrutan.

### 26. Keputusan karier: status ketersediaan & posisi 1 bulan
- Tambahkan badge "Tersedia untuk peluang baru" / "Open to work" di hero (atau sebutkan secara eksplisit kalau sedang tidak mencari kerja).
- Putuskan nasib entri "PT Admin Pintar Kita, Feb 2025 – Feb 2025 (Probation)" yang cuma 1 bulan — boleh dipertahankan (kejujuran), digabung, atau difokuskan ke dampaknya saja.

---

## Yang sudah bagus — jangan diubah

- **Print CSS cerdas:** hanya area CV (`#print-area`) yang tercetak, portfolio tidak ikut — hasil print/PDF rapi ala dokumen.
- **Dukungan dua bahasa** EN/ID dengan kamus terpusat (`use_dict`) — arsitekturnya bagus, tinggal melengkapi string yang belum diterjemahkan.
- **Struktur kode rapi:** komponen kecil terpisah, data terpusat di `use_profile` — memudahkan semua perubahan di atas.
- **Animasi secara teknis mulus** (motion + skippable) — masalahnya hanya di cakupan (seluruh dokumen), bukan di eksekusinya.

---

## Urutan eksekusi yang disarankan

1. **Sesi 1 (tanpa aset):** item 1–12 — semuanya perubahan kecil, risiko rendah, langsung terasa.
2. **Sesi 2 (tanpa aset, lebih dalam):** item 13 (font), 14 (video), 15 (layout), 16 (animasi), 17 (OG image sederhana).
3. **Sesi 3 (konten):** item 18 + 20 draft (hero & copy), menunggu angka asli dari Anda.
4. **Sesi 4 (aset):** item 21–26 setelah foto, screenshot, dan keputusan karier siap.

Setelah sesi 1–2 selesai, situs sudah terasa seperti web profesional; sesi 3–4 yang membawanya dari "rapi" menjadi "menjual".
