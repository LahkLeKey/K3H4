import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Html, Line, OrbitControls } from "@react-three/drei";
import { AdditiveBlending, Color, DodecahedronGeometry, WireframeGeometry } from "three";

const scoreColor = (score: number) => {
    if (score >= 0.66) return "#16a34a";
    if (score >= 0.4) return "#f59e0b";
    if (score >= 0.2) return "#22d3ee";
    return "#94a3b8";
};

const compactAlias = (value: string, max = 12) => (value.length > max ? `${value.slice(0, max - 1)}…` : value);

const golden = (1 + Math.sqrt(5)) / 2;

const getDodecahedronVertices = (radius: number) => {
    const phi = golden;
    const invPhi = 1 / phi;
    const raw: Array<[number, number, number]> = [
        [-1, -1, -1],
        [-1, -1, 1],
        [-1, 1, -1],
        [-1, 1, 1],
        [1, -1, -1],
        [1, -1, 1],
        [1, 1, -1],
        [1, 1, 1],
        [0, -invPhi, -phi],
        [0, -invPhi, phi],
        [0, invPhi, -phi],
        [0, invPhi, phi],
        [-invPhi, -phi, 0],
        [-invPhi, phi, 0],
        [invPhi, -phi, 0],
        [invPhi, phi, 0],
        [-phi, 0, -invPhi],
        [-phi, 0, invPhi],
        [phi, 0, -invPhi],
        [phi, 0, invPhi],
    ];
    return raw.map(([x, y, z]) => {
        const mag = Math.hypot(x, y, z) || 1;
        const scale = radius / mag;
        return [x * scale, y * scale, z * scale] as [number, number, number];
    });
};

const getDodecahedronFrame = (radius: number) => {
    const geometry = new DodecahedronGeometry(radius);
    const wire = new WireframeGeometry(geometry);
    const pos = wire.getAttribute("position");
    const segments: Array<[[number, number, number], [number, number, number]]> = [];
    for (let i = 0; i < pos.count; i += 2) {
        segments.push([
            [pos.getX(i), pos.getY(i), pos.getZ(i)],
            [pos.getX(i + 1), pos.getY(i + 1), pos.getZ(i + 1)],
        ]);
    }
    return segments;
};

export type GraphNode = {
    id: string;
    alias: string;
    position: [number, number, number];
};

export type GraphEdge = {
    id: string;
    sourceId: string;
    targetId: string;
    score: number;
    kind?: "compat" | "category" | "bridge";
};

const edgeGasVertexShader = /* glsl */ `
    uniform float uPointScale;
    attribute float size;
    varying vec3 vColor;
    void main() {
        vColor = color;
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        float distAttenuation = 1.0 / max(0.0001, -mvPosition.z);
        gl_PointSize = size * distAttenuation * uPointScale;
        gl_Position = projectionMatrix * mvPosition;
    }
`;

const edgeGasFragmentShader = /* glsl */ `
    uniform float uOpacity;
    varying vec3 vColor;
    void main() {
        vec2 uv = gl_PointCoord - vec2(0.5);
        float d = length(uv);
        float alpha = smoothstep(0.55, 0.1, d) * uOpacity;
        gl_FragColor = vec4(vColor, alpha);
    }
`;

const pseudoRandom = (seed: number) => {
    const s = Math.sin(seed * 12.9898) * 43758.5453;
    return s - Math.floor(s);
};

