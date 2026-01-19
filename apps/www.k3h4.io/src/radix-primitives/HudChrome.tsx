import { useMemo } from "react";

import { useAtlasState } from "../react-hooks/atlas";
import { useGeoRoute } from "../react-hooks/useGeoRoute";
import { useMapView } from "../react-hooks/useMapView";

export function HudChrome() {
    const { view, flyTo } = useMapView();
    const { origin, refresh } = useGeoRoute();
    const { activeContext, autopilot, setAutopilot, workspaceOpen, setWorkspaceOpen } = useAtlasState();

    const mapStats = useMemo(
        () => ({
            lat: view.center.lat.toFixed(4),
            lng: view.center.lng.toFixed(4),
            zoom: view.zoom.toFixed(1),
        }),
        [view.center.lat, view.center.lng, view.zoom]
    );

    const handleLocate = () => {
        const pitch = Math.max(62, view.pitch);
        const centerFromOrigin = () => {
            flyTo({ center: origin, zoom: 16.2, bearing: view.bearing, pitch });
            refresh();
        };

        if (typeof navigator === "undefined" || !navigator.geolocation) {
            centerFromOrigin();
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const center = { lat: pos.coords.latitude, lng: pos.coords.longitude };
                flyTo({ center, zoom: 16.2, bearing: view.bearing, pitch });
                refresh();
            },
            () => centerFromOrigin(),
            { enableHighAccuracy: true, timeout: 3500 }
        );
    };

    return (
        <div className="pointer-events-none absolute inset-0 z-30 flex flex-col">
            <TopBar
                contextName={activeContext.name}
                contextSummary={activeContext.summary}
                lat={mapStats.lat}
                lng={mapStats.lng}
                zoom={mapStats.zoom}
                autopilot={autopilot}
                onToggleAutopilot={() => setAutopilot(!autopilot)}
                onLocate={handleLocate}
                workspaceOpen={workspaceOpen}
                onToggleWorkspace={() => setWorkspaceOpen(!workspaceOpen)}
            />
            <div className="relative flex flex-1">
                <SidePanel
                    align="left"
                    title="Navigation"
                    rows={[
                        { label: "Nearest Bank", value: "Tap to fly", accent: "#6cf1d0" },
                        { label: "Waypoint", value: activeContext.name, accent: activeContext.accent },
                        { label: "OSRM Route", value: "Follow path", accent: "#22d3ee" },
                    ]}
                />
                <div className="flex-1" />
                <SidePanel
                    align="right"
                    title="Status"
                    rows={[
                        { label: "Context", value: activeContext.name, accent: activeContext.accent },
                        { label: "Mode", value: autopilot ? "Autopilot" : "Manual", accent: autopilot ? "#22c55e" : "#fbbf24" },
                        { label: "Workspace", value: workspaceOpen ? "Visible" : "Hidden", accent: workspaceOpen ? "#38bdf8" : "#94a3b8" },
                    ]}
                />
            </div>
            <BottomStrip />
        </div>
    );
}

function TopBar(props: {
    contextName: string;
    contextSummary: string;
    lat: string;
    lng: string;
    zoom: string;
    autopilot: boolean;
    onToggleAutopilot: () => void;
    onLocate: () => void;
    workspaceOpen: boolean;
    onToggleWorkspace: () => void;
}) {
    return (
        <div className="pointer-events-auto flex items-center justify-between gap-4 bg-gradient-to-r from-slate-950/90 via-slate-900/70 to-slate-950/90 px-4 py-3 shadow-2xl ring-1 ring-white/5">
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-100">
                <span className="rounded-md bg-white/5 px-2 py-1 text-xs uppercase tracking-[0.16em] text-emerald-200">Atlas</span>
                <span className="text-slate-300">{props.contextName}</span>
                <span className="text-xs text-slate-500">{props.contextSummary}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
                <StatChip label="Lat" value={props.lat} colorClass="text-sky-200" />
                <StatChip label="Lng" value={props.lng} colorClass="text-sky-200" />
                <StatChip label="Zoom" value={props.zoom} colorClass="text-amber-200" />
                <button
                    className="rounded-full bg-sky-500/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-sky-100 ring-1 ring-sky-400/40 transition hover:bg-sky-400/30"
                    onClick={props.onLocate}
                >
                    Locate Me
                </button>
                <ToggleChip
                    label="Autopilot"
                    active={props.autopilot}
                    onClick={props.onToggleAutopilot}
                    activeClasses="bg-emerald-500/20 text-emerald-200 ring-emerald-400/40"
                />
                <ToggleChip
                    label="Workspace"
                    active={props.workspaceOpen}
                    onClick={props.onToggleWorkspace}
                    activeLabel="Shown"
                    inactiveLabel="Hidden"
                    activeClasses="bg-cyan-500/20 text-cyan-200 ring-cyan-400/40"
                />
            </div>
        </div>
    );
}

