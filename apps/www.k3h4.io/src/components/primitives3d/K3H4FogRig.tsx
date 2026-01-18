import * as THREE from "three";

export function K3H4FogRig({ color, near, far }: { color: string; near: number; far: number }) {
    return <fog attach="fog" args={[new THREE.Color(color), near, far]} />;
}
