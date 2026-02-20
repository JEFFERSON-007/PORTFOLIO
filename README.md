# 🌌 Modern 3D Immersive Portfolio

Welcome to the official repository for **Jefferson Raja's** professional portfolio. This is a high-performance, visually stunning 3D web application designed to showcase expertise in **Cybersecurity**, **Software Engineering**, and **Data Science**.

---

## ✨ Features

*   **🌀 Dynamic 3D Environment**: Interactive central sphere ("Droplet") with lerped scroll tracking and particle field physics.
*   **↔️ GSAP Horizontal Scroll**: Seamless navigation through sections via custom GSAP pinning and horizontal layout.
*   **👁️ Dynamic Contrast (Glassmorphism)**: Intuitive readability shields that adapt to background brightness, ensuring 100% legibility.
*   **📱 Fully Responsive**: Optimized for all screen sizes, from mobile to ultra-wide displays.
*   **🛠️ Tech Stacks Mastery**: Detailed skills section with custom-generated backgrounds and auto-fetching tech icons.
*   **📄 Integrated Resume**: One-click resume download functionality directly from the connect page.
*   **📡 Operational Terminal**: Real-time project showcases and a professional contact interface.

---

## 🚀 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **3D Engine**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) / [Three.js](https://threejs.org/)
- **Animations**: [GSAP](https://greensock.com/gsap/) (ScrollTrigger), [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/), [Simple Icons](https://simpleicons.org/)
- **Font**: [Inter](https://fonts.google.com/specimen/Inter)

---

## 🛠️ Local Development

### 1. Clone the repository
```bash
git clone https://github.com/JEFFERSON-007/PORTFOLIO.git
cd PORTFOLIO
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🎨 Customization Guide

### Updating the Resume
Place your `resume.pdf` in the `/public` directory. The download button is already configured to point to `/resume.pdf`.

### Changing the Profile Picture
Replace `/public/profile.jpg` with your own image to update the "About" section.

### Projects & Skills
Edit `src/app/page.tsx` to update project descriptions, images, or skill categories. The icons automatically fetch from Simple Icons based on the tag names.

---

## 📦 Build & Deployment

To create a production build:
```bash
npm run build
```

To start the production server:
```bash
npm run start
```

---

## 🛡️ Security & Performance
- **Optimized Assets**: Optimized 3D geometry and image loading for fast Time to Interactive.
- **SSR Disabled for 3D**: Client-side only rendering for heavy 3D components to prevent hydration mismatches.
- **Type Safety**: Built with TypeScript for a robust development experience.

---

## 👨‍💻 Author
**Jefferson Raja A**
- GitHub: [@JEFFERSON-007](https://github.com/JEFFERSON-007)
- LinkedIn: [Jefferson Raja A](https://www.linkedin.com/in/jefferson-raja-a-170740323/)

---
*Built with ❤️ and a lot of ☕ by Antigravity AI.*
