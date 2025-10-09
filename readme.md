# quartzee.dev

Minimal, terminal‑styled personal site built with React, TypeScript, Vite and Tailwind CSS.

## Overview

The app renders a simple landing page with:
- Animated scrolling page title (`AnimatedTitle`).
- About section with skills grid (`About`).
- Spotify “Currently Playing” widget (`CurrentlyPlaying`) that auto‑refreshes.
- Prepared UI blocks for an anonymous letterbox and shoutbox (`Letterbox`, `Shoutbox`).

Meta tags and social preview are defined in `main.dev/index.html` and the image is in `main.dev/public/og-image.png`.

## Tech Stack

- `React 18`, `TypeScript`, `Vite 5`
- `Tailwind CSS`
- `lucide-react` (icons)

## Getting Started

Prerequisites: Node.js `>=18` and npm.

```bash
cd main.dev
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

### Scripts
- `npm run dev` – start development server.
- `npm run build` – build to `dist`.
- `npm run preview` – preview the production build.
- `npm run lint` – run ESLint (flat config).

## Environment

The Spotify widget needs an access token:

1) Create `main.dev/.env.local` with:
```
VITE_SPOTIFY_ACCESS_TOKEN=<your_token>
```
2) The token must be a valid OAuth access token for the Spotify Web API. For local testing you can generate a short‑lived token via the Spotify Developer Console. Keep it private.

## Project Structure

- `main.dev/src/App.tsx` – page composition.
- `main.dev/src/components/AnimatedTitle.tsx` – scrolling document title.
- `main.dev/src/components/About.tsx` – intro and skills section.
- `main.dev/src/components/CurrentlyPlaying.tsx` – Spotify widget (uses `VITE_SPOTIFY_ACCESS_TOKEN`).
- `main.dev/src/components/Letterbox.tsx`, `Shoutbox.tsx` – UI placeholders.
- `main.dev/src/index.css` – Tailwind and custom styles.
- `main.dev/tailwind.config.js` – font and color extensions.