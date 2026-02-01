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
      'POST /user/auth/github/url', 'POST /user/auth/github/callback',
      'POST /user/auth/delete', 'POST /user/auth/logout',
      'POST /user/auth/refresh'
    ],
    tag: 'access',
  },
  {
    id: 'profile',
    label: 'Profile',
    accent: '#a78bfa',
    summary:
        'User profile, preferences, and k3h4-coin sandbox balance fetch/update.',
    endpoints: [
      'GET /user/profile', 'PATCH /user/profile', 'GET /entity/telemetry',
      'POST /entity/telemetry'
    ],
    tag: 'identity',
  },
  {
    id: 'bank',
    label: 'Bank',
    accent: '#6cf1d0',
    summary: 'Balance operations, escrow-like ledger, and transaction history.',
    endpoints: [
      'GET /entity/bank/balance', 'POST /entity/bank/balance',
      'GET /entity/bank/transactions'
    ],
    tag: 'ledger',
  },
  {
    id: 'personas',
    label: 'Personas',
    accent: '#c084fc',
    summary:
        'Seed/generate personas, manage attributes, approvals, and compute Jaccard + ONNX compatibility.',
    endpoints: [
      'GET /entity/personas',
      'POST /entity/personas',
      'POST /entity/personas/generate',
      'PUT /entity/personas/:id/attributes',
      'POST /entity/personas/compatibility/recompute',
      'GET /entity/personas/compatibility',
      'POST /entity/personas/compatibility/confusion',
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
      'GET /entity/assignments', 'POST /entity/assignments',
      'POST /entity/assignments/:id/timecards',
      'POST /entity/assignments/:id/pay'
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
      'GET /entity/staffing/dashboard', 'POST /entity/staffing/engagements',
      'POST /entity/staffing/roles', 'POST /entity/staffing/candidates',
      'POST /entity/staffing/shifts', 'POST /entity/staffing/placements'
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
      'GET /entity/agriculture/overview',
      'GET /entity/agriculture/slots',
      'POST /entity/agriculture/slots/unlock',
      'GET /entity/agriculture/plots',
      'POST /entity/agriculture/plots',
      'POST /entity/agriculture/plots/:id/condition',
      'GET /entity/agriculture/plans',
      'POST /entity/agriculture/tasks',
      'POST /entity/agriculture/shipments',
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
      'GET /entity/arcade/overview', 'POST /entity/arcade/cards',
      'POST /entity/arcade/cards/:id/topup', 'POST /entity/arcade/sessions',
      'POST /entity/arcade/prizes/:id/redeem'
    ],
    tag: 'games',
  },
  {
    id: 'pos',
    label: 'POS',
    accent: '#f472b6',
    summary:
        'Stores, tickets, line items, and revenue aggregation per channel.',
    endpoints: [
      'GET /entity/pos/overview', 'POST /entity/pos/tickets',
      'POST /entity/pos/stores'
    ],
    tag: 'retail',
  },
  {
    id: 'warehouse',
    label: 'Warehouse',
    accent: '#e0e7ff',
    summary: 'Inventory items, locations, and freight-linked stock updates.',
    endpoints: [
      'GET /entity/warehouse/items', 'POST /entity/warehouse/items',
      'PATCH /entity/warehouse/items/:id'
    ],
    tag: 'logistics',
  },
  {
    id: 'actors',
    label: 'Actors & Entities',
    accent: '#94a3b8',
    summary: 'Direct actor/entity CRUD for prototyping new backend tables.',
    endpoints: [
      'GET /actor/actors',
      'POST /actor/actors',
      'GET /actor/actors/:id',
      'PATCH /actor/actors/:id',
      'DELETE /actor/actors/:id',
      'GET /actor/actors/:actorId/entities',
      'POST /actor/actors/:actorId/entities',
      'GET /entity/entities/:id',
      'PATCH /entity/entities/:id',
      'DELETE /entity/entities/:id',
    ],
    tag: 'platform',
  },
  {
    id: 'culinary',
    label: 'Culinary',
    accent: '#fcd34d',
    summary: 'Menu items, prep tasks, and supplier needs lifecycle.',
    endpoints: [
      'GET /entity/culinary/overview', 'POST /entity/culinary/menu-items',
      'POST /entity/culinary/prep-tasks', 'POST /entity/culinary/supplier-needs'
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
      'GET /entity/usda/esr/regions',
      'GET /entity/usda/esr/exports/all-countries',
      'GET /entity/usda/gats/commodities',
      'GET /entity/usda/gats/census/exports',
      'GET /entity/usda/gats/un/imports',
      'GET /entity/usda/psd/commodity/world',
    ],
    tag: 'data',
  },
];
