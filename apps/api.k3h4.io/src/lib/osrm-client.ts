const OSRM_BASE = process.env.OSRM_URL || "https://router.project-osrm.org";

export type OsrmService = "route" | "nearest" | "table" | "match" | "trip" | "tile";
export type OsrmProfile = "driving" | "car" | "bike" | "bicycle" | "foot" | "walking" | string;

type Params = Record<string, string | number | boolean | null | undefined>;

const buildQuery = (params?: Params) => {
  if (!params) return "";
  const search = new URLSearchParams();
  Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .forEach(([key, value]) => {
      search.set(key, String(value));
    });
  const qs = search.toString();
  return qs.length > 0 ? `?${qs}` : "";
};

export type OsrmRequest = {
  service: OsrmService;
  profile: OsrmProfile;
  coordinates: string;
  format?: "json" | "flatbuffers";
  params?: Params;
};

export type OsrmResponse = {
  status: number;
  ok: boolean;
  body: any;
  url: string;
};

export const buildOsrmUrl = (req: OsrmRequest) => {
  const { service, profile, coordinates, format, params } = req;
  const suffix = format ? `.${format}` : "";
  const query = buildQuery(params);
  const path = `/${service}/v1/${profile}/${coordinates}${suffix}${query}`;
  return `${OSRM_BASE}${path}`;
};

export async function fetchOsrm(req: OsrmRequest): Promise<OsrmResponse> {
  const url = buildOsrmUrl(req);
  const res = await fetch(url);
  const body = await res.json().catch(async () => {
    const text = await res.text().catch(() => "<unreadable>");
    return { message: text };
  });
  return { status: res.status, ok: res.ok, body, url };
}