export type AtlasMetric = {
    label: string;
    value: string;
    delta?: string;
    tone?: "up" | "down" | "steady";
};

export type AtlasAction = {
    label: string;
    description: string;
    tag?: string;
    cta?: string;
};

export type AtlasTimelineEvent = {
    at: string;
    title: string;
    detail: string;
    tone?: "positive" | "warn" | "info";
};

export type AtlasWorkItem = {
    title: string;
    owner: string;
    status: "ready" | "in-progress" | "blocked";
    eta: string;
};

export type AtlasStream = {
    label: string;
    status: string;
    volume: string;
    window: string;
    accent?: string;
};

type LightRig = {
    color: string;
    intensity: number;
    position: [number, number, number];
};

export type AtlasContext = {
    id: string;
    name: string;
    glyph?: string;
    accent: string;
    summary: string;
    anchor: [number, number, number];
    camera: { position: [number, number, number]; target: [number, number, number] };
    environment: {
        background: string;
        fog: { color: string; near: number; far: number };
        lights: { key: LightRig; fill: LightRig; rim: LightRig };
    };
    metrics: AtlasMetric[];
    actions: AtlasAction[];
    timeline: AtlasTimelineEvent[];
    streams: AtlasStream[];
    work: AtlasWorkItem[];
};

export const atlasContexts: AtlasContext[] = [
    {
        id: "bank",
        name: "Bank + Ledger",
        glyph: "🏦",
        accent: "#6cf1d0",
        summary: "Settlement spine for k3h4 coin, escrow, and nightly close.",
        anchor: [-3.4, 0.9, 3.8],
        camera: { position: [-7.2, 3.8, 9.2], target: [-1.2, 1.6, 2.8] },
        environment: {
            background: "#050b0e",
            fog: { color: "#050b0e", near: 12, far: 36 },
            lights: {
                key: { color: "#6cf1d0", intensity: 1.25, position: [-2, 7, 8] },
                fill: { color: "#7fa8ff", intensity: 0.5, position: [-8, 3, -4] },
                rim: { color: "#9ef0ff", intensity: 0.5, position: [1, 8, -6] },
            },
        },
        metrics: [
            { label: "Float", value: "₭1.24M", delta: "+4.1%", tone: "up" },
            { label: "Clearing", value: "412 txns", delta: "18 pending", tone: "steady" },
            { label: "Escrow", value: "₭82k held", delta: "-₭9k", tone: "down" },
        ],
        actions: [
            { label: "Start settlement", description: "Close open receipts + post ledgers for the last 30 minutes.", tag: "ledger", cta: "Settle now" },
            { label: "Reconcile rails", description: "Compare partner balances vs on-ledger float; file anomalies.", tag: "ops" },
            { label: "Escrow sweep", description: "Release aged arcade + freight escrows into earnings.", tag: "cash" },
        ],
        timeline: [
            { at: "14:10", title: "Batch window", detail: "42 payouts staged; partner rails green.", tone: "info" },
            { at: "13:42", title: "Escrow release", detail: "Arcade prize vault closed; ₭12.4k moved to float.", tone: "positive" },
            { at: "13:05", title: "Exception", detail: "2 ledger items need manual confirmation.", tone: "warn" },
        ],
        streams: [
            { label: "Receipts", status: "live", volume: "184/min", window: "last 15m", accent: "#6cf1d0" },
            { label: "Payouts", status: "cooldown", volume: "41 queued", window: "next run", accent: "#f4d35e" },
            { label: "Escrow", status: "steady", volume: "₭82k", window: "open holds", accent: "#a855f7" },
        ],
        work: [
            { title: "Post freight accessorials", owner: "Tala", status: "in-progress", eta: "16m" },
            { title: "Verify bank callbacks", owner: "Noah", status: "ready", eta: "queued" },
            { title: "Close day cycle draft", owner: "Inez", status: "blocked", eta: "needs fx" },
        ],
    },
    {
        id: "arcade",
        name: "Arcade",
        glyph: "🕹️",
        accent: "#f472ff",
        summary: "Run drops, tickets, and prize fulfillment for the arcade lane.",
        anchor: [4.6, 1, 3.6],
        camera: { position: [7.6, 3.2, 9.4], target: [3.2, 1.5, 2.8] },
        environment: {
            background: "#0c0814",
            fog: { color: "#0c0814", near: 13, far: 38 },
            lights: {
                key: { color: "#f472ff", intensity: 1.2, position: [4, 6, 6] },
                fill: { color: "#8eb8ff", intensity: 0.55, position: [-7, 3, -3] },
                rim: { color: "#7ef9e6", intensity: 0.45, position: [0, 7, -5] },
            },
        },
        metrics: [
            { label: "Runs live", value: "18", delta: "+3", tone: "up" },
            { label: "Tickets", value: "142k", delta: "+6.8%", tone: "up" },
            { label: "Breakage", value: "2.4%", delta: "flat", tone: "steady" },
        ],
        actions: [
            { label: "Launch sprint", description: "Start a 30-minute challenge and sync ledger hooks.", tag: "events", cta: "Start" },
            { label: "Refresh prizes", description: "Rotate high-velocity prizes into shelf A/B.", tag: "prizes" },
            { label: "Verify payouts", description: "Check prize vault against wallet transactions.", tag: "trust" },
        ],
        timeline: [
            { at: "14:18", title: "Ticket sync", detail: "Bank ledger matched to arcade vault.", tone: "positive" },
            { at: "13:50", title: "New drop staged", detail: """Night Freight"" run waiting for approval.", tone: "info" },
            { at: "13:20", title: "Latency watch", detail: "Controller input spike on pod #3.", tone: "warn" },
        ],
        streams: [
            { label: "Runs", status: "peak", volume: "18 active", window: "now", accent: "#f472ff" },
            { label: "Prizes", status: "ready", volume: "62 in stock", window: "shelf", accent: "#fef08a" },
            { label: "Wallet", status: "clean", volume: "₭38k", window: "circulating", accent: "#6cf1d0" },
        ],
        work: [
            { title: "Enable dual tickets for Atlas runs", owner: "Mara", status: "in-progress", eta: "28m" },
            { title: "Promote coop boss fight", owner: "Saul", status: "ready", eta: "now" },
            { title: "Patch renderer shaders", owner: "Ken", status: "ready", eta: "45m" },
        ],
    },
    {
        id: "agriculture",
        name: "Agri Ops",
        glyph: "🌾",
        accent: "#86efac",
        summary: "Plots, harvest cycles, and USDA resource telemetry.",
        anchor: [7.4, 1.05, -2.2],
        camera: { position: [11, 3.4, 0.4], target: [6.1, 1.6, -1.6] },
        environment: {
            background: "#071108",
            fog: { color: "#071108", near: 12, far: 36 },
            lights: {
                key: { color: "#86efac", intensity: 1.1, position: [5, 7, -2] },
                fill: { color: "#7fb6ff", intensity: 0.4, position: [-6, 3, -6] },
                rim: { color: "#b5ffda", intensity: 0.4, position: [0, 7, -5] },
            },
        },
        metrics: [
            { label: "Plots ready", value: "12", delta: "+2", tone: "up" },
            { label: "Moisture", value: "18.4%", delta: "stable", tone: "steady" },
            { label: "Yield est.", value: "6.2t", delta: "+0.3", tone: "up" },
        ],
        actions: [
            { label: "Trigger irrigation", description: "Pulse irrigation on west lots for 12 minutes.", tag: "water", cta: "Send" },
            { label: "Sync USDA feed", description: "Refresh grants + crop insurance snapshots.", tag: "data" },
            { label: "Stage harvest", description: "Open picker tasks for ripe plots.", tag: "ops" },
        ],
        timeline: [
            { at: "14:05", title: "Soil sync", detail: "Telemetry drift under 0.4% deviation.", tone: "positive" },
            { at: "13:40", title: "New subsidy", detail: "USDA pilot unlocked for test counties.", tone: "info" },
            { at: "13:02", title: "Irrigation hold", detail: "Pressure drop flagged on line B.", tone: "warn" },
        ],
        streams: [
            { label: "Soil probes", status: "live", volume: "48 sensors", window: "stream", accent: "#86efac" },
            { label: "Harvest", status: "queued", volume: "6 plots", window: "next 2h", accent: "#f59e0b" },
            { label: "Programs", status: "synced", volume: "3 grants", window: "today", accent: "#7dd3fc" },
        ],
        work: [
            { title: "Verify organic cert IDs", owner: "Jess", status: "ready", eta: "12m" },
            { title: "Tune drone paths", owner: "Ravi", status: "in-progress", eta: "34m" },
            { title: "Generate co-op rollup", owner: "Lin", status: "ready", eta: "1h" },
        ],
    },
    {
        id: "freight",
        name: "Freight",
        glyph: "🚚",
        accent: "#fbbf24",
        summary: "Linehaul pricing, routing, and exception sweeps.",
        anchor: [-7.2, 1.05, -0.6],
        camera: { position: [-11, 3.4, 2.2], target: [-6.1, 1.6, -0.1] },
        environment: {
            background: "#0f0c06",
            fog: { color: "#0f0c06", near: 13, far: 38 },
            lights: {
                key: { color: "#fbbf24", intensity: 1.15, position: [-6, 6, 2] },
                fill: { color: "#7fb6ff", intensity: 0.45, position: [6, 3, -6] },
                rim: { color: "#ffd166", intensity: 0.35, position: [0, 7, -5] },
            },
        },
        metrics: [
            { label: "Quotes", value: "64 today", delta: "+11%", tone: "up" },
            { label: "On-time", value: "94.2%", delta: "-0.8%", tone: "down" },
            { label: "Margin", value: "21.4%", delta: "flat", tone: "steady" },
        ],
        actions: [
            { label: "Reprice lanes", description: "Apply diesel index bump to spot quotes.", tag: "pricing", cta: "Apply" },
            { label: "Audit accessorials", description: "Validate lumper + detention before invoicing.", tag: "ops" },
            { label: "Push ETA alerts", description: "Send refreshed ETA to consignees on late legs.", tag: "notify" },
        ],
        timeline: [
            { at: "14:12", title: "Late flag", detail: "Linehaul #442 missed Memphis sort by 9m.", tone: "warn" },
            { at: "13:48", title: "New bid", detail: "Retailer RFP lanes posted for review.", tone: "info" },
            { at: "13:15", title: "Accessorial cleared", detail: "Detention auto-approved via sensor data.", tone: "positive" },
        ],
        streams: [
            { label: "Loads", status: "active", volume: "42 moving", window: "live", accent: "#fbbf24" },
            { label: "Exceptions", status: "watch", volume: "3 lanes", window: "needs eyes", accent: "#f97316" },
            { label: "Quotes", status: "steady", volume: "11 queued", window: "today", accent: "#60a5fa" },
        ],
        work: [
            { title: "Reprice Pacific lanes", owner: "Hana", status: "in-progress", eta: "21m" },
            { title: "Close BOL uploads", owner: "Dee", status: "ready", eta: "now" },
            { title: "Validate carrier scorecard", owner: "Omar", status: "ready", eta: "45m" },
        ],
    },
    {
        id: "warehouse",
        name: "Warehouse",
        glyph: "📦",
        accent: "#e0e7ff",
        summary: "Inventory handoff, dock schedule, and pick density.",
        anchor: [-1.5, 0.95, -5.4],
        camera: { position: [-3.2, 3.2, -10], target: [-0.6, 1.6, -4.2] },
        environment: {
            background: "#0b0f18",
            fog: { color: "#0b0f18", near: 12, far: 34 },
            lights: {
                key: { color: "#e0e7ff", intensity: 1.05, position: [-2, 6, -8] },
                fill: { color: "#8fb6ff", intensity: 0.5, position: [6, 3, 4] },
                rim: { color: "#a5f3fc", intensity: 0.4, position: [0, 7, 4] },
            },
        },
        metrics: [
            { label: "Dock turns", value: "9.4/hr", delta: "+0.6", tone: "up" },
            { label: "Pick density", value: "32.1 lines", delta: "-1.2", tone: "down" },
            { label: "ATP", value: "96.4%", delta: "ok", tone: "steady" },
        ],
        actions: [
            { label: "Re-slot fast movers", description: "Shift top 10 SKUs to aisle B compact bins.", tag: "slotting", cta: "Apply plan" },
            { label: "Balance docks", description: "Move freight dock 02 to outbound to cut dwell.", tag: "docks" },
            { label: "Cycle count pulse", description: "Quick count on aisle F after 3 heavy picks.", tag: "inventory" },
        ],
        timeline: [
            { at: "14:22", title: "Appointment arrived", detail: "Trailer 28F on dock 03; unload timer running.", tone: "info" },
            { at: "13:55", title: "Pick wave done", detail: "Batch 11 closed with 98.6% accuracy.", tone: "positive" },
            { at: "13:18", title: "Replen delay", detail: "Aisle D pallet short; bin audit scheduled.", tone: "warn" },
        ],
        streams: [
            { label: "Inbound", status: "steady", volume: "6 trucks", window: "today", accent: "#e0e7ff" },
            { label: "Outbound", status: "peak", volume: "38 pallets", window: "next 90m", accent: "#34d399" },
            { label: "Inventory", status: "watch", volume: "2 bins", window: "needs count", accent: "#fcd34d" },
        ],
        work: [
            { title: "Assign dock crews", owner: "Quinn", status: "ready", eta: "now" },
            { title: "Re-slot SKU 1140", owner: "Mina", status: "in-progress", eta: "17m" },
            { title: "Confirm replen pallet", owner: "Eli", status: "blocked", eta: "waiting" },
        ],
    },
    {
        id: "pos",
        name: "Point of Sale",
        glyph: "🧾",
        accent: "#f472b6",
        summary: "Checkout orchestration and receipt telemetry across sites.",
        anchor: [1.8, 0.95, 1.6],
        camera: { position: [4.4, 3.1, 6.4], target: [1.4, 1.5, 1] },
        environment: {
            background: "#0f0a10",
            fog: { color: "#0f0a10", near: 12, far: 34 },
            lights: {
                key: { color: "#f472b6", intensity: 1.1, position: [3, 6, 5] },
                fill: { color: "#8fb6ff", intensity: 0.45, position: [-6, 3, -6] },
                rim: { color: "#ffe4e6", intensity: 0.4, position: [0, 7, -4] },
            },
        },
        metrics: [
            { label: "Conversion", value: "68.4%", delta: "+1.8%", tone: "up" },
            { label: "Latency", value: "214 ms", delta: "-34 ms", tone: "up" },
            { label: "Refunds", value: "0.7%", delta: "stable", tone: "steady" },
        ],
        actions: [
            { label: "Promote offer", description: "Enable instant credit on eligible baskets.", tag: "promo", cta: "Publish" },
            { label: "Audit receipts", description: "Randomized receipt replay vs ledger for last 50 orders.", tag: "trust" },
            { label: "Tune taxes", description: "Apply WA and OR changes to digital goods.", tag: "compliance" },
        ],
        timeline: [
            { at: "14:16", title: "Edge deploy", detail: "Checkout surface shipped to coastal POPs.", tone: "positive" },
            { at: "13:58", title: "Basket anomaly", detail: "Gift-card double scan blocked at register 12.", tone: "warn" },
            { at: "13:25", title: "Store sync", detail: "7 stores received price book delta.", tone: "info" },
        ],
        streams: [
            { label: "Orders", status: "live", volume: "326/min", window: "now", accent: "#f472b6" },
            { label: "Retries", status: "low", volume: "0.8%", window: "past hr", accent: "#a855f7" },
            { label: "AOV", status: "steady", volume: "₭142", window: "today", accent: "#22d3ee" },
        ],
        work: [
            { title: "Roll out tap-to-pay", owner: "Amari", status: "in-progress", eta: "35m" },
            { title: "Enable receipt signing", owner: "Rio", status: "ready", eta: "now" },
            { title: "Backfill webhooks", owner: "Priya", status: "ready", eta: "40m" },
        ],
    },
    {
        id: "persona",
        name: "Persona",
        glyph: "👤",
        accent: "#a78bfa",
        summary: "Model compatibility, staffing personas, and approvals.",
        anchor: [-0.4, 1.15, 6.2],
        camera: { position: [-0.2, 3.4, 10], target: [-0.6, 1.7, 5.2] },
        environment: {
            background: "#0b0a14",
            fog: { color: "#0b0a14", near: 12, far: 36 },
            lights: {
                key: { color: "#a78bfa", intensity: 1.2, position: [0.5, 6.5, 7.5] },
                fill: { color: "#8fb6ff", intensity: 0.45, position: [-6, 3, -6] },
                rim: { color: "#c4b5fd", intensity: 0.4, position: [0, 8, -5] },
            },
        },
        metrics: [
            { label: "Profiles", value: "48 active", delta: "+4", tone: "up" },
            { label: "Compatibility", value: "92.4%", delta: "-0.2%", tone: "down" },
            { label: "Approvals", value: "6 pending", delta: "SLAs 29m", tone: "steady" },
        ],
        actions: [
            { label: "Approve bundle", description: "Validate agency persona kit for new assignments.", tag: "review", cta: "Approve" },
            { label: "Sync credits", description: "Share persona scoring back to staffing cockpit.", tag: "sync" },
            { label: "Tighten policy", description: "Require consent token for cross-agency sharing.", tag: "policy" },
        ],
        timeline: [
            { at: "14:14", title: "Persona minted", detail: "Fabricated avatar linked to agency pod.", tone: "positive" },
            { at: "13:46", title: "Similarity drift", detail: "Jaccard score dipped below threshold.", tone: "warn" },
            { at: "13:10", title: "Credit sync", detail: "Staffing cockpit pulled latest scores.", tone: "info" },
        ],
        streams: [
            { label: "Profiles", status: "steady", volume: "48", window: "live", accent: "#a78bfa" },
            { label: "Requests", status: "active", volume: "11 open", window: "today", accent: "#22d3ee" },
            { label: "Credits", status: "flowing", volume: "₭18k", window: "rolling", accent: "#6cf1d0" },
        ],
        work: [
            { title: "Ship privacy presets", owner: "Xun", status: "in-progress", eta: "50m" },
            { title: "Refresh embeddings", owner: "Lina", status: "ready", eta: "now" },
            { title: "Publish staffing brief", owner: "Zane", status: "ready", eta: "1h" },
        ],
    },
    {
        id: "laplace",
        name: "Laplace",
        glyph: "📈",
        accent: "#94c5ff",
        summary: "Surface controls, telemetry overlays, and graph routing.",
        anchor: [5.2, 1.2, 0.4],
        camera: { position: [9.2, 3.4, 2.8], target: [4.1, 1.6, 0.2] },
        environment: {
            background: "#0a0f16",
            fog: { color: "#0a0f16", near: 12, far: 36 },
            lights: {
                key: { color: "#94c5ff", intensity: 1.1, position: [6, 6, 2] },
                fill: { color: "#7fe4d0", intensity: 0.45, position: [-6, 3, -6] },
                rim: { color: "#c8d9ff", intensity: 0.35, position: [0, 8, -5] },
            },
        },
        metrics: [
            { label: "Signals", value: "128 feeds", delta: "+6", tone: "up" },
            { label: "Drift", value: "0.6%", delta: "flat", tone: "steady" },
            { label: "Alerts", value: "2 open", delta: "-1", tone: "up" },
        ],
        actions: [
            { label: "Rebuild graph", description: "Recompile routing graph with fresh weights.", tag: "controls", cta: "Rebuild" },
            { label: "Overlay telemetry", description: "Project freight + bank metrics into the HUD.", tag: "overlay" },
            { label: "Pin anomaly", description: "Escalate signal drift to personas + ops.", tag: "alert" },
        ],
        timeline: [
            { at: "14:08", title: "Graph refresh", detail: "Weighted spanning tree updated (42ms).", tone: "positive" },
            { at: "13:37", title: "Overlay published", detail: "Warehouse dock load overlay live.", tone: "info" },
            { at: "13:11", title: "Anomaly pinned", detail: "Drift flagged in persona approvals.", tone: "warn" },
        ],
        streams: [
            { label: "Signals", status: "live", volume: "128", window: "feeds", accent: "#94c5ff" },
            { label: "Overlays", status: "ready", volume: "9", window: "active", accent: "#7fe4d0" },
            { label: "Alerts", status: "cool", volume: "2", window: "open", accent: "#fbbf24" },
        ],
        work: [
            { title: "Compose atlas overlay", owner: "Rae", status: "in-progress", eta: "22m" },
            { title: "Tune signal decay", owner: "Iris", status: "ready", eta: "now" },
            { title: "Ship HUD tutorial", owner: "Lev", status: "ready", eta: "1h" },
        ],
    },
];
