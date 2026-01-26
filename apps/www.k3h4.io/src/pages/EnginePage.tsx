import { useMemo, type ReactNode } from "react";
import { Canvas, type CanvasProps } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import { Tabs } from "../components/radix-primitives";
import { Badge, Card, SectionHeader } from "../components/ui";
import { StarfieldLayout } from "../components/radix-components/StarfieldLayout";
import { R3FErrorBoundary } from "../components/r3f-components/R3FErrorBoundary";
import { CampfireFlame } from "../components/r3f-components/CampfireFlame";
import { FireExplosion } from "../components/r3f-components/FireExplosion";
import { Html as R3FHtml, NodeLinkGraph } from "../components/r3f-primitives";

const NODE_LINK_NODES = [
    { id: "gateway", label: "Gateway", weight: 1.1 },
    { id: "stream", label: "Stream", weight: 0.72 },
    { id: "transform", label: "Transform", weight: 0.9 },
    { id: "store", label: "Store", weight: 0.65 },
    { id: "mesh", label: "Mesh", weight: 0.5 },
];

const NODE_LINK_LINKS = [
    { source: "gateway", target: "stream" },
    { source: "stream", target: "transform" },
    { source: "transform", target: "store" },
    { source: "transform", target: "mesh" },
    { source: "store", target: "mesh" },
];

const HUD_STATS = [
    { metric: "Throughput", value: "1.2k msg/s", detail: "+8% vs. live" },
    { metric: "Latency", value: "48 ms", detail: "target 50 ms" },
    { metric: "Integrity", value: "99.98%", detail: "drift < 0.02" },
];

const defaultCamera: NonNullable<CanvasProps["camera"]> = {
    position: [0, 0, 8] as [number, number, number],
    fov: 55,
};

type SceneFrameProps = {
    children: ReactNode;
    camera?: CanvasProps["camera"];
    className?: string;
};

function SceneFrame({ children, camera, className = "" }: SceneFrameProps) {
    const cameraSettings = camera ?? defaultCamera;
    return (
        <div className={`h-72 w-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 shadow-2xl ${className}`.trim()}>
            <R3FErrorBoundary>
                <Canvas dpr={[1, 2]} camera={cameraSettings} className="h-full w-full" gl={{ antialias: true }}>
                    {children}
                </Canvas>
            </R3FErrorBoundary>
        </div>
    );
}

