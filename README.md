# SERVOTEL Landing Page

A modern, high-performance landing page for **SERVOTEL Haiti**, built with **React 19**, **Tailwind CSS**, and **Framer Motion**.  
This project delivers a luxury design aesthetic, dark mode support, and a responsive layout suitable for business and leisure travelers.

---

## 🚀 Project Overview

- **Framework**: React 19 + Vite
- **Styling**: Tailwind CSS (utility-first, responsive design)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Map Integration**: Google Maps Embed
- **Reviews**: Tripadvisor-style widget

---

## 📋 Requirements

- **Node.js** ≥ 18 (recommended: latest LTS)
- **npm** ≥ 9 (or yarn/pnpm)

---

## 🛠️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/josephschneiderzsx-maker/servotel-landing-page.git
cd servotel-landing-page
2. Install dependencies
bash
npm install
3. Configure Tailwind
Tailwind config files are already initialized:

tailwind.config.js

postcss.config.js

Ensure tailwind.config.js includes:

js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
4. Run development server
bash
npm run dev
⚡ Troubleshooting
Error: Cannot find package '@vitejs/plugin-react' → Fix: Install missing plugin

bash
npm install -D @vitejs/plugin-react
Error: could not determine executable to run when running Tailwind init → Fix: reinstall Tailwind CLI

bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Audit warnings → Run

bash
npm audit fix
(use --force only if necessary)

📂 Project Structure
Code
servotel-landing-page/
├── public/              # Static assets
├── src/
│   ├── components/      # React components (Hero, Rooms, Amenities, etc.)
│   ├── App.tsx          # Main app entry
│   ├── main.tsx         # React DOM render
│   └── types.ts         # Shared TypeScript types
├── index.html           # Vite entry HTML
├── tailwind.config.js   # Tailwind configuration
├── postcss.config.js    # PostCSS configuration
├── vite.config.ts       # Vite configuration
└── package.json
🖼️ Image Customization Guide
Section	File	Resolution (px)	Aspect Ratio	Notes
Hero Slider	components/Hero.tsx	1920×1080	16:9	Dark overlay applied
About Grid	components/About.tsx	800×1000	4:5 Portrait	Vertical works best
Rooms	components/Rooms.tsx	800×600	4:3	Consistent size
Amenities	components/Amenities.tsx	600×800	3:4 Portrait	Portrait images
Testimonials	components/Testimonials.tsx	100×100	1:1 Square	Cropped to circle
Logo	components/Navbar.tsx	Height: 100px	Flexible	PNG/SVG preferred
💡 Tips:

Compress images with TinyPNG

Use .webp for photos, .svg for logos

Dark mode logo handled via CSS filters (brightness-0 invert)

🗺️ Location Setup
To update the Google Map:

Go to Google Maps

Search for your location

Click Share → Embed a map

Copy the iframe src URL

Paste into components/Location.tsx

🎨 Theme Configuration
Primary Color: #167347 (Green)

Secondary Color: #f59e0b (Gold/Orange)

Dark Mode: Toggleable via Navbar icon (class="dark" strategy)

📜 License
MIT © 2025 Servotel Landing Page Project