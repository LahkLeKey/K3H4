import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Grid, Html, Line, OrbitControls } from "@react-three/drei";

import { Section } from "../section";
import { SectionCard } from "../shell/section-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useLocalStore } from "../../lib/store";

const cropPalette: Record<string, string> = {
    Corn: "#10b981",
    Wheat: "#f59e0b",
    Soy: "#6366f1",
    Cover: "#7c3aed",
};

const experiencePalette = ["#0ea5e9", "#22c55e", "#a855f7", "#f97316"];

type ModuleKey = "bank" | "persona" | "agency" | "freight" | "warehouse" | "pos" | "agriculture" | "culinary" | "graphics";

type SceneKey = "farm" | "freight" | "experience";

type FarmPlot = {
    id: string;
    name: string;
    crop: string;
    acres: number;
    health: number;
    position: [number, number, number];
    size: [number, number];
};

type FreightLane = {
    id: string;
    label: string;
    color: string;
    points: [number, number, number][];
    distance: number;
    etaMinutes: number;
};

type ExperienceNode = {
    id: string;
    label: string;
    position: [number, number, number];
};

export type GraphicsEngineModuleProps = {
    userEmail: string | null;
    onNavigate?: (key: ModuleKey) => void;
};

type GraphicsUiState = {
    activeScene: SceneKey;
    highlightedPlot: string | null;
};

function FarmPlotTile({ plot, highlighted, onHighlight }: { plot: FarmPlot; highlighted: boolean; onHighlight: (id: string | null) => void; }) {
    const cropColor = cropPalette[plot.crop] ?? "#22c55e";
    const healthTint = Math.max(0.35, Math.min(1, plot.health));
    return (
        <group position={plot.position}>
            <mesh
                rotation={[-Math.PI / 2, 0, 0]}
                onPointerOver={() => onHighlight(plot.id)}
                onPointerOut={() => onHighlight(null)}
                onClick={() => onHighlight(plot.id)}
            >
                <planeGeometry args={plot.size} />
                <meshStandardMaterial color={cropColor} transparent opacity={highlighted ? 0.95 : healthTint * 0.8} />
            </mesh>
            <Html position={[0, 0.06, 0]} center className="pointer-events-none select-none">
                <div className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold shadow">
                    {plot.name} · {plot.crop}
                </div>
            </Html>
        </group>
    );
}

function FreightLanePath({ lane }: { lane: FreightLane }) {
    return (
        <group>
            <Line
                points={lane.points}
                color={lane.color}
                lineWidth={2}
                dashed
                dashSize={0.4}
                gapSize={0.2}
            />
            {lane.points.map((point, idx) => (
                <mesh key={`${lane.id}-${idx}`} position={point}>
                    <sphereGeometry args={[0.16, 16, 16]} />
                    <meshStandardMaterial color={lane.color} emissive={lane.color} emissiveIntensity={0.6} />
                </mesh>
            ))}
        </group>
    );
}

function ExperienceNodeCloud({ nodes }: { nodes: ExperienceNode[] }) {
    return (
        <group>
            {nodes.map((node, index) => (
                <Float key={node.id} speed={2} rotationIntensity={0.5} floatIntensity={1.2} position={node.position}>
                    <mesh>
                        <icosahedronGeometry args={[0.6, 0]} />
                        <meshStandardMaterial color={experiencePalette[index % experiencePalette.length]} metalness={0.2} roughness={0.1} />
                    </mesh>
                    <Html position={[0, 0.9, 0]} center className="pointer-events-none select-none">
                        <div className="rounded-md bg-background/80 px-2 py-1 text-xs font-semibold shadow">
                            {node.label}
                        </div>
                    </Html>
                </Float>
            ))}
        </group>
    );
}

