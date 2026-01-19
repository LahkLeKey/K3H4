import type maplibregl from "maplibre-gl";

import { useAtlasState } from "../react-hooks/atlas";

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

export function AuthenticatedScene({ map: _map }: { map: maplibregl.Map }) {
    const { activeContext } = useAtlasState();

    const environment = activeContext.environment;

    return (
        <>
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
        </>
    );
}
