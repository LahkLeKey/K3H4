export const formatNumber = (value: number | string | null | undefined) => {
    if (value === null || value === undefined) return "--";
    const num = typeof value === "string" ? Number(value) : value;
    if (!Number.isFinite(num)) return String(value);
    return num.toLocaleString();
};
