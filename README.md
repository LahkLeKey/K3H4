# K3H4 Monorepo

Public monorepo for the K3H4 platform: Fastify + Prisma API and a React (Bun + Vite) web app.

## Projects
- apps/api.k3h4.io — Fastify API with Prisma, JWT auth, and feature routes (auth, bank, freight, agriculture, culinary, POS, warehouse, personas).
- apps/www.k3h4.io — React SPA built with Bun, Vite, TanStack Query, Radix UI, Tailwind.

## Prerequisites
- Bun 1.3.x (repo scripts assume Bun)
- Docker (optional) if you run docker-compose services

## Quick Start
```bash
# install
bun install

# API dev
cd apps/api.k3h4.io
bun install
bun run dev

# Web dev
cd ../www.k3h4.io
bun install
bun run dev
```

## Testing
```bash
# API tests
cd apps/api.k3h4.io
bun run test

# Web tests
cd apps/www.k3h4.io
bun run test

# Web coverage
bun run test --coverage
```

## Coverage Reporting
- Web app: `cd apps/www.k3h4.io && bun run test --coverage` prints the v8 summary. Use the root `bun run coverage:report` command to refresh the snapshot below automatically.
- API: `cd apps/api.k3h4.io && bun run test:coverage` (also triggered by `bun run coverage:report`).
- Snapshot is captured from the v8 summary table that starts with `% Coverage report from v8`.



## Database (API)
- Prisma schema: apps/api.k3h4.io/prisma/schema.prisma
- Generate client: bun run prisma:generate
- Migrate (dev): bun run prisma:migrate

## Docker
- docker-compose at repo root (optional helpers)
- Up: docker compose up --build

## Deployment
- Web: Vercel (build runs `bun run build` -> `tsc -b && bun run scripts/build.ts`)
- API: containerized (see apps/api.k3h4.io/Dockerfile)

## Notes
- TypeScript strict in both apps.
- Vitest + Testing Library for tests.
- Radix UI + Tailwind for UI primitives.

<!-- coverage-start -->
## Latest Coverage
Updated: 2025-12-29T13:29:23.239Z

### Web (apps/www.k3h4.io) ![Web (apps/www.k3h4.io) coverage](https://img.shields.io/badge/Web_(apps%2Fwww.k3h4.io)-91.64%25-blue)

| App | %Stmts | %Branch | %Funcs | %Lines |
| --- | ------ | ------- | ------ | ------ |
| Web (apps/www.k3h4.io) | 91.64 | 65.18 | 77.43 | 91.64 |