export function EnginePage() {
    const tabs = useMemo(() => {
        const primitivesContent = (
            <Card
                title="Data mesh primitives"
                subtitle="Tune NodeLinkGraph spacing, weights, and focus"
                actions={<Badge accent="#38bdf8">NodeLinkGraph</Badge>}
            >
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4 text-sm text-slate-300">
                        <p>
                            Build the vertical slice that drives edge-to-core handoffs. Radial layouts, live
                            orbit controls, and link weights surface whether the primitives behave when we push data
                            spikes through a real ingestion mesh.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge accent="#22d3ee">Orbit controls</Badge>
                            <Badge accent="#4ade80">Weight aware</Badge>
                            <Badge accent="#f472b6">Radial layout</Badge>
                        </div>
                        <div className="space-y-1 rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-2 text-[11px] text-slate-300">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                                <span>Edge health</span>
                                <span className="text-emerald-300">92%</span>
                            </div>
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.18em] text-slate-400">
                                <span>Control loop</span>
                                <span className="text-slate-100">0.6 Hz</span>
                            </div>
                        </div>
                    </div>
                    <SceneFrame camera={{ position: [0, 3, 9], fov: 52 }}>
                        <NodeLinkGraph nodes={NODE_LINK_NODES} links={NODE_LINK_LINKS} radius={4.2} color="#fcd34d" linkColor="#38bdf8" />
                    </SceneFrame>
                </div>
            </Card>
        );

        const overlaysContent = (
            <Card
                title="Instrumentation overlays"
                subtitle="Anchor Html annotations alongside world objects"
                actions={<Badge accent="#a855f7">Html</Badge>}
            >
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4 text-sm text-slate-300">
                        <p>
                            View the same vertical slice from the perspective of UX instrumentation. Html is used to keep live
                            annotations legible while the scene rotates, and the floating stats box mimics telemetry overlays.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge accent="#34d399">Distance aware</Badge>
                            <Badge accent="#38bdf8">2D markup</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-[11px] text-slate-300">
                            {HUD_STATS.map((stat) => (
                                <div key={stat.metric} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                                    <div className="text-[9px] uppercase tracking-[0.2em] text-slate-400">{stat.metric}</div>
                                    <div className="text-sm font-semibold text-white">{stat.value}</div>
                                    <div className="text-[11px] text-slate-400">{stat.detail}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <SceneFrame camera={{ position: [0, 1.8, 5], fov: 50 }}>
                        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.3} />
                        <ambientLight intensity={0.45} />
                        <directionalLight position={[3, 4, 2]} intensity={0.9} color="#bfdbfe" />
                        <mesh position={[0, -0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <planeGeometry args={[12, 12]} />
                            <meshStandardMaterial color="#020617" roughness={0.95} metalness={0.05} />
                        </mesh>
                        <mesh position={[0, 0.1, 0]}>
                            <boxGeometry args={[2.4, 1.3, 0.2]} />
                            <meshStandardMaterial color="#111827" roughness={0.2} metalness={0.1} />
                        </mesh>
                        <R3FHtml position={[0, 1.15, 0]} distanceFactor={6}>
                            <div className="rounded-2xl border border-white/20 bg-white px-4 py-2 text-xs font-semibold text-slate-900 shadow">Diagnostics</div>
                        </R3FHtml>
                    </SceneFrame>
                </div>
            </Card>
        );

        const vfxContent = (
            <Card
                title="Elemental VFX slice"
                subtitle="Campfire shader plus particles"
                actions={<Badge accent="#f97316">Campfire</Badge>}
            >
                <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-4 text-sm text-slate-300">
                        <p>
                            Build the VFX vertical slice with custom shader flames and particle bursts. This scenario lets us
                            validate additive blending, lighting, and play ready cue cards before wiring them into dashboards.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            <Badge accent="#facc15">Custom shader</Badge>
                            <Badge accent="#fb7185">Additive</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span className="rounded-full border border-white/10 px-2 py-1">≈ 180 particles</span>
                            <span>Persistence tested</span>
                        </div>
                    </div>
                    <SceneFrame camera={{ position: [0, 1.5, 5], fov: 48 }}>
                        <OrbitControls enablePan={false} autoRotate autoRotateSpeed={0.25} />
                        <ambientLight intensity={0.5} color="#fef3c7" />
                        <pointLight position={[0, 3, 4]} intensity={1.1} color="#ffeedd" />
                        <CampfireFlame size={1.1} intensity={1.35} lightIntensity={2.4} />
                        <FireExplosion scale={1.2} size={0.14} />
                        <mesh position={[0, -0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                            <cylinderGeometry args={[1.3, 1.3, 0.08, 32]} />
                            <meshStandardMaterial color="#111827" roughness={0.7} metalness={0.1} />
                        </mesh>
                    </SceneFrame>
                </div>
            </Card>
        );

        return [
            { key: "primitives", label: "Primitives", content: primitivesContent },
            { key: "overlays", label: "Overlays", content: overlaysContent },
            { key: "vfx", label: "VFX", content: vfxContent },
        ];
    }, []);

    return (
        <StarfieldLayout contentClassName="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
            <SectionHeader
                kicker="Engine lab"
                title="3D engine prototypes"
                description="Mix primitives and components across tabs before wiring the scenes back into the dashboards."
                actions={
                    <div className="flex flex-wrap items-center gap-2">
                        <Badge accent="#22d3ee">3 vertical slices</Badge>
                        <Badge accent="#a855f7">R3F sandbox</Badge>
                    </div>
                }
                status={<span className="text-xs uppercase tracking-[0.28em] text-slate-400">Live canvas</span>}
            />

            <Tabs tabs={tabs} className="w-full" />
        </StarfieldLayout>
    );
}