function EdgeGasClouds({
    edges,
    positions,
    colorForEdge = (edge: GraphEdge) => scoreColor(edge.score),
    particlesPerEdge = 12,
    opacity = 0.68,
    pointScale = 140,
    label,
    labelLimit = 32,
}: {
    edges: GraphEdge[];
    positions: Record<string, [number, number, number]>;
    colorForEdge?: (edge: GraphEdge) => string;
    particlesPerEdge?: number;
    opacity?: number;
    pointScale?: number;
    label?: (edge: GraphEdge) => string;
    labelLimit?: number;
}) {

    const { pointPositions, colors, sizes, labelData } = useMemo(() => {
        const maxParticles = edges.length * particlesPerEdge;
        const pointPositions = new Float32Array(maxParticles * 3);
        const colors = new Float32Array(maxParticles * 3);
        const sizes = new Float32Array(maxParticles);
        let cursor = 0;
        const labelData: Array<{ id: string; pos: [number, number, number]; text: string; score: number }> = [];

        const colorHelper = new Color();

        edges.forEach((edge, edgeIdx) => {
            const source = positions[edge.sourceId];
            const target = positions[edge.targetId];
            if (!source || !target) return;

            const baseMid: [number, number, number] = [
                (source[0] + target[0]) * 0.5,
                (source[1] + target[1]) * 0.5 + 0.12,
                (source[2] + target[2]) * 0.5,
            ];

            const spread = 0.7 + edge.score * 1.6;
            const sizeBase = 0.9 + edge.score * 1.8;
            colorHelper.set(colorForEdge(edge));

            if (label && labelData.length < labelLimit) {
                const labelMid: [number, number, number] = [
                    (source[0] + target[0]) * 0.5,
                    (source[1] + target[1]) * 0.5 + 0.18,
                    (source[2] + target[2]) * 0.5,
                ];
                labelData.push({ id: edge.id, pos: labelMid, text: label(edge), score: edge.score });
            }

            for (let i = 0; i < particlesPerEdge; i++) {
                const seed = edgeIdx * 97 + i * 31;
                const r1 = pseudoRandom(seed);
                const r2 = pseudoRandom(seed + 17.31);
                const r3 = pseudoRandom(seed + 41.77);
                const angle = r1 * Math.PI * 2;
                const radial = (0.25 + r2 * 0.75) * spread;

                pointPositions[cursor * 3] = baseMid[0] + Math.cos(angle) * radial;
                pointPositions[cursor * 3 + 1] = baseMid[1] + (r3 - 0.5) * spread * 0.8;
                pointPositions[cursor * 3 + 2] = baseMid[2] + Math.sin(angle) * radial;

                colors[cursor * 3] = colorHelper.r;
                colors[cursor * 3 + 1] = colorHelper.g;
                colors[cursor * 3 + 2] = colorHelper.b;

                sizes[cursor] = sizeBase * (0.8 + pseudoRandom(seed + 7.13) * 0.6);
                cursor += 1;
            }
        });

        return {
            pointPositions: pointPositions.subarray(0, cursor * 3),
            colors: colors.subarray(0, cursor * 3),
            sizes: sizes.subarray(0, cursor),
            labelData,
        };
    }, [edges, particlesPerEdge, positions, colorForEdge, label, labelLimit]);

    const count = sizes.length;
    if (count === 0) return null;

    return (
        <group>
            <points frustumCulled={false} renderOrder={-1}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
                    <bufferAttribute attach="attributes-color" args={[colors, 3]} />
                    <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
                </bufferGeometry>
                <shaderMaterial
                    transparent
                    depthWrite={false}
                    vertexColors
                    blending={AdditiveBlending}
                    uniforms={{ uOpacity: { value: opacity }, uPointScale: { value: pointScale } }}
                    vertexShader={edgeGasVertexShader}
                    fragmentShader={edgeGasFragmentShader}
                />
            </points>
            {label && labelData.map((item) => {
                const opacity = Math.min(1, Math.max(0.2, item.score * 1.1));
                return (
                    <Html key={item.id} position={item.pos} center className="pointer-events-none select-none text-[9px] text-white" style={{ opacity }}>
                        <span className="max-w-[200px] overflow-hidden text-ellipsis text-center font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                            {item.text}
                        </span>
                    </Html>
                );
            })}
        </group>
    );
}

