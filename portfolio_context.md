# Portfolio Project Context & Reference Guide

This document serves as the structural reference for the **Vidhu P Vinod Portfolio Website** to help AI agents and developers understand the codebase design, data schemas, and how to maintain and evolve the application.

---

## 🛠️ Technology Stack
- **Core**: React 18, TypeScript, Vite
- **Routing**: React Router DOM (v6/v7 syntax mapping)
- **Styling**: Tailwind CSS (loaded via `src/index.css` and configured in `tailwind.config.js`)
- **Assets**: Statically served from the `/public` folder

---

## 📁 Project Directory Structure
```text
Self-Portfolio/
├── public/                    # Static assets mapping directly to browser paths
│   ├── certificates/          # Scans of credentials (referenced in Accolades)
│   ├── photos/                # Personal photography gallery assets
│   ├── projects/              # Banner images for project cards
│   ├── profile.jpg            # Main portrait on landing page
│   └── resume.pdf             # Statically hosted resume file
├── src/
│   ├── components/            # Global UI modules
│   │   └── Layout.tsx         # Common shell (nav, footer, main container)
│   ├── data/                  # Local databases / lists
│   │   └── projects.ts        # Data array for Selected Works projects
│   ├── pages/                 # Full view routing pages
│   │   ├── Home.tsx           # Home landing page with Selected Works & Accolades
│   │   ├── ProjectDetails.tsx # Dynamically rendered case studies
│   │   ├── Photography.tsx    # Visual photography portfolio view
│   │   ├── InteractiveArchive.tsx # Retro mini-game directory / arcade hub
│   │   ├── TetrisGame.tsx     # Custom logic for the Arcade Tetris game
│   │   └── TetrisGame.css     # Game styling override declarations
│   ├── App.tsx                # Client-side router declarations
│   ├── index.css              # Global styles (Tailwind imports & font styling)
│   └── main.tsx               # DOM insertion entrypoint
├── tailwind.config.js         # Tailwind styling themes & responsive thresholds
├── tsconfig.json              # TypeScript compilation setup
└── vite.config.ts             # Vite bundler parameters
```

---

## 🔀 Application Routing & Navigation
Defined in [App.tsx](file:///home/vidhu/Desktop/project/projects/Self-Portfolio/src/App.tsx).
All pages are children of [Layout.tsx](file:///home/vidhu/Desktop/project/projects/Self-Portfolio/src/components/Layout.tsx) to render navigation and footers consistently.
- `/` ➔ `Home.tsx` (Homepage)
- `/projects/:id` ➔ `ProjectDetails.tsx` (Dynamically loaded case study)
- `/photography` ➔ `Photography.tsx` (Photography gallery)
- `/arcade` ➔ `InteractiveArchive.tsx` (Mini-game hub)
- `/arcade/tetris` ➔ `TetrisGame.tsx` (Tetris Game page)

---

## 📝 Guide for Content Updates

### 1. Adding/Editing Selected Works
Project records are stored in [projects.ts](file:///home/vidhu/Desktop/project/projects/Self-Portfolio/src/data/projects.ts).
To add a new project:
1. Save the preview image inside `/public/projects/` (preferably as `.png` or `.jpg`).
2. Add a new object inside the `projects` array:
   ```typescript
   {
     id: "unique-slug-id",
     title: "Project Name",
     description: "A summary of the project's purpose and utility.",
     github: "https://github.com/VidhuVi/repo", // Github repo link
     demo: "https://example.com",               // Live demo URL (or empty string if local)
     image: "/projects/your-image.png",         // Path relative to public folder
     features: [                                // Array of engineering milestones
       "Feature milestone 1",
       "Feature milestone 2"
     ]
   }
   ```
3. The project card will automatically display on the homepage, and dynamic routing will resolve its detailed page at `/projects/unique-slug-id`.

### 2. Adding/Modifying Accolades (Certificates & Wins)
The accolade data array is currently declared inline within the `Home.tsx` component in [Home.tsx](file:///home/vidhu/Desktop/project/projects/Self-Portfolio/src/pages/Home.tsx) (inside the "Accolades" section map).
To add an accolade:
1. Save the credentials picture or certificate PDF/JPG to `public/certificates/`.
2. Add a new entry to the array containing `title`, `org`, `description`, and `image`:
   ```typescript
   {
     title: "1st Place — Event Name",
     org: "Host organization",
     description: "Explanation of victory or validation parameters.",
     image: "/certificates/certificate-name.jpg"
   }
   ```

### 3. Contact & Resume Details
- **Email**: `vidhupvinod@gmail.com`
- **LinkedIn**: `https://www.linkedin.com/in/vidhu-p-vinod-66a84b291/`
- **Resume File**: Located at `/public/resume.pdf`
- **Navigation Links**: Anchor link navigation is handled using traditional hashes (`/#projects`, `/#accolades`, `/#about`, `/#contact`) because the components live together on the home route, utilizing standard HTML id tags.

---

## 🎨 Global Design System
- **Backgrounds**: Main site background is off-white (`bg-[#fafafa]`), panels/cards are pure white (`bg-white`), dark blocks use near-black (`bg-[#111111]`).
- **Typography**: Editorial emphasis uses italics (`font-editorial italic`), high emphasis headers use deep black weights (`font-black tracking-tighter`). Accent typography relies on standard sans system fonts stylized by Tailwind.
- **Accents**: Pure blue (`text-blue-600` / `bg-blue-600`) handles primary branding buttons, highlights, bullet points, and hover effects.
