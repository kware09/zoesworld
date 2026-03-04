# Zoe's World

## Project Overview
A calm, playful phonics practice web app for a 6-year-old. Three mini-games (Robot Talk, Sound Ninja, Word Explorer) with a star reward system, decoration shop, and hidden parent panel.

## Tech Stack
- Next.js 15 (App Router) with TypeScript
- TailwindCSS v4 with custom pastel theme (defined in `src/app/globals.css` @theme block)
- localStorage for all persistence (no backend)
- Web Speech API for phoneme audio
- Google Fonts: Fredoka (display) + Nunito (body)

## Development
```
npm install
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint
```

## Conventions
- All interactive components use "use client" directive
- State management via React Context (`GameContext`, `WorldContext`) in `src/context/`
- Game state hook: `useGame()` from `@/context/GameContext`
- World/decoration hook: `useWorld()` from `@/context/WorldContext`
- localStorage keys prefixed with `zw_` (defined in `src/lib/storage.ts`)
- Calm design: pastels, rounded-2xl, shadow-soft, 80px min touch targets
- Path aliases: `@/` maps to `./src/`
