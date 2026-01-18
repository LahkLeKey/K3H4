import { Line, OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

export type GraphNode = { id: string; label?: string; group?: string; weight?: number };
export type GraphLink = { id?: string; source: string; target: string; weight?: number };

export type NodeLinkGraphProps = {
    nodes: GraphNode[];
    links: GraphLink[];
    radius?: number;
    color?: string;
    linkColor?: string;
};

export function NodeLinkGraph({ nodes, links, radius = 4, color = "#a78bfa", linkColor = "#22d3ee" }: NodeLinkGraphProps) {
    const layout = useMemo(() => {
        const angleStep = (Math.PI * 2) / Math.max(nodes.length, 1);
        const positions = new Map<string, THREE.Vector3>();
        nodes.forEach((node, idx) => {
            const angle = idx * angleStep;
            positions.set(node.id, new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
        });
        return { positions };
    }, [nodes, radius]);

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 6, 10]} fov={55} />
            <ambientLight intensity={0.6} />
            <OrbitControls enablePan={false} />
            <group>
                {links.map((link, idx) => {
                    const a = layout.positions.get(link.source);
                    const b = layout.positions.get(link.target);
                    if (!a || !b) return null;
                    return <Line key={link.id ?? `${link.source}-${link.target}-${idx}`} points={[a, b]} color={linkColor} opacity={0.5} transparent />;
                })}
                {nodes.map((node) => {
                    const pos = layout.positions.get(node.id) ?? new THREE.Vector3();
                    return (
                        <mesh key={node.id} position={pos} castShadow>
                            <sphereGeometry args={[0.22 + (node.weight ?? 0) * 0.08, 18, 18]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.4} />
                        </mesh>
                    );
                })}
            </group>
        </>
    );
}
