import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

export function FireExplosion({ scale = 1, size = 0.12 }: { scale?: number; size?: number }) {
    const pointsRef = useRef<THREE.Points>(null);
    const materialRef = useRef<THREE.PointsMaterial>(null);

    const { positions, colors } = useMemo(() => {
        const count = 420;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const colorA = new THREE.Color("#ff8a00");
        const colorB = new THREE.Color("#ff3300");

        for (let i = 0; i < count; i += 1) {
            const r = Math.random() * 1.6;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            const x = r * Math.sin(phi) * Math.cos(theta);
            const y = r * Math.cos(phi) * 0.6 + Math.random() * 0.3;
            const z = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            const lerp = Math.random() * 0.9 + 0.1;
            const c = colorA.clone().lerp(colorB, lerp);
            colors[i * 3] = c.r;
            colors[i * 3 + 1] = c.g;
            colors[i * 3 + 2] = c.b;
        }

        return { positions, colors };
    }, []);

    const start = useRef(performance.now());

    useFrame(({ clock }) => {
        const elapsed = clock.getElapsedTime();
        const cycle = (elapsed % 3.5) / 3.5;
        const intensity = 0.4 + Math.sin(cycle * Math.PI) * 0.6;

        if (pointsRef.current) {
            pointsRef.current.rotation.y += 0.0025;
            pointsRef.current.rotation.x += 0.0015;
            const s = scale * (0.8 + cycle * 0.6);
            pointsRef.current.scale.set(s, s, s);
        }

        if (materialRef.current) {
            materialRef.current.opacity = 0.25 + intensity * 0.65;
            materialRef.current.size = size * (0.6 + intensity * 0.8);
        }

        // occasional flash to mimic a burst
        if (materialRef.current && pointsRef.current) {
            const now = performance.now();
            const dt = now - start.current;
            if (dt > 1400 && Math.random() > 0.985) {
                start.current = now;
                materialRef.current.opacity = 1;
                pointsRef.current.scale.setScalar(Math.max(0.4, scale * 1.4));
            }
        }
    });

    return (
        <points ref={pointsRef} position={[0, 0.4, 0]}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-color" args={[colors, 3]} />
            </bufferGeometry>
            <pointsMaterial
                ref={materialRef}
                vertexColors
                size={size}
                sizeAttenuation
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
