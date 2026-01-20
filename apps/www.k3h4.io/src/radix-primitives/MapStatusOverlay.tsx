type Props = {
    state: "blocked" | "requesting";
};

export function MapStatusOverlay({ state }: Props) {
    const text = state === "blocked" ? "enable-geo-location-to-see-map" : "requesting-location...";
    return (
        <div className="absolute inset-0 z-0 flex items-center justify-center bg-slate-900 text-sm font-semibold text-white/90">
            {text}
        </div>
    );
}