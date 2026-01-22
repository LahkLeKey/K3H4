import type { PoiAnchor, PoiDetail } from "../../react-hooks/usePoiDetailInteraction";

type Props = {
    detail: NonNullable<PoiDetail>;
    anchor: NonNullable<PoiAnchor>;
    onClose: () => void;
};

const formatAddress = (detail: NonNullable<PoiDetail>) => {
    const a = detail.address;
    if (!a) return null;
    if (a.label) return a.label;
    const parts = [a.house_number, a.road, a.city, a.postcode, a.country].filter(Boolean) as string[];
    return parts.length ? parts.join(", ") : null;
};

const formatDistance = (meters?: number | null) => {
    if (!meters || !Number.isFinite(meters)) return null;
    if (meters >= 1000) return `${(meters / 1000).toFixed(1)} km`;
    return `${Math.round(meters)} m`;
};

const formatDuration = (seconds?: number | null) => {
    if (!seconds || !Number.isFinite(seconds)) return null;
    const minutes = Math.round(seconds / 60);
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem ? `${hours} h ${rem} min` : `${hours} h`;
};

const clampText = (text: string, max = 260) => (text.length > max ? `${text.slice(0, max).trimEnd()}...` : text);

export function PoiDetailCard({ detail, anchor, onClose }: Props) {
    const address = formatAddress(detail);
    const phone = detail.contact?.phone ?? null;
    const website = detail.contact?.website ?? null;
    const wheelchair = detail.accessibility?.wheelchair ?? null;
    const fuels = detail.fuelTypes ?? [];
    const desc = detail.description ?? null;
    const photo = detail.photos?.[0]?.url ?? null;
    const route = detail.route ?? null;
    const building = detail.building ?? null;
    const buildingBits = [building?.type, building?.subtype, building?.levels ? `Levels ${building.levels}` : null]
        .filter(Boolean)
        .join(" / ");

    const routeDistance = formatDistance(route?.distance);
    const routeDuration = formatDuration(route?.duration);

    const top = Math.max(12, anchor.y - 12);
    const viewportWidth = typeof window !== "undefined" ? window.innerWidth : null;
    const baseLeft = anchor.x + 16;
    const left = viewportWidth ? Math.min(Math.max(8, baseLeft), viewportWidth - 380) : baseLeft;

    const chips: string[] = [];
    fuels.forEach((f) => chips.push(`Fuel ${f}`));
    if (wheelchair) chips.push(`Wheelchair ${wheelchair}`);
    if (building?.type) chips.push(`Building ${building.type}`);
    if (building?.levels) chips.push(`Levels ${building.levels}`);

    return (
        <div
            className="pointer-events-auto absolute z-50 w-96 max-w-[90vw] rounded-xl border border-slate-800/80 bg-slate-950/95 p-4 shadow-[0_20px_48px_rgba(0,0,0,0.55)]"
            style={{ top, left }}
        >
            {photo ? (
                <div className="mb-3 overflow-hidden rounded-lg border border-white/5">
                    <img src={photo} alt={detail.name ?? "POI photo"} className="h-40 w-full object-cover" />
                </div>
            ) : null}

            <div className="mb-3 flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                    <div className="text-sm font-semibold text-amber-100">{detail.name ?? "Unnamed place"}</div>
                    {detail.category ? <div className="text-xs uppercase tracking-wide text-slate-300">{detail.category}</div> : null}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-slate-700 px-2 py-1 text-xs font-semibold text-slate-100 hover:bg-slate-800"
                >
                    Close
                </button>
            </div>

            {routeDistance || routeDuration ? (
                <div className="mb-3 flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-100">
                    <span className="rounded-sm bg-emerald-600/70 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-50">Route</span>
                    <span>{[routeDistance, routeDuration].filter(Boolean).join(" | ") || "From your location"}</span>
                    {route?.mode ? <span className="text-slate-400">({route.mode})</span> : null}
                </div>
            ) : null}

            <div className="space-y-2 text-xs text-slate-200">
                {address ? <div className="text-amber-100/90">Address: {address}</div> : null}
                {detail.openingHours ? <div>Hours: {detail.openingHours}</div> : null}
                {buildingBits ? <div className="text-slate-100">Building: {buildingBits}</div> : null}
                {phone || website ? (
                    <div className="flex flex-wrap gap-2">
                        {phone ? (
                            <a
                                href={`tel:${phone}`}
                                className="rounded-md border border-slate-700 px-2 py-1 text-[11px] font-semibold text-slate-100 hover:bg-slate-800"
                            >
                                Call {phone}
                            </a>
                        ) : null}
                        {website ? (
                            <a
                                href={website}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-md border border-amber-300/60 px-2 py-1 text-[11px] font-semibold text-amber-100 hover:bg-amber-900/40"
                            >
                                Website
                            </a>
                        ) : null}
                    </div>
                ) : null}

                {chips.length ? (
                    <div className="flex flex-wrap gap-2">
                        {chips.map((chip) => (
                            <span
                                key={chip}
                                className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] font-medium text-slate-100"
                            >
                                {chip}
                            </span>
                        ))}
                    </div>
                ) : null}

                <div className="text-[11px] text-slate-400">Lat/Lng: {detail.lat.toFixed(5)}, {detail.lng.toFixed(5)}</div>
                {detail.source?.wikidataId ? (
                    <div className="text-[11px] text-slate-400">Wikidata: {detail.source.wikidataId}</div>
                ) : null}
            </div>

            {desc ? (
                <div className="mt-3 rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-[13px] leading-relaxed text-slate-200">
                    {clampText(desc, 320)}
                </div>
            ) : null}
        </div>
    );
}