<details><summary>Full report</summary>

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --- | --- | --- | --- | --- | --- |
| ------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files | 91.64 | 65.18 | 77.43 | 91.64 |
| src | 100 | 100 | 100 | 100 |
| App.tsx | 100 | 100 | 100 | 100 |
| src/components | 98.38 | 71.15 | 81.81 | 98.38 |
| ...s-section.tsx | 100 | 100 | 100 | 100 |
| auth-cta.tsx | 100 | 87.5 | 100 | 100 | 36 |
| ...atus-card.tsx | 100 | 100 | 100 | 100 |
| ...-boundary.tsx | 100 | 88.88 | 100 | 100 | 15 |
| navbar.tsx | 100 | 100 | 100 | 100 |
| ...ces-panel.tsx | 100 | 42.85 | 100 | 100 | ...46,49-60,63-64 |
| ...ile-panel.tsx | 94.59 | 50 | 100 | 94.59 | 35-36 |
| profile-view.tsx | 100 | 16.66 | 100 | 100 | 18-34 |
| section.tsx | 94.44 | 25 | 100 | 94.44 | 21 |
| shell.tsx | 97.56 | 88.88 | 57.14 | 97.56 | 173-177 |
| ...ponents/agency | 98.47 | 71.92 | 80 | 98.47 |
| ...nt-agency.tsx | 98.18 | 76.92 | 78.57 | 98.18 | 60-61,75-76,82 |
| ...ce-dialog.tsx | 100 | 20 | 100 | 100 | 15-51 |
| ...ts/agriculture | 87.95 | 27.27 | 26.66 | 87.95 |
| ...dashboard.tsx | 87.95 | 27.27 | 26.66 | 87.95 | ...56-258,271-272 |
| ...omponents/bank | 94.68 | 26.66 | 23.07 | 94.68 |
| bank-table.tsx | 94.68 | 26.66 | 23.07 | 94.68 | ...,70-72,193-197 |
| ...nents/culinary | 87.09 | 22.58 | 23.52 | 87.09 |
| culinary-ops.tsx | 87.09 | 22.58 | 23.52 | 87.09 | ...90-292,305-306 |
| ...onents/freight | 69.08 | 61.03 | 38.46 | 69.08 |
| ...t-manager.tsx | 69.08 | 61.03 | 38.46 | 69.08 | ...12-414,461-465 |
| ...onents/persona | 87.94 | 48.64 | 46.66 | 87.94 |
| ...ona-table.tsx | 87.94 | 48.64 | 46.66 | 87.94 | ...04,189,252-256 |
| ...components/pos | 99.23 | 86.04 | 75 | 99.23 |
| ...dashboard.tsx | 99.23 | 86.04 | 75 | 99.23 | 220-221 |
| ...mponents/shell | 100 | 80.95 | 100 | 100 |
| action-bar.tsx | 100 | 100 | 100 | 100 |
| auth-button.tsx | 100 | 100 | 100 | 100 |
| brand.tsx | 100 | 100 | 100 | 100 |
| ...nt-switch.tsx | 100 | 75 | 100 | 100 | 12 |
| header.tsx | 100 | 66.66 | 100 | 100 | 58-59,65,109 |
| layout.tsx | 100 | 100 | 100 | 100 |
| nav-links.tsx | 100 | 50 | 100 | 100 | 31-35 |
| panel-grid.tsx | 100 | 100 | 100 | 100 |
| search-input.tsx | 100 | 100 | 100 | 100 |
| section-card.tsx | 100 | 100 | 100 | 100 |
| ...in-panels.tsx | 100 | 100 | 100 | 100 |
| status-line.tsx | 100 | 50 | 100 | 100 | 11 |
| top-tabs.tsx | 100 | 100 | 100 | 100 |
| view.tsx | 100 | 100 | 100 | 100 |
| src/components/ui | 90.59 | 75.41 | 85.39 | 90.59 |
| accordion.tsx | 100 | 100 | 100 | 100 |
| alert-dialog.tsx | 89.89 | 100 | 50 | 89.89 | 47-56 |
| alert.tsx | 100 | 100 | 100 | 100 |
| aspect-ratio.tsx | 100 | 100 | 100 | 100 |
| avatar.tsx | 100 | 100 | 100 | 100 |
| badge.tsx | 100 | 100 | 100 | 100 |
| breadcrumb.tsx | 100 | 87.5 | 100 | 100 | 48 |
| button-group.tsx | 100 | 75 | 100 | 100 | 47 |
| button.tsx | 100 | 100 | 100 | 100 |
| calendar.tsx | 92.55 | 50 | 66.66 | 92.55 | ...60-167,196-198 |
| card.tsx | 100 | 100 | 100 | 100 |
| carousel.tsx | 90.86 | 60 | 100 | 90.86 | ...28-129,229,258 |
| chart.tsx | 79.38 | 40 | 100 | 79.38 | ...48,350-353,357 |
| checkbox.tsx | 100 | 100 | 100 | 100 |
| collapsible.tsx | 100 | 100 | 100 | 100 |
| command.tsx | 91.66 | 100 | 50 | 91.66 | 27-36 |
| context-menu.tsx | 84.78 | 87.5 | 100 | 84.78 | 25-37,44-52 |
| dialog.tsx | 88.23 | 100 | 50 | 88.23 | 71-80 |
| drawer.tsx | 82.5 | 100 | 33.33 | 82.5 | 57-63,68-74 |
| ...down-menu.tsx | 100 | 83.33 | 100 | 100 | 31,151 |
| empty.tsx | 100 | 100 | 100 | 100 |
| field.tsx | 93.33 | 73.33 | 100 | 93.33 | ...07-213,218-219 |
| form.tsx | 96.19 | 81.25 | 100 | 96.19 | 46-47,50-51 |
| hover-card.tsx | 100 | 100 | 100 | 100 |
| input-group.tsx | 98.54 | 87.5 | 100 | 98.54 | 71-72 |
| input-otp.tsx | 94 | 66.66 | 100 | 94 | 50-52 |
| input.tsx | 100 | 100 | 100 | 100 |
| item.tsx | 92.99 | 90 | 90 | 92.99 | 169-180 |
| kbd.tsx | 100 | 100 | 100 | 100 |
| label.tsx | 100 | 100 | 100 | 100 |
| menubar.tsx | 85.94 | 85.71 | 66.66 | 85.94 | ...97-206,213-218 |
| ...tion-menu.tsx | 89.01 | 100 | 100 | 89.01 | 104-114 |
| pagination.tsx | 87.8 | 100 | 80 | 87.8 | 96-106 |
| popover.tsx | 100 | 100 | 100 | 100 |
| progress.tsx | 100 | 50 | 100 | 100 | 22 |
| radio-group.tsx | 100 | 100 | 100 | 100 |
| resizable.tsx | 100 | 100 | 100 | 100 |
| scroll-area.tsx | 97.14 | 66.66 | 100 | 97.14 | 36 |
| select.tsx | 89.38 | 100 | 100 | 89.38 | 106-111,141-146 |
| separator.tsx | 100 | 50 | 100 | 100 | 20 |
| sheet.tsx | 100 | 100 | 100 | 100 |
| sidebar.tsx | 77.09 | 65.38 | 60 | 77.09 | ...95,640,677-705 |
| skeleton.tsx | 100 | 100 | 100 | 100 |
| slider.tsx | 100 | 100 | 100 | 100 |
| sonner.tsx | 100 | 100 | 100 | 100 |
| spinner.tsx | 100 | 100 | 100 | 100 |
| switch.tsx | 100 | 100 | 100 | 100 |
| table.tsx | 81.48 | 100 | 100 | 81.48 | 43-51,100-105 |
| tabs.tsx | 100 | 100 | 100 | 100 |
| textarea.tsx | 100 | 100 | 100 | 100 |
| toggle-group.tsx | 100 | 100 | 100 | 100 |
| toggle.tsx | 100 | 100 | 100 | 100 |
| tooltip.tsx | 100 | 100 | 100 | 100 |
| ...ents/warehouse | 90.1 | 45.45 | 33.33 | 90.1 |
| ...dashboard.tsx | 90.1 | 45.45 | 33.33 | 90.1 | ...31,140-144,178 |
| src/data | 100 | 100 | 100 | 100 |
| domains.ts | 100 | 100 | 100 | 100 |
| src/hooks | 94.75 | 57.05 | 96.92 | 94.75 |
| ...re-queries.ts | 98.26 | 48.27 | 92.3 | 98.26 | 107-108 |
| ...nt-queries.ts | 96.26 | 51.72 | 100 | 96.26 | 70-73 |
| ...th-profile.ts | 79.74 | 75 | 66.66 | 79.74 | ...25-132,147-162 |
| ...th-queries.ts | 98.43 | 63.15 | 100 | 98.43 | 41-42 |
| ...nk-queries.ts | 95.6 | 46.15 | 100 | 95.6 | 54-57 |
| ...ry-queries.ts | 95.96 | 48.48 | 92.3 | 95.96 | ...38-139,142-143 |
| ...ht-queries.ts | 100 | 55.55 | 100 | 100 | ...,76,87,106,108 |
| use-k3h4-bank.ts | 100 | 75 | 100 | 100 | 34-37,45 |
| use-mobile.tsx | 100 | 100 | 100 | 100 |
| ...na-queries.ts | 95.34 | 50 | 100 | 95.34 | 43-46 |
| ...os-queries.ts | 95.4 | 45.45 | 100 | 95.4 | 34-37 |
| ...se-queries.ts | 95.6 | 50 | 100 | 95.6 | 44-47 |
| src/lib | 100 | 76.36 | 100 | 100 |
| constants.ts | 100 | 100 | 100 | 100 |
| query-client.ts | 100 | 100 | 100 | 100 |
| store.ts | 100 | 100 | 100 | 100 |
| telemetry.ts | 100 | 73.46 | 100 | 100 | ...02-103,123,127 |
| utils.ts | 100 | 100 | 100 | 100 |
| src/pages | 100 | 92.85 | 66.66 | 100 |
| ...-callback.tsx | 100 | 90 | 50 | 100 | 20 |
| home.tsx | 100 | 100 | 100 | 100 |
| profile.tsx | 100 | 100 | 100 | 100 |
| src/stores | 100 | 100 | 100 | 100 |
| auth-store.ts | 100 | 100 | 100 | 100 |
| bank-store.ts | 100 | 100 | 100 | 100 |
| ------------------- | --------- | ---------- | --------- | --------- | ------------------- |

