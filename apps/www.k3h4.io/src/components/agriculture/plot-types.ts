import type { ToolId } from "../../stores/agriculture-dashboard-store";

export type PlotMesh = {
  id: string;
  name: string;
  crop: string;
  stage: string;
  acres: string;
  health: string;
  latestCondition: { recordedAt: string } | null;
  position: [number, number, number];
  size: [number, number];
  healthTint: number;
};

export type LandmarkId = "bank" | "market" | "barn" | "silo" | "hut";

export type Landmark = {
  id: LandmarkId;
  label: string;
  subtitle?: string;
  color: string;
  position: [number, number, number];
  onClick?: () => void;
};

export type PlotVitals = {
  water?: number;
  nutrients?: number;
  pests?: number;
  quality?: number;
  assignedWorker?: string;
  task?: string;
  etaMinutes?: number;
};

export type LogisticsPlan = {
  destination?: string;
  distanceKm?: number;
  etaMinutes?: number;
  cost?: number;
  slaDay?: number;
  source?: "osrm" | "fallback";
};

export type ToolConfig = {
  id: ToolId;
  label: string;
  hotkey?: string;
  disabledReason?: string;
};

export type WorkerKpi = {
  busyPercent?: number;
  workersTotal?: number;
};

export type InventorySummary = {
  seeds?: number;
  fertilizer?: number;
  feed?: number;
  harvest?: number;
};

export type FinancialKpis = {
  dailyPnL?: number | string | null;
  burnRate?: number | string | null;
  receivables?: number | string | null;
  slaRisk?: string;
  osrmStatus?: "osrm" | "fallback" | "error";
  usdaStatus?: "live" | "cache" | "offline";
};
