export type ApiDomain = {
  id: string; label: string; accent: string; summary: string;
  endpoints: string[];
  tag: string;
};

export const apiCatalog: ApiDomain[] = [
  {
    id: 'auth',
    label: 'Auth',
    accent: '#38bdf8',
    summary:
        'GitHub OAuth tokens, session exchange, grants, and account deletion workflows.',
    endpoints: [
      'POST /auth/github/url', 'POST /auth/github/callback',
      'POST /auth/delete', 'POST /auth/logout', 'POST /auth/refresh'
    ],
    tag: 'access',
  },
  {
    id: 'profile',
    label: 'Profile',
    accent: '#a78bfa',
    summary:
        'User profile, preferences, and k3h4-coin sandbox balance fetch/update.',
    endpoints:
        ['GET /profile', 'PATCH /profile', 'GET /telemetry', 'POST /telemetry'],
    tag: 'identity',
  },
  {
    id: 'bank',
    label: 'Bank',
    accent: '#6cf1d0',
    summary: 'Balance operations, escrow-like ledger, and transaction history.',
    endpoints:
        ['GET /bank/balance', 'POST /bank/balance', 'GET /bank/transactions'],
    tag: 'ledger',
  },
  {
    id: 'personas',
    label: 'Personas',
    accent: '#c084fc',
    summary:
        'Seed/generate personas, manage attributes, approvals, and compute Jaccard + ONNX compatibility.',
    endpoints: [
      'GET /personas',
      'POST /personas',
      'POST /personas/generate',
      'PUT /personas/:id/attributes',
      'POST /personas/compatibility/recompute',
      'GET /personas/compatibility',
      'POST /personas/compatibility/confusion',
    ],
    tag: 'graph',
  },
  {
    id: 'assignment',
    label: 'Assignments',
    accent: '#f59e0b',
    summary:
        'Hourly assignments, timecards, payouts, and coin debits to bank ledger.',
    endpoints: [
      'GET /assignments', 'POST /assignments',
      'POST /assignments/:id/timecards', 'POST /assignments/:id/pay'
    ],
    tag: 'work',
  },
  {
    id: 'staffing',
    label: 'Staffing',
    accent: '#60a5fa',
    summary:
        'Engagements, roles, candidates, shifts, placements, and coverage metrics.',
    endpoints: [
      'GET /staffing/dashboard', 'POST /staffing/engagements',
      'POST /staffing/roles', 'POST /staffing/candidates',
      'POST /staffing/shifts', 'POST /staffing/placements'
    ],
    tag: 'ops',
  },
  {
    id: 'agriculture',
    label: 'Agriculture',
    accent: '#86efac',
    summary:
        'Plots, slots, crop plans, conditions, tasks, and inventory flows.',
    endpoints: [
      'GET /agriculture/overview',
      'GET /agriculture/slots',
      'POST /agriculture/slots/unlock',
      'GET /agriculture/plots',
      'POST /agriculture/plots',
      'POST /agriculture/plots/:id/condition',
      'GET /agriculture/plans',
      'POST /agriculture/tasks',
      'POST /agriculture/shipments',
    ],
    tag: 'sim',
  },
  {
    id: 'arcade',
    label: 'Arcade',
    accent: '#f472ff',
    summary:
        'Machines, cards, top-ups, sessions, prize vault, and redemptions.',
    endpoints: [
      'GET /arcade/overview', 'POST /arcade/cards',
      'POST /arcade/cards/:id/topup', 'POST /arcade/sessions',
      'POST /arcade/prizes/:id/redeem'
    ],
    tag: 'games',
  },
  {
    id: 'pos',
    label: 'POS',
    accent: '#f472b6',
    summary:
        'Stores, tickets, line items, and revenue aggregation per channel.',
    endpoints: ['GET /pos/overview', 'POST /pos/tickets', 'POST /pos/stores'],
    tag: 'retail',
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    accent: '#e0e7ff',
    summary: 'Inventory items, locations, and freight-linked stock updates.',
    endpoints: [
      'GET /warehouse/items', 'POST /warehouse/items',
      'PATCH /warehouse/items/:id'
    ],
    tag: 'logistics',
  },
  {
    id: 'actors',
    label: 'Actors & Entities',
    accent: '#94a3b8',
    summary: 'Direct actor/entity CRUD for prototyping new backend tables.',
    endpoints: [
      'GET /actors',
      'POST /actors',
      'GET /actors/:id',
      'PATCH /actors/:id',
      'DELETE /actors/:id',
      'GET /actors/:actorId/entities',
      'POST /actors/:actorId/entities',
      'GET /entities/:id',
      'PATCH /entities/:id',
      'DELETE /entities/:id',
    ],
    tag: 'platform',
  },
  {
    id: 'culinary',
    label: 'Culinary',
    accent: '#fcd34d',
    summary: 'Menu items, prep tasks, and supplier needs lifecycle.',
    endpoints: [
      'GET /culinary/overview', 'POST /culinary/menu-items',
      'POST /culinary/prep-tasks', 'POST /culinary/supplier-needs'
    ],
    tag: 'kitchen',
  },
  {
    id: 'usda',
    label: 'USDA',
    accent: '#7dd3fc',
    summary:
        'ESR/GATS/PSD data relays with caching for regions, commodities, and flows.',
    endpoints: [
      'GET /usda/esr/regions',
      'GET /usda/esr/exports/all-countries',
      'GET /usda/gats/commodities',
      'GET /usda/gats/census/exports',
      'GET /usda/gats/un/imports',
      'GET /usda/psd/commodity/world',
    ],
    tag: 'data',
  },
];
