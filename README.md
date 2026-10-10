# Liquid Glass Button Studio

## Struktur
- `index.html`
- `css/style.css`
- `js/script.js`
- `vercel.json` — security headers untuk deploy Vercel

## Jalankan lokal
Buka `index.html` melalui Acode Preview atau browser. Tidak perlu npm/framework.

## Deploy ke Vercel
1. Upload repository ini ke GitHub, atau gunakan Vercel Drop untuk deploy folder/ZIP.
2. Pada konfigurasi proyek, pilih Framework Preset `Other` bila diminta.
3. Build Command: kosongkan / Override off.
4. Output Directory: `.` (root proyek), bila diminta.
5. Deploy. Pastikan `index.html`, folder `css/`, folder `js/`, dan `vercel.json` berada di root.

## Keamanan
- `vercel.json` menambahkan CSP, `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options`, dan `Permissions-Policy`.
- HTML juga memiliki CSP meta sebagai fallback.
- Tidak menggunakan library pihak ketiga atau API eksternal.
- Label tombol ditampilkan dengan `textContent`, bukan ditafsirkan sebagai HTML.
- Jangan simpan API key atau rahasia di frontend.
- Jika nanti menambah API/font/library eksternal, sesuaikan CSP hanya untuk domain yang memang diperlukan.
