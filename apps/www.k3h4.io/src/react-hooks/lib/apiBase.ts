const API_BASE = (() => {
  const env = (import.meta as any)?.env || {};
  const val = env.VITE_API_URL || env.API_URL ||
      (typeof window !== 'undefined' ? (window as any).__API_URL__ : '');
  return val ? String(val).replace(/\/$/, '') : '';
})();

const normalizePath = (path: string) =>
    (path.startsWith('/') ? path : `/${path}`);

export const resolveApiPath = (path: string) => {
  const normalized = normalizePath(path);
  if (normalized.startsWith('/user/') || normalized.startsWith('/actor/') ||
      normalized.startsWith('/entity/')) {
    return normalized;
  }
  if (normalized.startsWith('/docs') || normalized.startsWith('/static')) {
    return normalized;
  }
  if (normalized.startsWith('/auth') || normalized.startsWith('/profile')) {
    return `/user${normalized}`;
  }
  if (normalized.startsWith('/actors')) {
    return `/actor${normalized}`;
  }
  if (normalized.startsWith('/entities')) {
    return `/entity${normalized}`;
  }
  if (normalized.startsWith('/geo') || normalized.startsWith('/frontend') ||
      normalized.startsWith('/maptiler') || normalized.startsWith('/pois') ||
      normalized.startsWith('/api/pois')) {
    return normalized;
  }
  return `/entity${normalized}`;
};

export const buildApiUrl = (baseUrl: string, path: string) =>
    `${baseUrl}${resolveApiPath(path)}`;

export const apiUrl = (path: string) => `${API_BASE}${resolveApiPath(path)}`;
