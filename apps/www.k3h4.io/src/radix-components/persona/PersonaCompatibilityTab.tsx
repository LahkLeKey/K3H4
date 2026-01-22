import { Canvas } from "@react-three/fiber";
import type { PersonaCompatibility } from "../@/zustand-stores/persona";
import { Badge, Button, Histogram, Pill, Stack, Surface } from "../@/components/ui";
import { R3FErrorBoundary } from "../@/r3f-components/R3FErrorBoundary";
import { NodeLinkGraph } from "../@/r3f-primitives/NodeLinkGraph";
import { CompatibilityRow } from "./CompatibilityRow";

export type PersonaCompatibilityTabProps = {
    compatBins: number[];
    compatibilities: PersonaCompatibility[];
    compatTop: PersonaCompatibility[];
    compatText: string;
    compatError: string | null;
    compatStatus: "idle" | "loading" | "ready" | "error";
    showGraph: boolean;
    onToggleGraph: () => void;
    onFetch: () => void;
    onRecompute: () => void;
};

export function PersonaCompatibilityTab({
    compatBins,
    compatibilities,
    compatTop,
    compatText,
    compatError,
    compatStatus,
    showGraph,
    onToggleGraph,
    onFetch,
    onRecompute,
}: PersonaCompatibilityTabProps) {
    return (
        <Stack gap="md">
            <Stack direction="row" align="center" gap="sm" className="text-[11px] text-slate-300">
                <Button accent="#0ea5e9" onClick={onFetch} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Fetching..." : "Fetch"}
                </Button>
                <Button accent="#f59e0b" onClick={onRecompute} disabled={compatStatus === "loading"}>
                    {compatStatus === "loading" ? "Recomputing..." : "Recompute"}
                </Button>
                <Pill tone="slate">{compatText}</Pill>
                {compatError ? <span className="text-amber-300">{compatError}</span> : null}
                {compatibilities.length > 0 ? (
                    <Button
                        variant={showGraph ? "solid" : "subtle"}
                        accent="#22c55e"
                        className="px-3 py-1 text-[11px]"
                        onClick={onToggleGraph}
                    >
                        {showGraph ? "Hide graph" : "Show graph"}
                    </Button>
                ) : null}
            </Stack>
            <Histogram bins={compatBins} labels={["0-0.2", "0.2-0.4", "0.4-0.6", "0.6-0.8", "0.8-1.0"]} footer={`Pairs: ${compatibilities.length}`} />
            {showGraph && compatibilities.length > 0 ? (
                <Surface tone="overlay" radius="2xl" padding="xs">
                    <R3FErrorBoundary>
                        <Canvas dpr={[1, 1.5]} camera={{ position: [0, 6, 10], fov: 55 }} style={{ height: 340 }}>
                            <color attach="background" args={["#0b1224"]} />
                            <NodeLinkGraph
                                nodes={Array.from(
                                    new Map(
                                        compatibilities.flatMap((c) => [
                                            [c.source.id, { id: c.source.id, label: c.source.alias }],
                                            [c.target.id, { id: c.target.id, label: c.target.alias }],
                                        ]),
                                    ).values(),
                                )}
                                links={compatibilities.slice(0, 24).map((c) => ({
                                    source: c.source.id,
                                    target: c.target.id,
                                    weight: c.jaccardScore,
                                }))}
                                color="#a78bfa"
                                linkColor="#22d3ee"
                            />
                        </Canvas>
                    </R3FErrorBoundary>
                </Surface>
            ) : null}
            <Stack gap="sm">
                {compatTop.length === 0 ? (
                    <Surface radius="xl" padding="md" className="text-sm text-slate-200">No compatibility rows yet.</Surface>
                ) : (
                    compatTop.map((compat) => <CompatibilityRow key={compat.id} compat={compat} />)
                )}
            </Stack>
        </Stack>
    );
}
