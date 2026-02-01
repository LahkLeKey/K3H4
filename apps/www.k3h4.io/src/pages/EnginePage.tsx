import { Environment, OrbitControls, Stars, useTexture } from "@react-three/drei";
import { Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { FullscreenCanvasLayout } from "../components/r3f-components/FullscreenCanvasLayout";

type BodyShape = "sphere" | "box" | "icosa" | "torus";

type BodyConfig = {
    id: string;
    shape: BodyShape;
    collider: "ball" | "cuboid" | "hull";
    position: [number, number, number];
    size: number;
    color: string;
};

type MaterialMaps = {
    map: THREE.Texture;
    normalMap: THREE.Texture;
    roughnessMap: THREE.Texture;
    emissiveMap: THREE.Texture;
};

function MouseBall({ emissiveMap }: { emissiveMap: THREE.Texture }) {
    const bodyRef = useRef<RapierRigidBody | null>(null);
    const { camera, pointer } = useThree();
    const raycaster = useMemo(() => new THREE.Raycaster(), []);
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
    const target = useMemo(() => new THREE.Vector3(), []);

    useFrame(() => {
        if (!bodyRef.current) {
            return;
        }

        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.ray.intersectPlane(plane, target);
        if (!hit) {
            return;
        }

        bodyRef.current.setNextKinematicTranslation({ x: target.x, y: target.y, z: target.z });
    });

    return (
        <RigidBody ref={bodyRef} type="kinematicPosition" colliders="ball">
            <mesh>
                <sphereGeometry args={[0.7, 32, 32]} />
                <meshStandardMaterial
                    color="#fef9c3"
                    emissive="#fef9c3"
                    emissiveIntensity={0.7}
                    emissiveMap={emissiveMap}
                    metalness={0.2}
                    roughness={0.2}
                />
            </mesh>
        </RigidBody>
    );
}

function FloatyBody({ shape, collider, position, size, color, maps }: BodyConfig & { maps: MaterialMaps }) {
    const bodyRef = useRef<RapierRigidBody | null>(null);

    useFrame(() => {
        if (!bodyRef.current) {
            return;
        }

        const { x, y, z } = bodyRef.current.translation();
        const impulseScale = 0.015;
        bodyRef.current.applyImpulse(
            { x: -x * impulseScale, y: -y * impulseScale, z: -z * impulseScale },
            true,
        );
    });

    return (
        <RigidBody
            ref={bodyRef}
            position={position}
            linearDamping={1.5}
            angularDamping={1.2}
            colliders={collider}
        >
            <mesh>
                {shape === "sphere" ? (
                    <sphereGeometry args={[size * 0.55, 32, 32]} />
                ) : null}
                {shape === "box" ? <boxGeometry args={[size, size, size]} /> : null}
                {shape === "icosa" ? <icosahedronGeometry args={[size * 0.65, 0]} /> : null}
                {shape === "torus" ? <torusGeometry args={[size * 0.5, size * 0.18, 18, 64]} /> : null}
                <meshStandardMaterial
                    color={color}
                    metalness={0.65}
                    roughness={0.2}
                    emissive={color}
                    emissiveIntensity={0.15}
                    map={maps.map}
                    normalMap={maps.normalMap}
                    roughnessMap={maps.roughnessMap}
                    emissiveMap={maps.emissiveMap}
                />
            </mesh>
        </RigidBody>
    );
}

export function EnginePage() {
    return (
        <FullscreenCanvasLayout showDebugBorder>
            <EngineScene />
        </FullscreenCanvasLayout>
    );
}

function EngineScene() {
    const maps = useTexture({
        map: "/assets/kenny/development-essentials/Checkerboard/checkerboard.png",
        normalMap: "/assets/kenny/development-essentials/NormalMap/default-normal.png",
        roughnessMap: "/assets/kenny/development-essentials/Noise/perlin-noise.png",
        emissiveMap: "/assets/kenny/development-essentials/Gradient/gradient-radial.png",
    }) as MaterialMaps;

    useEffect(() => {
        maps.map.colorSpace = THREE.SRGBColorSpace;
        maps.emissiveMap.colorSpace = THREE.SRGBColorSpace;

        for (const texture of [maps.map, maps.normalMap, maps.roughnessMap, maps.emissiveMap]) {
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(2, 2);
        }
    }, [maps]);

    const bodies = useMemo<BodyConfig[]>(() => {
        const shapes: BodyShape[] = ["sphere", "box", "icosa", "torus"];
        const palette = ["#5eead4", "#60a5fa", "#818cf8", "#f472b6", "#f97316", "#facc15"];
        const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

        return Array.from({ length: 70 }).map((_, index) => {
            const shape = shapes[index % shapes.length];
            const size = randomBetween(0.6, 1.1);
            const collider = shape === "sphere" ? "ball" : shape === "box" ? "cuboid" : "hull";

            return {
                id: `body-${index}`,
                shape,
                collider,
                size,
                color: palette[index % palette.length],
                position: [
                    randomBetween(-6.5, 6.5),
                    randomBetween(-4.5, 4.5),
                    randomBetween(-6.5, 6.5),
                ],
            } satisfies BodyConfig;
        });
    }, []);

    return (
        <>
            <color attach="background" args={["#030712"]} />
            <ambientLight intensity={0.4} />
            <directionalLight position={[6, 7, 6]} intensity={1.1} />
            <pointLight position={[-6, -4, -6]} intensity={0.6} color="#60a5fa" />
            <Stars radius={80} depth={40} count={900} factor={4} saturation={0} fade speed={1} />
            <Environment preset="night" />
            <OrbitControls enablePan={false} maxDistance={18} minDistance={4} />
            <Physics gravity={[0, 0, 0]}>
                <MouseBall emissiveMap={maps.emissiveMap} />
                {bodies.map((body) => (
                    <FloatyBody key={body.id} {...body} maps={maps} />
                ))}
            </Physics>
        </>
    );
}
