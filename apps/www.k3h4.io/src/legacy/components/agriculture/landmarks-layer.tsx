import { Html, useCursor } from "@react-three/drei";
import { useState } from "react";

import type { Landmark } from "./plot-types";

type LandmarkBlockProps = {
    landmark: Landmark;
};

function LandmarkBlock({ landmark }: LandmarkBlockProps) {
    const [hovered, setHovered] = useState(false);
    useCursor(hovered);

    return (
        <group position={landmark.position}>
            <mesh
                castShadow
                receiveShadow
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                onClick={() => landmark.onClick?.()}
            >
                <boxGeometry args={[2.6, 1.6, 2.6]} />
                <meshStandardMaterial color={landmark.color} roughness={0.4} />
            </mesh>
            <mesh position={[0, 1.1, 0]}>
                <boxGeometry args={[2.8, 0.2, 2.8]} />
                <meshStandardMaterial color={`${landmark.color}cc`} />
            </mesh>
            {hovered && (
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
                    <ringGeometry args={[1.55, 1.85, 32]} />
                    <meshBasicMaterial color={landmark.color} transparent opacity={0.5} />
                </mesh>
            )}
            <Html position={[0, 1.4, 0]} center className="pointer-events-none select-none" zIndexRange={[0, 0]}>
                <div className="rounded-md border border-white/60 bg-white/90 px-2 py-1 text-[11px] font-semibold text-slate-700 shadow">
                    {landmark.label}
                    {landmark.subtitle ? <div className="text-[10px] font-medium text-slate-500">{landmark.subtitle}</div> : null}
                </div>
            </Html>
        </group>
    );
}

type LandmarksLayerProps = {
    landmarks: Landmark[];
};

export function LandmarksLayer({ landmarks }: LandmarksLayerProps) {
    return <>{landmarks.map((landmark) => (<LandmarkBlock key={landmark.id} landmark={landmark} />))}</>;
}
