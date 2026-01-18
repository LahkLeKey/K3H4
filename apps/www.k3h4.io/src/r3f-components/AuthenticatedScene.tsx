import { Float, Line, PerspectiveCamera, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { useAtlasState } from "../react-hooks/atlas";
import type { AtlasContext } from "../react-hooks/data/atlas";
import { useMapView } from "../react-hooks/useMapView";
import { usePoiSearch } from "../react-hooks/usePoiSearch";
import { useGeoRoute } from "../react-hooks/useGeoRoute";
import { useFreightState } from "../react-hooks/freight";
import { StatusBillboard } from "../r3f-primitives/StatusBillboard.tsx";

type ContextPose = {
    context: AtlasContext;
    position: THREE.Vector3;
};

function CameraRig({ focus, bearing, pitch, zoom }: { focus: THREE.Vector3 | null; bearing: number; pitch: number; zoom: number }) {
    const targetRef = useRef<THREE.Vector3>(focus ? focus.clone() : new THREE.Vector3());
    const cameraRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 10, 14));

    useEffect(() => {
        targetRef.current = focus ? focus.clone() : new THREE.Vector3();
    }, [focus]);

    useFrame((state, delta) => {
        const bearingRad = THREE.MathUtils.degToRad(bearing);
        const pitchRad = THREE.MathUtils.degToRad(pitch);
        const radius = THREE.MathUtils.clamp(26 - zoom * 1.3, 7, 32);
        const horizontal = radius * Math.cos(pitchRad);
        const height = Math.max(5, radius * Math.sin(pitchRad) + 4);
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
            <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.25} roughness={0.6} metalness={0.1} />
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

function ContextWaypoint({ pose, active, onSelect }: { pose: ContextPose; active: boolean; onSelect: () => void }) {
    const pulseRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (pulseRef.current) {
            const scale = active ? 1.12 + Math.sin(t * 1.6) * 0.08 : 0.95 + Math.sin(t * 1.1) * 0.05;
            pulseRef.current.scale.setScalar(scale);
            pulseRef.current.rotation.y = t * 0.35;
        }
    });

    return (
        <group position={pose.position}>
            <mesh ref={pulseRef} onClick={onSelect} castShadow>
                <cylinderGeometry args={[0.7, 0.7, 0.35, 32, 1]} />
                <meshStandardMaterial
                    color={pose.context.accent}
                    emissive={pose.context.accent}
                    emissiveIntensity={active ? 0.9 : 0.45}
                    roughness={0.35}
                    metalness={0.4}
                />
            </mesh>
            <Float floatIntensity={0.4} speed={1.05} rotationIntensity={0.25}>
                <StatusBillboard
                    label={pose.context.name}
                    value={pose.context.summary}
                    accent={pose.context.accent}
                    position={[0, 1.1, 0]}
                />
            </Float>
        </group>
    );
}

export function AuthenticatedScene() {
    const { contexts, activeContext, setActiveId, selectNext, autopilot } = useAtlasState();
    const { loads } = useFreightState();
    const { view } = useMapView();
    const poi = usePoiSearch({ center: view.center });

    useEffect(() => {
        if (!autopilot || contexts.length < 2) return;
        const id = window.setInterval(() => selectNext({ manual: false }), 7000);
        return () => window.clearInterval(id);
    }, [autopilot, contexts.length, selectNext]);

    const destination = useMemo(() => {
        const top = loads[0];
        if (!top) return undefined;
        return { lat: top.destinationLat, lng: top.destinationLng };
    }, [loads]);

    const geo = useGeoRoute(destination);
    const routePoints = geo.points;

    const contextPoses: ContextPose[] = useMemo(() => {
        if (routePoints.length < 2) {
            return contexts.map((ctx) => ({ context: ctx, position: new THREE.Vector3(...ctx.anchor) }));
        }
        return contexts.map((ctx, idx) => {
            const slot = Math.min(routePoints.length - 1, Math.floor(((idx + 1) * routePoints.length) / (contexts.length + 1)));
            const base = routePoints[slot]?.clone() ?? new THREE.Vector3(0, 0, 0);
            base.y = 0.2 + (idx % 3) * 0.05;
            return { context: ctx, position: base };
        });
    }, [contexts, routePoints]);

    const activePose = useMemo(() => contextPoses.find((p) => p.context.id === activeContext.id) ?? contextPoses[0], [contextPoses, activeContext.id]);
    const focus = activePose?.position ?? routePoints[0] ?? null;

    const environment = activeContext.environment;

    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 6, 12]} fov={48} />
            <color attach="background" args={[environment.background]} />
            <fog attach="fog" args={[environment.fog.color, environment.fog.near, environment.fog.far * 1.4]} />

            <ambientLight intensity={0.4} color={environment.lights.fill.color} />
            <directionalLight
                position={[environment.lights.key.position[0], 10, environment.lights.key.position[2]]}
                intensity={environment.lights.key.intensity}
                color={environment.lights.key.color}
                castShadow
                shadow-mapSize={[1024, 1024]}
            />
            <pointLight position={environment.lights.rim.position} intensity={environment.lights.rim.intensity} color={environment.lights.rim.color} />

            <Stars radius={120} depth={50} count={5400} factor={2.6} saturation={0.9} fade speed={0.3} />

            <Ground color={environment.background} />
            <CameraRig focus={focus} bearing={view.bearing} pitch={view.pitch} zoom={view.zoom} />

            {routePoints.length ? <WorldRoute points={routePoints} color="#22d3ee" /> : null}
            <UserOrigin point={routePoints[0]} />

            <group>
                {contextPoses.map((pose) => (
                    <ContextWaypoint key={pose.context.id} pose={pose} active={pose.context.id === activeContext.id} onSelect={() => setActiveId(pose.context.id)} />
                ))}
            </group>

            {poi.pois.length ? <PoiMarkers pois={poi.pois} /> : null}
        </>
    );
}
