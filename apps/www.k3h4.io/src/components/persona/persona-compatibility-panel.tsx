import { useEffect, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { RefreshCcw, Sparkles } from "lucide-react";

import {
    usePersonaListQuery,
    usePersonaCompatibilityQuery,
    useRecomputePersonaCompatibilityMutation,
    type Persona,
    type PersonaCompatibility,
} from "../../hooks/use-persona-queries";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

const scoreColor = (score: number) => {
    if (score >= 0.66) return "#16a34a";
    if (score >= 0.4) return "#f59e0b";
    if (score >= 0.2) return "#22d3ee";
    return "#94a3b8";
};

const buildNodePositions = (personas: Persona[]) => {
    const count = Math.max(personas.length, 1);
    const radius = 4.2;
    return personas.map((persona, index) => {
        const angle = (2 * Math.PI * index) / count;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        return { ...persona, position: [x, 0.6, z] as [number, number, number] };
    });
};

type GraphNode = Persona & { position: [number, number, number] };

type GraphEdge = {
    id: string;
    sourceId: string;
    targetId: string;
    score: number;
    overlap: string[];
};

function CompatibilityCanvas({ nodes, edges }: { nodes: GraphNode[]; edges: GraphEdge[] }) {
    const positions = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node.position])), [nodes]);
    return (
        <Canvas camera={{ position: [0, 6, 10], fov: 52 }}>
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 8, 6]} intensity={0.8} />
            {edges.map((edge) => {
                const source = positions[edge.sourceId];
                const target = positions[edge.targetId];
                if (!source || !target) return null;
                const mid = [(source[0] + target[0]) / 2, 0.4, (source[2] + target[2]) / 2] as [number, number, number];
                const color = scoreColor(edge.score);
                return (
                    <group key={edge.id}>
                        <Line
                            points={[source, target]}
                            color={color}
                            lineWidth={2}
                            dashed
                            dashSize={0.5}
                            gapSize={0.25}
                        />
                        <Html position={mid} center className="pointer-events-none select-none text-xs">
                            <div className="rounded-full bg-background/80 px-2 py-1 font-semibold shadow">
                                {(edge.score * 100).toFixed(0)}%
                            </div>
                        </Html>
                    </group>
                );
            })}
            {nodes.map((node) => {
                const nodeScore = edges.reduce((max, edge) => (edge.sourceId === node.id || edge.targetId === node.id ? Math.max(max, edge.score) : max), 0);
                return (
                    <group key={node.id} position={node.position}>
                        <mesh>
                            <sphereGeometry args={[0.55, 32, 32]} />
                            <meshStandardMaterial color={scoreColor(nodeScore + 0.1)} emissive="#0ea5e9" emissiveIntensity={0.35} />
                        </mesh>
                        <Html position={[0, 0.9, 0]} center className="pointer-events-none select-none text-xs">
                            <div className="rounded-lg bg-background/85 px-3 py-1 font-semibold shadow">{node.alias}</div>
                        </Html>
                    </group>
                );
            })}
            <OrbitControls enablePan enableZoom minDistance={4} maxDistance={20} target={[0, 0, 0]} />
        </Canvas>
    );
}

function CompatibilityList({ edges }: { edges: PersonaCompatibility[] }) {
    if (edges.length === 0) return <p className="text-sm text-muted-foreground">No compatibility pairs yet.</p>;
    return (
        <div className="space-y-2 text-sm">
            {edges.slice(0, 8).map((edge) => (
                <div key={edge.id} className="rounded-lg border bg-muted/40 px-3 py-2">
                    <div className="flex items-center justify-between">
                        <div className="font-semibold">
                            {edge.source.alias} &lt;-&gt; {edge.target.alias}
                        </div>
                        <Badge variant="secondary">{(edge.jaccardScore * 100).toFixed(0)}%</Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">Overlap: {edge.overlappingTokens.join(", ") || "None"}</div>
                </div>
            ))}
        </div>
    );
}

export function PersonaCompatibilityPanel({ apiBase, userEmail }: { apiBase: string; userEmail: string | null }) {
    const personasQuery = usePersonaListQuery(apiBase);
    const compatQuery = usePersonaCompatibilityQuery(apiBase);
    const { mutate: recomputeGraph, isPending: recomputePending } = useRecomputePersonaCompatibilityMutation(apiBase);

    const personas = personasQuery.data ?? [];
    const compatibilities = compatQuery.data ?? [];

    useEffect(() => {
        if (!compatQuery.isLoading && compatibilities.length === 0 && personas.length > 1 && !recomputePending) {
            recomputeGraph();
        }
    }, [compatQuery.isLoading, compatibilities.length, personas.length, recomputePending, recomputeGraph]);

    const nodes = useMemo<GraphNode[]>(() => buildNodePositions(personas), [personas]);
    const edges = useMemo<GraphEdge[]>(
        () => compatibilities.map((compat) => ({
            id: compat.id,
            sourceId: compat.sourceId,
            targetId: compat.targetId,
            score: compat.jaccardScore,
            overlap: compat.overlappingTokens,
        })),
        [compatibilities],
    );

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Compatibility graph</CardTitle>
                    <CardDescription>3D view of persona overlap by Jaccard similarity.</CardDescription>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Badge variant="secondary">User: {userEmail ?? "guest"}</Badge>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => recomputeGraph()}
                        disabled={recomputePending}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" /> Recompute
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="grid gap-4 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="relative h-[420px] overflow-hidden rounded-2xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
                    {compatQuery.isLoading ? (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            <Sparkles className="mr-2 h-4 w-4" /> Preparing graph...
                        </div>
                    ) : null}
                    {nodes.length > 0 ? <CompatibilityCanvas nodes={nodes} edges={edges} /> : (
                        <div className="absolute inset-0 flex items-center justify-center text-sm text-muted-foreground">
                            Add personas to see compatibility.
                        </div>
                    )}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/10 to-transparent" />
                </div>
                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-sm font-semibold">Top pairs</div>
                            <p className="text-xs text-muted-foreground">Edges ranked by Jaccard similarity.</p>
                        </div>
                        <Badge variant="outline">{compatibilities.length} pairs</Badge>
                    </div>
                    <CompatibilityList edges={compatibilities} />
                </div>
            </CardContent>
        </Card>
    );
}
