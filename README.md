# Yashwanth M S — Personal Portfolio Website

An Awwwards-inspired, high-performance personal portfolio website for **Yashwanth M S** — Computer Science Engineering Student at Malnad College of Engineering, Java Developer, and AI/ML Enthusiast.

Built with **React**, **TypeScript**, **Vite**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Unique Luxury Color Combination & Palette Switcher:**
  - **Default: Cyber Emerald & Champagne Gold:** Obsidian onyx background (`#05070D`), acid mint & emerald jade (`#10B981` / `#34D399`), and warm champagne amber (`#F59E0B`). Distinctive, executive, and mature.
  - **Live Palette Switcher:** Toggle anytime between **Emerald & Gold**, **Cyber Cyan**, and **Tokyo Amber** directly from the top telemetry bar.
- **Integrated Authentic User Photos:**
  - **Hero Master Portrait Studio:** Features your close-up portrait with an interactive 4-photo gallery slider (`[Portrait]`, `[Conference]`, `[Campus]`, `[Outdoor]`).
  - **IUCEE Experience & Leadership Card:** Displays your official **ICTIEE 2024 conference badge photo** with Malnad College of Engineering.
  - **About Me Campus Life:** Interactive campus photo switcher featuring your MCE campus photos.
  - **Resume Modal Header:** Embedded clean portrait headshot.
- **Unique Interactive UX & Micro-interactions:**
  - **Dynamic View Switcher:** Toggle between **"Gallery"** view and **"Java Spec"** in the Hero.
  - **Interactive Java REPL:** Click **"Run"** to execute simulated JVM 21 code with live terminal output.
  - **Interactive Simulation Widgets:** Test the **Carbon Emission slider** and the **Person Management REST API tab switcher**.
  - **Ambient Spotlight Effect:** Specular cursor lighting that dynamically illuminates cards as you move your mouse.
  - **Global Command Palette (`Ctrl + K` / `⌘K`):** Spotlight search for instant keyboard navigation across projects, skills, resume, and email.
  - **Floating Action Island / Dock:** Quick access bar at the bottom with keyboard shortcut hints and tactile audio sound effects toggle.
  - **Tactile Audio FX:** Web Audio API synthesizer generating subtle, high-tech clicks and pop sound effects on interaction.

- **6 Featured Projects:**
  1. **RailPulse:** Smart Complaint Resolution & Train Occupancy Analytics System *(Java, Spring Boot, MySQL)*
  2. **AI Design Thinking Tutor:** Personalized AI-Powered Learning Platform *(Python, LLMs, AR concepts)*
  3. **Intelligent Carbon Emission Management:** Data-Driven Carbon Emission Prediction *(ML Regression, Scikit-learn)*
  4. **AI-Powered Crop Disease Severity Estimation:** Deep Learning for Agriculture *(CNNs, TensorFlow)*
  5. **Person Management System:** Java & Spring Boot CRUD Application *(REST APIs, Hibernate, MySQL)*
  6. **LSTM & RL for Data Center Optimization:** Intelligent Resource Optimization *(LSTM, PPO Reinforcement Learning)*
- **Honest Project & Research Badges:** Clear distinctions for *"Completed"*, *"Active Prototype"*, *"Research in Progress"*, and *"Proposed Architecture"*.
- **Technical Competencies:** Structured skill cards across Languages, Web/Backend, Databases, AI/ML, and Developer Tools without misleading percentage bars.
- **Experience & Student Leadership:** Showcases contributions to the **IUCEE EWB–MCE Student Chapter**, **Avishkar Manthan Technical Symposium**, and the **CalmStack 24-Hour Hackathon**.
- **Scholarly Research:** Dedicated section for 6 core research vectors (XAI, Adaptive Deep Learning, Multi-Agent Systems, Sustainable Computing, Reinforcement Learning, Big Data) and working papers with DOI fields.
- **Printable Resume Viewer & Download:** Working `/resume.pdf` download + instant in-app modal with print-to-PDF support.
- **Validated Contact System:** Interactive form with client-side validation, direct `mailto:` fallback, copy-to-clipboard email pill, and celebration confetti.
- **Responsive & Accessible:** Fully responsive across mobile, tablet, and desktop viewports with keyboard navigation support (`Esc` key closes modals).


---

## 🚀 Quick Start (Running Locally)

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### 1. Installation
Clone or navigate to the project directory:
```bash
cd Portfolio
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:5173`.

### 3. Build for Production
```bash
npm run build
```
This builds an optimized production bundle inside the `dist/` directory.

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🛠️ How to Customize Your Content

All data is decoupled from UI components. To update any personal information, projects, skills, research, or links, simply edit:

📁 **`src/data/portfolioData.ts`**

### Modifying Your Details:
- **Personal Information:** Edit `personalInfo` (headline, bio, social links, email).
- **Projects:** Add, edit, or remove entries in `projectsData`. Change `status` to `'Completed'`, `'Active Prototype'`, `'Research in Progress'`, or `'Proposed Architecture'`.
- **Skills:** Add or update skills in `skillCategories`.
- **Research:** Add publications or research interests in `researchPublications` and `researchInterests`.
- **Experience:** Edit student leadership and hackathon operations in `experienceItems`.
- **Achievements:** Update certificates and awards in `achievementsList`.

### Updating Your Resume:
Place your updated resume file at:
📁 **`public/resume.pdf`**
The website is configured to download this file directly when clicking **"Download Resume"**.

### Connecting the Contact Form to a Backend:
By default, the contact form validates input and opens your default email client with a pre-formatted message. If you want emails sent directly to your inbox without opening the mail client, you can connect [Formspree](https://formspree.io) in `src/sections/ContactSection.tsx`:
```typescript
// Example Formspree endpoint dispatch in handleSubmit:
await fetch('https://formspree.io/f/YOUR_FORM_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});
```

---

## 🌐 Deployment

### Deploy to Vercel
1. Push this repository to your GitHub account.
2. Sign in to [Vercel](https://vercel.com/) and click **"Add New Project"**.
3. Import your repository.
4. Keep the default settings (Framework preset: `Vite`, Build command: `npm run build`, Output directory: `dist`).
5. Click **Deploy**.

### Deploy to Netlify
1. Sign in to [Netlify](https://www.netlify.com/).
2. Drag and drop the `dist/` folder into the Netlify dashboard, or connect your GitHub repository with:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

---

## 📄 License
Created for Yashwanth M S. Open for personal and educational portfolio use.
