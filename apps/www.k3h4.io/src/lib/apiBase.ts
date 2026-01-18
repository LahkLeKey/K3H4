const API_BASE = (() => {
    const env = (import.meta as any)?.env || {};
    const val = env.VITE_API_URL || env.API_URL || (typeof window !== "undefined" ? (window as any).__API_URL__ : "");
    return val ? String(val).replace(/\/$/, "") : "";
})();

export const apiUrl = (path: string) => `${API_BASE}${path}`;
