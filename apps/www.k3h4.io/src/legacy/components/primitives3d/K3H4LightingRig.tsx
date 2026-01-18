import type { ReactNode } from "react";
import * as THREE from "three";

export function K3H4LightingRig({
    keyLight,
    fillLight,
    rimLight,
    children,
}: {
    keyLight: { color: string; intensity: number; position: [number, number, number] };
    fillLight?: { color: string; intensity: number; position: [number, number, number] };
    rimLight?: { color: string; intensity: number; position: [number, number, number] };
    children?: ReactNode;
}) {
    return (
        <>
            <hemisphereLight
                intensity={fillLight?.intensity ?? 0.6}
                groundColor={new THREE.Color("#0b1220")}
                color={fillLight?.color ?? "#a7c4ff"}
                position={fillLight?.position ?? [-6, 4, -4]}
            />
            <directionalLight
                position={keyLight.position}
                intensity={keyLight.intensity}
                castShadow
                shadow-mapSize={[1024, 1024]}
                color={keyLight.color}
            />
            <pointLight position={rimLight?.position ?? [0, 6, -4]} intensity={rimLight?.intensity ?? 0.4} color={rimLight?.color ?? "#72f0d0"} />
            {children}
        </>
    );
}
