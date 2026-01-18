import { PerspectiveCamera } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import { useAtlasState } from "../react-hooks/atlas";
import { useMapView } from "../react-hooks/useMapView";
import { usePoiSearch } from "../react-hooks/usePoiSearch";

function MapAlignedCamera({ bearing, pitch, zoom }: { bearing: number; pitch: number; zoom: number }) {
    const target = useRef<THREE.Vector3>(new THREE.Vector3());
    const cameraRef = useRef<THREE.Vector3>(new THREE.Vector3(0, 12, 18));

    useFrame((state, delta) => {
        const bearingRad = THREE.MathUtils.degToRad(bearing);
        const pitchRad = THREE.MathUtils.degToRad(pitch);
        const radius = THREE.MathUtils.clamp(18 - zoom * 0.35, 10, 22);
        const horizontal = radius * Math.cos(pitchRad);
        const height = Math.max(5, radius * Math.sin(pitchRad) + 3);
        const next = target.current.clone().add(
            new THREE.Vector3(Math.sin(bearingRad) * horizontal, height, Math.cos(bearingRad) * horizontal)
        );

        cameraRef.current.lerp(next, 1 - Math.pow(0.003, delta));
        state.camera.position.copy(cameraRef.current);
        state.camera.lookAt(target.current);
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

export function AuthenticatedScene() {
    const { activeContext } = useAtlasState();
    const { view } = useMapView();
    const poi = usePoiSearch({ center: view.center });

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

            <Ground color={environment.background} />
            <MapAlignedCamera bearing={view.bearing} pitch={view.pitch} zoom={view.zoom} />

            {poi.pois.length ? <PoiMarkers pois={poi.pois} /> : null}
        </>
    );
}
