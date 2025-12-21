# Bun + React

This app is bundled and served with Bun's native tooling.

## Commands

- `bun install` — install dependencies
- `bun run dev` - watch + serve from `dist` with Bun's bundler
- `bun run build` - production bundle to `dist`
- `bun run preview` - serve the built assets from `dist`

## Notes

- Static files in `public` are copied into `dist` on build.
- Bundler entry is `src/main.tsx`; output is `dist/main.js` (plus emitted assets).