function SidePanel({
    align,
    title,
    rows,
}: {
    align: "left" | "right";
    title: string;
    rows: Array<{ label: string; value: string; accent: string }>;
}) {
    const sideClass = align === "left" ? "left-4 items-start" : "right-4 items-end";
    return (
        <div className={`pointer-events-none absolute top-20 flex ${sideClass}`}>
            <div className="pointer-events-auto space-y-2 rounded-2xl bg-slate-900/80 p-3 shadow-xl ring-1 ring-white/10 w-64">
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">{title}</div>
                <div className="space-y-1 text-sm text-slate-200">
                    {rows.map((row) => (
                        <StaticRow key={`${row.label}-${row.value}`} title={row.label} detail={row.value} accent={row.accent} />
                    ))}
                </div>
            </div>
        </div>
    );
}

function BottomStrip() {
    return (
        <div className="pointer-events-none relative mb-4 flex justify-center">
            <div className="pointer-events-auto flex items-center gap-4 rounded-2xl bg-slate-900/80 px-4 py-3 shadow-2xl ring-1 ring-white/10">
                <SectionPill label="Map" detail="Pan • Tilt • Zoom" />
                <SectionPill label="POI" detail="Nearest banks / hubs" />
                <SectionPill label="Quests" detail="Context actions" />
                <SectionPill label="Inventory" detail="Workspace dock" />
            </div>
        </div>
    );
}

function StatChip({ label, value, colorClass }: { label: string; value: string; colorClass: string }) {
    return (
        <span className={`rounded-lg bg-white/5 px-2 py-1 font-medium ${colorClass}`}>{label} {value}</span>
    );
}

function ToggleChip({
    label,
    active,
    onClick,
    activeClasses,
    activeLabel,
    inactiveLabel,
}: {
    label: string;
    active: boolean;
    onClick: () => void;
    activeClasses?: string;
    activeLabel?: string;
    inactiveLabel?: string;
}) {
    const activeText = activeLabel ?? "On";
    const inactiveText = inactiveLabel ?? "Off";
    const base = "rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-wide transition ring-1";
    const on = activeClasses ?? "bg-emerald-500/20 text-emerald-200 ring-emerald-400/40";
    const off = "bg-white/5 text-slate-200 ring-white/10";
    return (
        <button className={`${base} ${active ? on : off}`} onClick={onClick}>
            {label} {active ? activeText : inactiveText}
        </button>
    );
}

function SectionPill({ label, detail }: { label: string; detail: string }) {
    return (
        <div className="rounded-full bg-white/5 px-3 py-2 text-left text-xs text-slate-200 ring-1 ring-white/10">
            <div className="font-semibold text-slate-100">{label}</div>
            <div className="text-[11px] text-slate-400">{detail}</div>
        </div>
    );
}

function StaticRow({ title, detail, accent }: { title: string; detail: string; accent: string }) {
    return (
        <div className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-[13px]">
            <span className="text-slate-200">{title}</span>
            <span className="font-semibold" style={{ color: accent }}>
                {detail}
            </span>
        </div>
    );
}
