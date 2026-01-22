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

## Frontend namespaces

- Use the `@/` alias for local modules instead of deep relative paths (for example, `@/components/ui`, `@/react-hooks/auth`, `@/zustand-stores/persona`, `@/radix-primitives`).
- Keep barrels scoped to their domain; avoid cross-domain re-exports (e.g., no radix components re-exported from r3f primitives).
- Import order convention: external → `@/` aliases → relative `./` where needed inside a folder.