export function CompatibilityCanvas({
    nodes,
    edges,
    categoryEdges = [],
    bridgeEdges = [],
}: {
    nodes: GraphNode[];
    edges: GraphEdge[];
    categoryEdges?: GraphEdge[];
    bridgeEdges?: GraphEdge[];
}) {
    const positions = useMemo(() => Object.fromEntries(nodes.map((node) => [node.id, node.position])), [nodes]);
    const frameRadius = useMemo(() => Math.max(...nodes.map((n) => Math.hypot(n.position[0], n.position[2])), 6), [nodes]);
    const dodecaFrame = useMemo(() => getDodecahedronFrame(frameRadius), [frameRadius]);
    const dodecaVertices = useMemo(() => getDodecahedronVertices(frameRadius), [frameRadius]);
    const center = useMemo<[number, number, number]>(() => [0, 0.25, 0], []);
    const degreeByNode = useMemo(() => {
        const counts = Object.fromEntries(nodes.map((n) => [n.id, 0]));
        const bump = (edge: GraphEdge) => {
            if (counts[edge.sourceId] !== undefined) counts[edge.sourceId] += 1;
            if (counts[edge.targetId] !== undefined) counts[edge.targetId] += 1;
        };
        edges.forEach(bump);
        categoryEdges.forEach(bump);
        bridgeEdges.forEach(bump);
        return counts as Record<string, number>;
    }, [nodes, edges, categoryEdges, bridgeEdges]);
    return (
        <Canvas camera={{ position: [0, 4, 10], fov: 62 }}>
            <color attach="background" args={["#050816"]} />
            <ambientLight intensity={0.6} />
            <directionalLight position={[6, 8, 6]} intensity={0.8} />
            {dodecaFrame.map((segment, idx) => (
                <Line key={`frame-${idx}`} points={segment} color="#1e293b" lineWidth={1.5} />
            ))}
            {dodecaVertices.map((v, idx) => (
                <Line key={`radial-${idx}`} points={[v, center]} color="#0ea5e9" lineWidth={0.75} dashed dashSize={0.35} gapSize={0.25} />
            ))}
            <EdgeGasClouds
                edges={edges}
                positions={positions}
                label={(edge) => {
                    const a = compactAlias(nodes.find((n) => n.id === edge.sourceId)?.alias ?? edge.sourceId.slice(0, 4));
                    const b = compactAlias(nodes.find((n) => n.id === edge.targetId)?.alias ?? edge.targetId.slice(0, 4));
                    return `Tokens ${a} ↔ ${b} ${(edge.score * 100).toFixed(0)}%`;
                }}
                labelLimit={edges.length}
            />
            <EdgeGasClouds
                edges={categoryEdges}
                positions={positions}
                colorForEdge={() => "#c084fc"}
                opacity={0.54}
                particlesPerEdge={10}
                pointScale={160}
                label={(edge) => {
                    const a = compactAlias(nodes.find((n) => n.id === edge.sourceId)?.alias ?? edge.sourceId.slice(0, 4));
                    const b = compactAlias(nodes.find((n) => n.id === edge.targetId)?.alias ?? edge.targetId.slice(0, 4));
                    return `Categories ${a} ↔ ${b} ${(edge.score * 100).toFixed(0)}%`;
                }}
                labelLimit={categoryEdges.length}
            />
            {bridgeEdges.map((edge) => {
                const source = positions[edge.sourceId];
                const target = positions[edge.targetId];
                const sourceAlias = compactAlias(nodes.find((n) => n.id === edge.sourceId)?.alias ?? edge.sourceId.slice(0, 4));
                const targetAlias = compactAlias(nodes.find((n) => n.id === edge.targetId)?.alias ?? edge.targetId.slice(0, 4));
                if (!source || !target) return null;
                const mid: [number, number, number] = [
                    (source[0] + target[0]) * 0.5,
                    (source[1] + target[1]) * 0.5 + 0.22,
                    (source[2] + target[2]) * 0.5,
                ];
                const color = "#f472b6";
                return (
                    <group key={edge.id}>
                        <Line
                            points={[source, mid, target]}
                            color={color}
                            lineWidth={1.6}
                            dashed
                            dashSize={0.35}
                            gapSize={0.25}
                        />
                        <Html position={mid} center className="pointer-events-none select-none text-[9px] text-white" style={{ opacity: Math.min(1, Math.max(0.25, edge.score * 1.1)) }}>
                            <span className="max-w-[200px] overflow-hidden text-ellipsis text-center font-semibold drop-shadow-[0_1px_2px_rgba(0,0,0,0.7)]">
                                {`Context bridge ${sourceAlias} → ${targetAlias} ${(edge.score * 100).toFixed(0)}%`}
                            </span>
                        </Html>
                    </group>
                );
            })}
            {nodes.map((node) => {
                const isIsolated = (degreeByNode[node.id] ?? 0) === 0;
                const nodeScore = edges.reduce((max, edge) => (edge.sourceId === node.id || edge.targetId === node.id ? Math.max(max, edge.score) : max), 0);
                return (
                    <group key={node.id} position={node.position}>
                        <mesh>
                            <sphereGeometry args={[0.55, 32, 32]} />
                            <meshStandardMaterial
                                color={isIsolated ? "#0b1220" : scoreColor(nodeScore + 0.1)}
                                emissive={isIsolated ? "#111827" : "#0ea5e9"}
                                emissiveIntensity={isIsolated ? 0.7 : 0.35}
                                metalness={isIsolated ? 0.4 : 0.1}
                                roughness={isIsolated ? 0.8 : 0.35}
                            />
                        </mesh>
                        <Html position={[0, 0.9, 0]} center className="pointer-events-none select-none text-xs">
                            <div className="rounded-lg bg-background/85 px-3 py-1 font-semibold shadow">{isIsolated ? `Black hole: ${node.alias}` : node.alias}</div>
                        </Html>
                    </group>
                );
            })}
            <OrbitControls enablePan enableZoom minDistance={4} maxDistance={20} target={[0, 0, 0]} />
        </Canvas>
    );
}

export { getDodecahedronVertices };