function GraphicsCanvas({
    scene,
    plots,
    freightLanes,
    experienceNodes,
    highlightedPlot,
    setHighlightedPlot,
}: {
    scene: SceneKey;
    plots: FarmPlot[];
    freightLanes: FreightLane[];
    experienceNodes: ExperienceNode[];
    highlightedPlot: string | null;
    setHighlightedPlot: (id: string | null) => void;
}) {
    return (
        <Canvas shadows camera={{ position: [10, 9, 10], fov: 46 }}>
            <color attach="background" args={["#05060a"]} />
            <hemisphereLight intensity={0.55} color="#dbeafe" groundColor="#0b1224" />
            <directionalLight position={[6, 10, 6]} intensity={1.1} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <Suspense fallback={<Html center className="text-sm text-muted-foreground">Preparing scene…</Html>}>
                <Grid args={[30, 30]} sectionSize={1} infiniteFade cellColor="#0b1224" sectionColor="#111827" position={[0, 0, 0]} />
                {scene === "farm" ? plots.map((plot) => (
                    <FarmPlotTile
                        key={plot.id}
                        plot={plot}
                        highlighted={highlightedPlot === plot.id}
                        onHighlight={setHighlightedPlot}
                    />
                )) : null}
                {scene === "freight" ? freightLanes.map((lane) => (
                    <FreightLanePath key={lane.id} lane={lane} />
                )) : null}
                {scene === "experience" ? <ExperienceNodeCloud nodes={experienceNodes} /> : null}
                <OrbitControls enablePan minDistance={5} maxDistance={32} target={[0, 0, 0]} />
            </Suspense>
        </Canvas>
    );
}

