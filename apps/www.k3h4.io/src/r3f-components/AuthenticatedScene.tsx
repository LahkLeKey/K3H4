import { Line, PerspectiveCamera, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useAtlasState } from "../react-hooks/atlas";
import { useMapView } from "../react-hooks/useMapView";
import { usePoiSearch } from "../react-hooks/usePoiSearch";
import { useGeoRoute } from "../react-hooks/useGeoRoute";

function CameraRig({ focus, bearing, pitch, zoom }: { focus: THREE.Vector3 | null; bearing: number; pitch: number; zoom: number }) {
    const targetRef = useRef<THREE.Vector3>(focus ? focus.clone() : new THREE.Vector3());
    const cameraRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 10, 14));

    useEffect(() => {
        targetRef.current = focus ? focus.clone() : new THREE.Vector3();
    }, [focus]);

    useFrame((state, delta) => {
        const bearingRad = THREE.MathUtils.degToRad(bearing);
        const pitchRad = THREE.MathUtils.degToRad(pitch);
        const radius = THREE.MathUtils.clamp(14 - zoom * 0.6, 4.5, 16);
        const horizontal = radius * Math.cos(pitchRad);
        const height = Math.max(3.6, radius * Math.sin(pitchRad) + 2.8);
        const next = targetRef.current.clone().add(
            new THREE.Vector3(Math.sin(bearingRad) * horizontal, height, Math.cos(bearingRad) * horizontal)
        );

        cameraRef.current.lerp(next, 1 - Math.pow(0.002, delta));

        state.camera.position.copy(cameraRef.current);
        state.camera.lookAt(targetRef.current);
    });

    return null;
}

function Ground({ color }: { color: string }) {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
            <planeGeometry args={[280, 280]} />
            <meshStandardMaterial
                color={color}
                emissive={color}
                emissiveIntensity={0.08}
                roughness={0.8}
                metalness={0.05}
                transparent
                opacity={0.08}
            />
        </mesh>
    );
}

const poiColors: Record<string, string> = {
    bank: "#6cf1d0",
    atm: "#60a5fa",
    restaurant: "#f97316",
    cafe: "#f472b6",
    fuel: "#fbbf24",
    bus_station: "#a855f7",
    train_station: "#a78bfa",
};

function PoiMarkers({ pois }: { pois: ReturnType<typeof usePoiSearch>["pois"] }) {
    if (!pois.length) return null;
    return (
        <group>
            {pois.slice(0, 40).map((poi) => {
                const color = poiColors[poi.kind] ?? "#22d3ee";
                return (
                    <group key={poi.id} position={poi.position}>
                        <mesh position={[0, 0.35, 0]}>
                            <sphereGeometry args={[0.35, 24, 24]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.7} roughness={0.35} />
                        </mesh>
                        <mesh rotation={[-Math.PI / 2, 0, 0]}>
                            <ringGeometry args={[0.28, 0.48, 32]} />
                            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} transparent opacity={0.6} />
                        </mesh>
                    </group>
                );
            })}
        </group>
    );
}

function WorldRoute({ points, color }: { points: THREE.Vector3[]; color: string }) {
    if (points.length < 2) return null;

    return (
        <group>
            <Line points={points} color={color} opacity={0.9} linewidth={4} transparent />
            {points.map((pt, idx) =>
                idx % 28 === 0 ? (
                    <mesh key={`marker-${idx}`} position={pt} rotation={[-Math.PI / 2, 0, 0]}>
                        <ringGeometry args={[0.5, 0.7, 48]} />
                        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} transparent opacity={0.5} />
                    </mesh>
                ) : null
            )}
        </group>
    );
}

function NavArrows({ points, step, activeIndex, onSelect }: { points: THREE.Vector3[]; step: number; activeIndex: number; onSelect: (idx: number) => void }) {
    if (points.length < 2) return null;

    return (
        <group>
            {points.map((pt, idx) => {
                if (idx % step !== 0 || idx >= points.length - 1) return null;
                const next = points[idx + 1];
                const dir = next.clone().sub(pt);
                const angle = Math.atan2(dir.x, dir.z);
                const active = Math.abs(activeIndex - idx) < step;
                const emissive = active ? "#a5f3fc" : "#22d3ee";
                return (
                    <mesh
                        key={`nav-${idx}`}
                        position={[pt.x, 0.08, pt.z]}
                        rotation={[0, angle, 0]}
                        onPointerDown={(e) => {
                            e.stopPropagation();
                            onSelect(idx);
                        }}
                    >
                        <cylinderGeometry args={[0, active ? 0.36 : 0.28, active ? 0.72 : 0.6, 16]} />
                        <meshStandardMaterial color={emissive} emissive={emissive} emissiveIntensity={0.85} roughness={0.35} />
                    </mesh>
                );
            })}
        </group>
    );
}

function UserOrigin({ point }: { point: THREE.Vector3 | undefined }) {
    if (!point) return null;
    return (
        <group position={point}>
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.5, 1, 48]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.75} transparent opacity={0.7} />
            </mesh>
            <mesh position={[0, 0.6, 0]}>
                <coneGeometry args={[0.4, 1.2, 24]} />
                <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1} metalness={0.25} />
            </mesh>
        </group>
    );
}

export function AuthenticatedScene() {
    const { activeContext } = useAtlasState();
    const { view } = useMapView();
    const poi = usePoiSearch({ center: view.center });
    const geo = useGeoRoute();
    const routePoints = geo.points;

    const navStep = useMemo(() => Math.max(6, Math.floor(routePoints.length / 24)), [routePoints.length]);
    const [activeIdx, setActiveIdx] = useState(0);

    useEffect(() => {
        setActiveIdx(0);
    }, [routePoints.length]);

    const moveAlongRoute = useCallback(
        (delta: number) => {
            if (!routePoints.length) return;
            setActiveIdx((prev) => THREE.MathUtils.clamp(prev + delta * navStep, 0, routePoints.length - 1));
        },
        [navStep, routePoints.length]
    );

    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (!routePoints.length) return;
            if (event.key === "ArrowRight" || event.key === "ArrowUp") {
                event.preventDefault();
                moveAlongRoute(1);
            } else if (event.key === "ArrowLeft" || event.key === "ArrowDown") {
                event.preventDefault();
                moveAlongRoute(-1);
            }
        };

        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [moveAlongRoute, routePoints.length]);

    const focus = routePoints[activeIdx] ?? routePoints[0] ?? null;

    const environment = activeContext.environment;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 6, 12]} fov={48} />

            <ambientLight intensity={0.4} color={environment.lights.fill.color} />
            <directionalLight
                position={[environment.lights.key.position[0], 10, environment.lights.key.position[2]]}
                intensity={environment.lights.key.intensity}
                color={environment.lights.key.color}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={environment.lights.rim.position} intensity={environment.lights.rim.intensity} color={environment.lights.rim.color} />

            <Stars radius={120} depth={50} count={2400} factor={2.0} saturation={0.7} fade speed={0.25} />

            <Ground color={environment.background} />
            <CameraRig focus={focus} bearing={view.bearing} pitch={view.pitch} zoom={view.zoom} />

            {routePoints.length ? <WorldRoute points={routePoints} color="#22d3ee" /> : null}
            {routePoints.length ? (
                <NavArrows points={routePoints} step={navStep} activeIndex={activeIdx} onSelect={(idx) => setActiveIdx(idx)} />
            ) : null}
            <UserOrigin point={focus ?? routePoints[0]} />

            {poi.pois.length ? <PoiMarkers pois={poi.pois} /> : null}
        </>
    );
}
