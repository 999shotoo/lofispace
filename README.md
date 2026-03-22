# lofiSpace

lofiSpace is a modern lofi streaming web app with an immersive console-style listening experience for songs and live stations.

[![Live](https://img.shields.io/badge/Live-lofi.shotoo.tech-111111?style=for-the-badge)](https://lofi.shotoo.tech)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![React](https://img.shields.io/badge/React-19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

## Preview

![lofiSpace OG Preview](public/og-image.webp)

![Home Background](src/assets/jazz_mix.webp)

## Highlights

- Smooth home-to-console transition and animated landing experience
- Console UI for songs and live stations
- Sidebar player with queue, controls, and responsive behavior
- Overflow-aware truncation and tooltip UX
- Optimized image loading and lightweight transitions
- SEO and social sharing metadata ready for production
- Vercel deployment-ready setup

## Live App

- Production: [https://lofi.shotoo.tech](https://lofi.shotoo.tech)

## Routes

| Route | Description |
|---|---|
| `/` | Home landing page |
| `/download` | Download / Coming Soon page |
| `/console` | Main listening console |
| `/console/stations` | Live stations |
| `/console/songs` | Songs library |

## Data Sources (JSON)

- Songs dataset: [src/lib/lofi-songs.json](src/lib/lofi-songs.json)
- Stations dataset: [src/lib/lofi-stations.json](src/lib/lofi-stations.json)

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router DOM
- Framer Motion
- Tailwind CSS v4
- Base UI (`@base-ui/react`)
- Lucide React icons

## Project Structure

```text
src/
  assets/
  components/
    console/
    ui/
  context/
    player-context.tsx
  hooks/
    use-mobile.ts
    useAudio.ts
    useStations.ts
  layout/
    ConsoleLayout.tsx
  lib/
    lofi-songs.json
    lofi-stations.json
  pages/
    Home.tsx
    Download.tsx
    Console.tsx
    console/
      songs.tsx
      stations.tsx
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
npm install
```

### Run Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment (Vercel)

This project already includes a production-ready [vercel.json](vercel.json) with:

- SPA rewrites for client-side routes
- static asset caching headers
- security headers (CSP, referrer policy, etc.)
- clean URL configuration

Deploy flow:

1. Push to GitHub
2. Import repository in Vercel
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy

## SEO Setup

- Canonical domain: `https://lofi.shotoo.tech/`
- Open Graph + Twitter tags in [index.html](index.html)
- OG image: [public/og-image.webp](public/og-image.webp)
- Robots file: [public/robots.txt](public/robots.txt)
- Sitemap: [public/sitemap.xml](public/sitemap.xml)
- Web manifest: [public/site.webmanifest](public/site.webmanifest)

Submit sitemap to Google Search Console:

- `https://lofi.shotoo.tech/sitemap.xml`

## Favicons and PWA Assets

- [public/favicon.ico](public/favicon.ico)
- [public/favicon.svg](public/favicon.svg)
- [public/favicon-96x96.png](public/favicon-96x96.png)
- [public/apple-touch-icon.png](public/apple-touch-icon.png)
- [public/web-app-manifest-192x192.png](public/web-app-manifest-192x192.png)
- [public/web-app-manifest-512x512.png](public/web-app-manifest-512x512.png)

## Notes

- Console experience is optimized for desktop and tablet.
- Mobile users see a themed unsupported-view message for console routes.

## License

This project was built for final-year project and educational use.
