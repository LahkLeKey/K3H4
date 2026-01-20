import type { PoiAnchor, PoiDetail } from "../react-hooks/usePoiDetailInteraction";

type Props = {
    detail: NonNullable<PoiDetail>;
    anchor: NonNullable<PoiAnchor>;
    onClose: () => void;
};

const formatAddress = (detail: NonNullable<PoiDetail>) => {
    const b = detail.building;
    if (!b) return null;
    const parts = [b.addressHouseNumber, b.addressStreet].filter(Boolean).join(" ");
    const cityLine = [b.addressCity, b.addressState, b.addressPostcode].filter(Boolean).join(" ");
    const country = b.addressCountry ?? null;
    const lines = [parts || null, cityLine || null, country].filter(Boolean) as string[];
    return lines.length ? lines.join(" · ") : null;
};

export function PoiDetailCard({ detail, anchor, onClose }: Props) {
    const address = formatAddress(detail);
    const top = Math.max(12, anchor.y - 12);
    const left = anchor.x + 16;

    return (
        <div
            className="pointer-events-auto absolute z-50 w-80 max-w-[90vw] rounded-xl border border-slate-800/80 bg-slate-950 p-4 shadow-[0_20px_40px_rgba(0,0,0,0.55)]"
            style={{ top, left }}
        >
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
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
            <div className="space-y-1 text-xs text-slate-200">
                <div>
                    Lat/Lng: {detail.lat.toFixed(5)}, {detail.lng.toFixed(5)}
                </div>
                {address ? <div className="text-amber-100/90">{address}</div> : null}
                {detail.building?.osmId ? <div>OSM: {detail.building.osmId}</div> : null}
                {detail.building?.type ? <div>Type: {detail.building.type}</div> : null}
            </div>
        </div>
    );
}
