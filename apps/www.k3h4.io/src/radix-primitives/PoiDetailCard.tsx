import type { PoiAnchor, PoiDetail } from "../react-hooks/usePoiDetailInteraction";

type Props = {
    detail: NonNullable<PoiDetail>;
    anchor: NonNullable<PoiAnchor>;
    onClose: () => void;
};

const formatAddress = (detail: NonNullable<PoiDetail>) => {
    const a = detail.address;
    if (!a) return null;
    if (a.label) return a.label;
    const line1 = [a.house_number, a.road].filter(Boolean).join(" ");
    const line2 = [a.city, a.postcode].filter(Boolean).join(" ");
    return [line1 || null, line2 || null, a.country ?? null].filter(Boolean).join(" · ");
};

export function PoiDetailCard({ detail, anchor, onClose }: Props) {
    const address = formatAddress(detail);
    const phone = detail.contact?.phone ?? null;
    const website = detail.contact?.website ?? null;
    const wheelchair = detail.accessibility?.wheelchair ?? null;
    const fuels = detail.fuelTypes?.length ? detail.fuelTypes.join(", ") : null;
    const desc = detail.description ?? null;
    const photo = detail.photos?.[0]?.url ?? null;
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
                {address ? <div className="text-amber-100/90">{address}</div> : null}
                {detail.openingHours ? <div>Hours: {detail.openingHours}</div> : null}
                {phone ? <div>Phone: {phone}</div> : null}
                {website ? (
                    <div>
                        <a href={website} target="_blank" rel="noreferrer" className="text-amber-200 underline">
                            Website
                        </a>
                    </div>
                ) : null}
                {fuels ? <div>Fuel: {fuels}</div> : null}
                {wheelchair ? <div>Wheelchair: {wheelchair}</div> : null}
                {detail.building?.type ? <div>Building: {detail.building.type}</div> : null}
                {detail.building?.subtype ? <div>Subtype: {detail.building.subtype}</div> : null}
                {detail.building?.levels ? <div>Levels: {detail.building.levels}</div> : null}
                <div>
                    Lat/Lng: {detail.lat.toFixed(5)}, {detail.lng.toFixed(5)}
                </div>
                {desc ? <div className="pt-1 text-slate-300">{desc.slice(0, 220)}{desc.length > 220 ? "…" : ""}</div> : null}
                {photo ? (
                    <div className="pt-2">
                        <img src={photo} alt={detail.name ?? "POI photo"} className="h-32 w-full rounded-md object-cover" />
                    </div>
                ) : null}
            </div>
        </div>
    );
}
