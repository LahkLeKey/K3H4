import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useActiveZone, useAtlas } from "../../state/atlas/atlas-store";
import { Portal } from "../primitives3d/Portal";
import { ZoneAnchor } from "../primitives3d/ZoneAnchor";
import { K3H4FogRig } from "../primitives3d/K3H4FogRig";
import { K3H4LightingRig } from "../primitives3d/K3H4LightingRig";
import type { ZoneDefinition } from "../../state/atlas/types";

function CameraController({ activeZone }: { activeZone: ZoneDefinition }) {
    const { zones } = useAtlas();
    const [isMobile, setIsMobile] = useState(false);
    const cameraState = useRef({
        pos: new THREE.Vector3(...activeZone.spawn.position),
        look: new THREE.Vector3(...activeZone.spawn.target),
    });

    useMemo(() => {
        cameraState.current.pos = new THREE.Vector3(...activeZone.spawn.position);
        cameraState.current.look = new THREE.Vector3(...activeZone.spawn.target);
    }, [activeZone.spawn.position, activeZone.spawn.target]);

    useFrame(({ camera, scene }, delta) => {
        const damp = THREE.MathUtils.damp;
        const speed = 3;
        const offset = isMobile ? 3 : 4.5;
        cameraState.current.pos.x = damp(cameraState.current.pos.x, activeZone.spawn.position[0] + offset, speed, delta);
        cameraState.current.pos.y = damp(cameraState.current.pos.y, Math.max(activeZone.spawn.position[1], 1.2), speed, delta);
        cameraState.current.pos.z = damp(cameraState.current.pos.z, activeZone.spawn.position[2] + offset, speed, delta);
        cameraState.current.look.x = damp(cameraState.current.look.x, activeZone.spawn.target[0], speed, delta);
        cameraState.current.look.y = damp(cameraState.current.look.y, activeZone.spawn.target[1], speed, delta);
        cameraState.current.look.z = damp(cameraState.current.look.z, activeZone.spawn.target[2], speed, delta);

        camera.position.copy(cameraState.current.pos);
        camera.lookAt(cameraState.current.look);

        if (scene.background instanceof THREE.Color) {
            scene.background.lerp(new THREE.Color(activeZone.environment.background), delta * 0.6);
        }
        if (scene.fog instanceof THREE.Fog) {
            scene.fog.color.lerp(new THREE.Color(activeZone.environment.fogColor), delta * 0.6);
            scene.fog.near = damp(scene.fog.near, activeZone.environment.fogNear, speed, delta);
            scene.fog.far = damp(scene.fog.far, activeZone.environment.fogFar, speed, delta);
        }
    });

    return (
        <OrbitControls
            enablePan={false}
            enableRotate
            enableZoom
            minDistance={isMobile ? 7 : 6}
            maxDistance={isMobile ? 14 : 16}
            minPolarAngle={0.65}
            maxPolarAngle={1.35}
        />
    );
}

export function AtlasCanvas() {
    const { zones, activeZoneId, setActiveZone } = useAtlas();
    const activeZone = useActiveZone();

    return (
        <div className="fixed inset-0 -z-10 bg-slate-950">
            <Suspense fallback={null}>
                <Canvas shadows camera={{ position: activeZone.spawn.position, fov: 42 }}>
                    <color attach="background" args={[activeZone.environment.background]} />
                    <K3H4FogRig color={activeZone.environment.fogColor} near={activeZone.environment.fogNear} far={activeZone.environment.fogFar} />
                    <K3H4LightingRig keyLight={activeZone.environment.keyLight} fillLight={activeZone.environment.fillLight} rimLight={activeZone.environment.rimLight} />

                    {zones.map((zone) => (
                        <Portal
                            key={`${zone.id}-portal`}
                            position={zone.anchor}
                            accent={zone.accent}
                            label={zone.label}
                            glyph={zone.glyph}
                            description={zone.description}
                            onSelect={() => setActiveZone(zone.id)}
                        />
                    ))}

                    {zones.map((zone) => (
                        <ZoneAnchor key={`${zone.id}-anchor`} position={zone.anchor} label={zone.label} glyph={zone.glyph} accent={zone.accent} />
                    ))}

                    <Stars radius={50} depth={40} count={9000} factor={6} fade speed={0.6} saturation={0.8} />
                    <CameraController activeZone={activeZone} />
                </Canvas>
            </Suspense>
        </div>
    );
}