export function GraphicsEngineModule({ userEmail, onNavigate }: GraphicsEngineModuleProps) {
    const uiStore = useLocalStore<GraphicsUiState>(() => ({
        activeScene: "farm",
        highlightedPlot: null,
    }));

    const { activeScene, highlightedPlot } = uiStore.useShallow((state: GraphicsUiState) => state);
    const setActiveScene = (scene: SceneKey) => uiStore.setState({ activeScene: scene });
    const setHighlightedPlot = (plotId: string | null) => uiStore.setState({ highlightedPlot: plotId });

    const farmPlots = useMemo<FarmPlot[]>(() => ([
        { id: "N-40", name: "North 40", crop: "Corn", acres: 40, health: 0.9, position: [-6, 0.02, 5], size: [5, 4] },
        { id: "Gate", name: "Gate lot", crop: "Wheat", acres: 18, health: 0.78, position: [0, 0.02, 3], size: [5.5, 3.5] },
        { id: "Creek", name: "Creek edge", crop: "Soy", acres: 22, health: 0.72, position: [6, 0.02, 4.5], size: [4.5, 3] },
        { id: "Pilot", name: "Pilot plot", crop: "Cover", acres: 6, health: 0.86, position: [-3, 0.02, -1], size: [3.5, 2] },
        { id: "South", name: "South grain", crop: "Corn", acres: 26, health: 0.81, position: [3, 0.02, -3.5], size: [5, 2.5] },
        { id: "Research", name: "Research strip", crop: "Wheat", acres: 8, health: 0.76, position: [-6, 0.02, -4], size: [4, 1.8] },
    ]), []);

    const freightLanes = useMemo<FreightLane[]>(() => ([
        {
            id: "farm-to-bakery",
            label: "Farm to bakery",
            color: "#0ea5e9",
            points: [
                [-7, 0.02, 5],
                [-3, 0.02, 1],
                [2, 0.02, -2.5],
                [7, 0.02, -5],
            ],
            distance: 820,
            etaMinutes: 68,
        },
        {
            id: "waste-return",
            label: "Bakery waste return",
            color: "#22c55e",
            points: [
                [6.5, 0.02, -5],
                [1, 0.02, -3],
                [-4, 0.02, 0],
                [-7.5, 0.02, 3],
            ],
            distance: 640,
            etaMinutes: 54,
        },
    ]), []);

    const experienceNodes = useMemo<ExperienceNode[]>(() => ([
        { id: "spatial-pos", label: "Spatial POS", position: [-4.5, 2.4, 2.5] },
        { id: "crew-sim", label: "Crew sim", position: [2, 2.8, -1.5] },
        { id: "flow-lab", label: "Flow lab", position: [0, 1.6, 5] },
        { id: "telemetry", label: "Telemetry", position: [4.5, 2.2, 3] },
    ]), []);

    const sceneMeta: Record<SceneKey, { title: string; description: string; cta?: { label: string; module: ModuleKey }; stats: { label: string; value: string; tone?: "default" | "secondary" | "outline" }[] }> = useMemo(() => ({
        farm: {
            title: "Field planner",
            description: "Sketch plots, overlay health, and hand off to Agriculture for record-backed edits.",
            cta: { label: "Open Agriculture", module: "agriculture" },
            stats: [
                { label: "Plots visualized", value: `${farmPlots.length} live` },
                { label: "Health map", value: "NDVI overlay ready", tone: "secondary" },
                { label: "Export", value: "GeoJSON + canvas" },
            ],
        },
        freight: {
            title: "Freight lanes",
            description: "Share planned geometry with Freight/OSRM, so loads snap to custom rails.",
            cta: { label: "Open Freight", module: "freight" },
            stats: [
                { label: "Lanes", value: `${freightLanes.length} staged` },
                { label: "ETA sync", value: "Live to Warehouse", tone: "secondary" },
                { label: "Handoffs", value: "GeoJSON + K3H4 coin" },
            ],
        },
        experience: {
            title: "Experiential flows",
            description: "Prototype immersive business flows—POS lanes, staffing games, or training scenes.",
            cta: { label: "Open Point of Sale", module: "pos" },
            stats: [
                { label: "Nodes", value: `${experienceNodes.length} anchors` },
                { label: "Latency", value: "<10ms scene swap", tone: "secondary" },
                { label: "Reuse", value: "Embed in any module" },
            ],
        },
    }), [experienceNodes.length, farmPlots.length, freightLanes.length]);

    const activeSceneMeta = sceneMeta[activeScene];

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Graphics engine"
                title="R3F-powered spatial canvas"
                description="Author reusable Three.js scenes that other industries can drop in for planning, simulation, or storytelling."
                actions={<Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>}
            >
                <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
                    <div className="space-y-3">
                        <div className="relative h-[480px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                            <GraphicsCanvas
                                scene={activeScene}
                                plots={farmPlots}
                                freightLanes={freightLanes}
                                experienceNodes={experienceNodes}
                                highlightedPlot={highlightedPlot}
                                setHighlightedPlot={setHighlightedPlot}
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                        </div>
                        <div className="grid gap-3 sm:grid-cols-3">
                            {activeSceneMeta.stats.map((stat) => (
                                <SectionCard key={stat.label} tone="muted" className="space-y-1 p-4">
                                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{stat.label}</div>
                                    <div className="text-base font-semibold">{stat.value}</div>
                                    {stat.tone ? <Badge variant={stat.tone}>Synced</Badge> : null}
                                </SectionCard>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <SectionCard className="space-y-4">
                            <div className="space-y-1">
                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Scene preset</p>
                                <div className="text-lg font-semibold">{activeSceneMeta.title}</div>
                                <p className="text-sm text-muted-foreground">{activeSceneMeta.description}</p>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {([
                                    { key: "farm", label: "Plots" },
                                    { key: "freight", label: "Lanes" },
                                    { key: "experience", label: "Experiences" },
                                ] as { key: SceneKey; label: string }[]).map((option) => (
                                    <Button
                                        key={option.key}
                                        variant={activeScene === option.key ? "default" : "outline"}
                                        className="w-full"
                                        onClick={() => setActiveScene(option.key)}
                                    >
                                        {option.label}
                                    </Button>
                                ))}
                            </div>
                            {activeSceneMeta.cta ? (
                                <Button
                                    className="w-full"
                                    onClick={() => {
                                        const target = activeSceneMeta.cta?.module;
                                        if (target) onNavigate?.(target);
                                    }}
                                >
                                    {activeSceneMeta.cta.label}
                                </Button>
                            ) : null}
                        </SectionCard>

                        <SectionCard className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-sm font-semibold">Reusable outputs</div>
                                    <p className="text-xs text-muted-foreground">Export geometry to feed other industries.</p>
                                </div>
                                <Badge variant="outline">In-beta</Badge>
                            </div>
                            <div className="space-y-2 text-sm">
                                <div className="rounded-lg border bg-muted/40 px-3 py-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Farm plots → Agriculture</span>
                                        <Button size="sm" variant="secondary" onClick={() => onNavigate?.("agriculture")}>Open</Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Send draw commands + acres to the agriculture dashboard for persistence.</p>
                                </div>
                                <div className="rounded-lg border bg-muted/40 px-3 py-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Lanes → Freight</span>
                                        <Button size="sm" variant="secondary" onClick={() => onNavigate?.("freight")}>Open</Button>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Push geometry to freight routes so loads snap to custom rails.</p>
                                </div>
                                <div className="rounded-lg border bg-muted/40 px-3 py-2">
                                    <div className="flex items-center justify-between">
                                        <span className="font-semibold">Scenes → POS / Warehouse</span>
                                        <div className="flex gap-2">
                                            <Button size="sm" variant="outline" onClick={() => onNavigate?.("pos")}>POS</Button>
                                            <Button size="sm" variant="outline" onClick={() => onNavigate?.("warehouse")}>Warehouse</Button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-muted-foreground">Reuse the same R3F canvas for checkout flow visualizations or floor overlays.</p>
                                </div>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </Section>
        </div>
    );
}
