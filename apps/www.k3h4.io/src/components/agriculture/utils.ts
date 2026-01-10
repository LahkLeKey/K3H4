export const formatCommodityLabel = (item: any) =>
    item?.commodityName || item?.CommodityName || item?.name || item?.Commodity || item?.commodity || item?.description || item?.code || "Unknown";

export const formatReleaseLabel = (item: any) =>
    item?.releasedOn || item?.ReleaseDate || item?.releaseDate || item?.date || item?.DataReleaseDate || item?.dataReleaseDate || null;

export const formatRaw = (item: any, max = 80) => {
    const raw = JSON.stringify(item) ?? "";
    if (!raw) return "—";
    return raw.length > max ? `${raw.slice(0, max)}…` : raw;
};

export const normalizeHealth = (health: string | number | undefined | null) => {
    if (typeof health === "number" && Number.isFinite(health)) return Math.max(0.2, Math.min(1, health));
    if (typeof health === "string") {
        const numeric = Number(health);
        if (Number.isFinite(numeric)) return Math.max(0.2, Math.min(1, numeric / 100));
        const lowered = health.toLowerCase();
        if (lowered.includes("good") || lowered.includes("healthy")) return 0.82;
        if (lowered.includes("ok")) return 0.65;
        if (lowered.includes("low") || lowered.includes("watch")) return 0.45;
        if (lowered.includes("crit")) return 0.3;
    }
    return 0.6;
};
