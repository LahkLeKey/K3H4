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
            className="pointer-events-auto absolute z-50 w-80 max-w-[90vw] rounded-xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-slate-900/20 backdrop-blur"
            style={{ top, left }}
        >
            <div className="mb-2 flex items-start justify-between gap-2">
                <div>
                    <div className="text-sm font-semibold text-slate-900">{detail.name ?? "Unnamed place"}</div>
                    {detail.category ? <div className="text-xs uppercase tracking-wide text-slate-400">{detail.category}</div> : null}
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                >
                    Close
                </button>
            </div>
            <div className="space-y-1 text-xs text-slate-600">
                <div>
                    Lat/Lng: {detail.lat.toFixed(5)}, {detail.lng.toFixed(5)}
                </div>
                {address ? <div>{address}</div> : null}
                {detail.building?.osmId ? <div>OSM: {detail.building.osmId}</div> : null}
                {detail.building?.type ? <div>Type: {detail.building.type}</div> : null}
            </div>
        </div>
    );
}
