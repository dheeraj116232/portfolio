# Dheeraj Kumar — Portfolio

A cinematic, dark-themed personal portfolio showcasing AI engineering and full-stack development work. Built with React 19, TypeScript, and React Three Fiber, featuring a 3D hero scene, smooth scroll, and a fully responsive, animated UI.

**Live Demo:** [Add your deployed URL here]

---

## Overview

This portfolio presents my background as an AI Engineer and Full-Stack Developer, including:

- **About** — Background, focus areas, and engineering philosophy
- **Skills** — Programming, AI/ML, Frontend, Backend, and Tools, with proficiency indicators
- **Projects** — Featured builds including an AI Business Intelligence Platform, Multi-Agent Travel AI, AI Blog Agent System, this 3D portfolio site, a customer segmentation model, and a RAG chatbot
- **Experience** — Internship history at NIT Tiruchirappalli in full-stack development and data science
- **Education** — B.Tech in Civil Engineering (Minor: Computer Science), NIT Tiruchirappalli
- **Achievements** — Scholarships, hackathons, olympiads, and certifications (Oracle AI, Generative AI, Machine Learning)

## Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19, Vite, TypeScript |
| Styling | Tailwind CSS v4 |
| Animation | Framer Motion |
| 3D Graphics | React Three Fiber, Drei |
| Scrolling | Lenis (smooth scroll) |
| Forms | EmailJS |
| Icons | Lucide React, React Icons |

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/dheeraj116232/portfolio.git
cd portfolio
npm install
```

### Development

```bash
npm run dev
```

Visit the local URL Vite prints (typically `http://localhost:5173`).

### Production Build

```bash
npm run build      # Build for production
npm run preview    # Preview the production build locally
```

## Environment Variables

The contact form uses [EmailJS](https://www.emailjs.com/) for message delivery.

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```
2. Add your EmailJS credentials:
   ```env
   VITE_EMAILJS_SERVICE_ID=your_service_id
   VITE_EMAILJS_TEMPLATE_ID=your_template_id
   VITE_EMAILJS_PUBLIC_KEY=your_public_key
   ```

> **Note:** Without valid keys, the form will still validate input and simulate a success response locally.

## Project Structure

```
src/
├── components/     # Navbar, custom cursor, loader, modal, 3D hero scene, UI primitives
├── sections/       # Page sections (About, Skills, Projects, Experience, etc.)
├── hooks/          # Lenis smooth scroll, active section tracking, media queries, magnetic hover
├── constants/       # Content data (personal info, skills, projects, experience)
├── utils/          # Helper functions
└── styles/         # Global CSS and design tokens
```

## Customization

| Content | File |
|---|---|
| Bio, social links, stats | `src/constants/personal.ts` |
| Skills & proficiency levels | `src/constants/skills.ts` |
| Projects | `src/constants/projects.ts` |
| Experience, education, achievements | `src/constants/experience.ts` |
| Theme tokens & colors | `src/styles/globals.css` |
| Resume | Replace `public/Dheeraj_Kumar_Resume.pdf` |

## Roadmap

See [`TODO.md`](./TODO.md) for planned improvements and known issues.

## License

This is a personal portfolio project. All content, including copy, project descriptions, and resume materials, is © Dheeraj Kumar. Code structure may be referenced for learning purposes.

## Contact

- **Portfolio:** [Add your deployed URL]
- **LinkedIn:** [Add your LinkedIn]
- **GitHub:** [github.com/dheeraj116232](https://github.com/dheeraj116232)
- **Email:** [Add your email]