</details>

### API (apps/api.k3h4.io) ![API (apps/api.k3h4.io) coverage](https://img.shields.io/badge/API_(apps%2Fapi.k3h4.io)-80.01%25-blue)

| App | %Stmts | %Branch | %Funcs | %Lines |
| --- | ------ | ------- | ------ | ------ |
| API (apps/api.k3h4.io) | 80.01 | 77.05 | 95.83 | 80.01 |

<details><summary>Full report</summary>

| File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
| --- | --- | --- | --- | --- | --- |
| ----------------- | --------- | ---------- | --------- | --------- | --------------------- |
| All files | 80.01 | 77.05 | 95.83 | 80.01 |
| src | 0 | 0 | 0 | 0 |
| server.ts | 0 | 0 | 0 | 0 | 1-254 |
| src/routes | 92.91 | 77.27 | 100 | 92.91 |
| agriculture.ts | 100 | 50 | 100 | 100 | 59-61,81-82 |
| assignment.ts | 100 | 74.41 | 100 | 100 | ...,159-160,167,216 |
| auth.ts | 97.96 | 73.43 | 100 | 97.96 | 21-22,143-144 |
| bank.ts | 100 | 86.41 | 100 | 100 | ...,101,121,126-127 |
| culinary.ts | 100 | 55.55 | 100 | 100 | 59-60,79-80 |
| freight.ts | 100 | 84.09 | 100 | 100 | 10,17,79-83,118,147 |
| persona.ts | 100 | 61.11 | 100 | 100 | 19,69-78,99-100 |
| pos.ts | 100 | 76.92 | 100 | 100 | ...,114-123,128,152 |
| profile.ts | 0 | 100 | 100 | 0 | 5-97 |
| types.ts | 0 | 0 | 0 | 0 |
| warehouse.ts | 100 | 78.57 | 100 | 100 | 44,54-57,82,98-102 |
| ----------------- | --------- | ---------- | --------- | --------- | --------------------- |

</details>

<!-- coverage-end -->
