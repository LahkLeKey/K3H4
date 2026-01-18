import { Line } from "@react-three/drei";

export function GizmoLocator({ position }: { position: [number, number, number] }) {
    const size = 0.5;
    return (
        <group position={position}>
            <Line points={[[0, 0, 0], [size, 0, 0]]} color="#ef4444" lineWidth={2} />
            <Line points={[[0, 0, 0], [0, size, 0]]} color="#22c55e" lineWidth={2} />
            <Line points={[[0, 0, 0], [0, 0, size]]} color="#60a5fa" lineWidth={2} />
        </group>
    );
}
