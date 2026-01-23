import { Canvas, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import type maplibregl from "maplibre-gl";
import * as THREE from "three";

export type Poi = { id: string; lat: number; lng: number; kind?: string; name?: string; osmId?: string; osmType?: string };

const PIN_COLORS: Record<string, string> = {
    restaurant: "#f97316",
    cafe: "#a855f7",
    fuel: "#f59e0b",
    bank: "#22c55e",
    atm: "#22c55e",
    bus_station: "#38bdf8",
    train_station: "#0ea5e9",
};

function PinMesh({ color, phase }: { color: string; phase: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        const bob = Math.sin(t * 2.1 + phase) * 1.5;
        if (groupRef.current) groupRef.current.position.y = bob;
    });

    return (
        <group ref={groupRef}>
            <mesh position={[0, 12, 0]}>
                <sphereGeometry args={[4, 22, 22]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} roughness={0.26} metalness={0.12} />
            </mesh>
            <mesh rotation={[Math.PI, 0, 0]}>
                <coneGeometry args={[5, 14, 22]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.85} roughness={0.32} metalness={0.1} />
            </mesh>
            <mesh position={[0, -6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <torusGeometry args={[4.4, 1.1, 16, 28]} />
                <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} roughness={0.4} metalness={0.08} />
            </mesh>
        </group>
    );
}

export function MapPinsOverlay({ map, pois, frame }: { map: maplibregl.Map | null; pois: Poi[]; frame: number }) {
    const [size, setSize] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
    const phaseCache = useRef<Record<string, number>>({});

    useLayoutEffect(() => {
        if (!map) return;
        const container = map.getContainer();
        const update = () => setSize({ w: container.clientWidth, h: container.clientHeight });
        update();
        const ro = new ResizeObserver(update);
        ro.observe(container);
        return () => ro.disconnect();
    }, [map]);

    const projected = useMemo(() => {
        if (!map || !size.w || !size.h)
            return [] as Array<{ poi: Poi; x: number; y: number; color: string; phase: number; isCluster: boolean }>;
        return pois
            .map((poi) => {
                const p = map.project([poi.lng, poi.lat]);
                const color = PIN_COLORS[poi.kind ?? ""] ?? "#e2e8f0";
                const isCluster = poi.kind === "cluster" || poi.id.startsWith("cluster:");
                if (!phaseCache.current[poi.id]) phaseCache.current[poi.id] = Math.random() * Math.PI * 2;
                return { poi, x: p.x, y: p.y, color, phase: phaseCache.current[poi.id], isCluster };
            })
            .filter((p) => p.x >= -64 && p.x <= size.w + 64 && p.y >= -64 && p.y <= size.h + 64);
    }, [frame, map, pois, size.h, size.w]);

    // No pins to display
    if (!map || !size.w || !size.h) return null;
    if (projected.length === 0) return null;

    const left = -size.w / 2;
    const right = size.w / 2;
    const top = size.h / 2;
    const bottom = -size.h / 2;

    return (
        <div className="pointer-events-none absolute inset-0 z-10">
            <Canvas
                key={`${size.w}x${size.h}`}
                className="pointer-events-none"
                orthographic
                camera={{ position: [0, 0, 400], zoom: 1, left, right, top, bottom, near: -500, far: 500 }}
                style={{ pointerEvents: "none", width: "100%", height: "100%" }}
                dpr={1}
                events={undefined}
            >
                <ambientLight intensity={0.65} />
                <directionalLight position={[120, 180, 160]} intensity={0.55} color="#ffffff" />
                <group position={[-size.w / 2, size.h / 2, 0]}>
                    {projected.map((p) => (
                        <group key={p.poi.id} position={[p.x, -p.y, 0]}>
                            <PinMesh color={p.color} phase={p.phase} />
                        </group>
                    ))}
                </group>
            </Canvas>

            <div className="pointer-events-none absolute inset-0 z-20 select-none" style={{ fontFamily: "'Inter', system-ui, -apple-system, sans-serif" }}>
                {projected
                    .filter((p) => p.poi.name && !p.isCluster)
                    .map((p) => (
                        <div
                            key={`${p.poi.id}-label`}
                            className="absolute text-xs font-semibold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)] whitespace-nowrap"
                            style={{ left: p.x, top: p.y - 26, transform: "translate(-50%, -50%)" }}
                        >
                            {p.poi.name}
                        </div>
                    ))}
            </div>
        </div>
    );
}
