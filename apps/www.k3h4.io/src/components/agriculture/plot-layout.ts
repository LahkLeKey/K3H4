import { normalizeHealth } from "./utils";
import type { PlotMesh } from "./plot-types";

export const cropColor = (crop: string) => {
  const normalized = crop.toLowerCase();
  if (normalized.includes("wheat")) return "#f59e0b";
  if (normalized.includes("corn")) return "#10b981";
  if (normalized.includes("soy")) return "#6366f1";
  if (normalized.includes("grass")) return "#22c55e";
  return "#0ea5e9";
};

export function stageVisual(stage: string) {
  const normalized = stage.toLowerCase();
  if (normalized.includes("ready")) return { yScale: 1.1, color: "#22c55e" };
  if (normalized.includes("grow")) return { yScale: 0.8, color: "#4ade80" };
  if (normalized.includes("plant")) return { yScale: 0.55, color: "#86efac" };
  return { yScale: 0.25, color: "#cbd5e1" };
}

export function generatePlotLayout(plots: PlotMesh[]) {
  const cols = 3;
  const spacing = 6;
  return plots.map((plot, index) => {
    const col = index % cols;
    const row = Math.floor(index / cols);
    const x = (col - (cols - 1) / 2) * spacing;
    const z = -row * spacing;
    const acres = Number(plot.acres) || 1;
    const base = Math.sqrt(Math.max(1, acres));
    const size: [number, number] = [Math.max(2, base * 0.9), Math.max(1.6, base * 0.7)];
    return {
      ...plot,
      position: [x, 0.01, z] as [number, number, number],
      size,
      healthTint: normalizeHealth(plot.health),
    };
  });
}
