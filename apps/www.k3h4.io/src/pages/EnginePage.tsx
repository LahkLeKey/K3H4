import { Environment, OrbitControls, Stars, useGLTF, useTexture } from "@react-three/drei";
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
    maps: MaterialMaps;
};

type MaterialMaps = {
    map: THREE.Texture;
    normalMap: THREE.Texture;
    roughnessMap: THREE.Texture;
    emissiveMap: THREE.Texture;
};

type BrickConfig = {
    id: string;
    url: string;
    position: [number, number, number];
    rotation: [number, number, number];
    scale: number;
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

function FloatyBody({ shape, collider, position, size, color, maps }: BodyConfig) {
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

function BrickBody({ url, position, rotation, scale }: BrickConfig) {
    const bodyRef = useRef<RapierRigidBody | null>(null);
    const { scene } = useGLTF(url);
    const model = useMemo(() => scene.clone(true), [scene]);

    useFrame(() => {
        if (!bodyRef.current) {
            return;
        }

        const { x, y, z } = bodyRef.current.translation();
        const impulseScale = 0.01;
        bodyRef.current.applyImpulse(
            { x: -x * impulseScale, y: -y * impulseScale, z: -z * impulseScale },
            true,
        );
    });

    return (
        <RigidBody
            ref={bodyRef}
            position={position}
            rotation={rotation}
            linearDamping={1.4}
            angularDamping={1.1}
            colliders="hull"
        >
            <primitive object={model} scale={scale} />
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
    const textures = useTexture({
        checkerboard: "/assets/kenny/development-essentials/Checkerboard/checkerboard.png",
        checkerboardTransparent: "/assets/kenny/development-essentials/Checkerboard/checkerboard-transparent.png",
        gradientAngular: "/assets/kenny/development-essentials/Gradient/gradient-angular.png",
        gradientHorizontal: "/assets/kenny/development-essentials/Gradient/gradient-horizontal.png",
        gradientHorizontalMirror: "/assets/kenny/development-essentials/Gradient/gradient-horizontal-mirror.png",
        gradientRadial: "/assets/kenny/development-essentials/Gradient/gradient-radial.png",
        gradientVertical: "/assets/kenny/development-essentials/Gradient/gradient-vertical.png",
        gradientVerticalMirror: "/assets/kenny/development-essentials/Gradient/gradient-vertical-mirror.png",
        noisePerlin: "/assets/kenny/development-essentials/Noise/perlin-noise.png",
        noisePerlinSmall: "/assets/kenny/development-essentials/Noise/perlin-noise-small.png",
        defaultNormal: "/assets/kenny/development-essentials/NormalMap/default-normal.png",
        uvTexture: "/assets/kenny/development-essentials/UVTexture/uv-texture.png",
        pixelBlack1: "/assets/kenny/development-essentials/1x1Pixels/pixel-black.png",
        pixelWhite1: "/assets/kenny/development-essentials/1x1Pixels/pixel-white.png",
        pixelTransparent1: "/assets/kenny/development-essentials/1x1Pixels/pixel-transparent.png",
        pixelBlack4: "/assets/kenny/development-essentials/4x4Pixels/pixel-black.png",
        pixelWhite4: "/assets/kenny/development-essentials/4x4Pixels/pixel-white.png",
        pixelTransparent4: "/assets/kenny/development-essentials/4x4Pixels/pixel-transparent.png",
    }) as Record<string, THREE.Texture>;

    const textureEntries = useMemo(
        () => [
            { id: "checkerboard", texture: textures.checkerboard, transparent: false },
            { id: "checkerboardTransparent", texture: textures.checkerboardTransparent, transparent: true },
            { id: "gradientAngular", texture: textures.gradientAngular, transparent: false },
            { id: "gradientHorizontal", texture: textures.gradientHorizontal, transparent: false },
            { id: "gradientHorizontalMirror", texture: textures.gradientHorizontalMirror, transparent: false },
            { id: "gradientRadial", texture: textures.gradientRadial, transparent: false },
            { id: "gradientVertical", texture: textures.gradientVertical, transparent: false },
            { id: "gradientVerticalMirror", texture: textures.gradientVerticalMirror, transparent: false },
            { id: "noisePerlin", texture: textures.noisePerlin, transparent: false },
            { id: "noisePerlinSmall", texture: textures.noisePerlinSmall, transparent: false },
            { id: "defaultNormal", texture: textures.defaultNormal, transparent: false },
            { id: "uvTexture", texture: textures.uvTexture, transparent: false },
            { id: "pixelBlack1", texture: textures.pixelBlack1, transparent: false },
            { id: "pixelWhite1", texture: textures.pixelWhite1, transparent: false },
            { id: "pixelTransparent1", texture: textures.pixelTransparent1, transparent: true },
            { id: "pixelBlack4", texture: textures.pixelBlack4, transparent: false },
            { id: "pixelWhite4", texture: textures.pixelWhite4, transparent: false },
            { id: "pixelTransparent4", texture: textures.pixelTransparent4, transparent: true },
        ],
        [textures],
    );

    useEffect(() => {
        for (const entry of textureEntries) {
            const { texture } = entry;
            texture.colorSpace = entry.id === "defaultNormal" ? THREE.NoColorSpace : THREE.SRGBColorSpace;
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            const repeat = entry.id.startsWith("pixel") ? 8 : 2;
            texture.repeat.set(repeat, repeat);
        }
    }, [textureEntries]);

    const bodyMaps = useMemo(() => {
        const colorMaps = [
            textures.checkerboard,
            textures.checkerboardTransparent,
            textures.gradientAngular,
            textures.gradientHorizontal,
            textures.gradientHorizontalMirror,
            textures.gradientRadial,
            textures.gradientVertical,
            textures.gradientVerticalMirror,
            textures.uvTexture,
            textures.pixelBlack1,
            textures.pixelWhite1,
            textures.pixelTransparent1,
            textures.pixelBlack4,
            textures.pixelWhite4,
            textures.pixelTransparent4,
            textures.noisePerlin,
            textures.noisePerlinSmall,
        ];
        const emissiveMaps = [
            textures.gradientRadial,
            textures.gradientAngular,
            textures.gradientVertical,
            textures.gradientHorizontal,
        ];
        const roughnessMaps = [textures.noisePerlin, textures.noisePerlinSmall, textures.checkerboard];

        return {
            colorMaps,
            emissiveMaps,
            roughnessMaps,
            normalMap: textures.defaultNormal,
        };
    }, [textures]);

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
                maps: {
                    map: bodyMaps.colorMaps[index % bodyMaps.colorMaps.length],
                    normalMap: bodyMaps.normalMap,
                    roughnessMap: bodyMaps.roughnessMaps[index % bodyMaps.roughnessMaps.length],
                    emissiveMap: bodyMaps.emissiveMaps[index % bodyMaps.emissiveMaps.length],
                },
                position: [
                    randomBetween(-6.5, 6.5),
                    randomBetween(-4.5, 4.5),
                    randomBetween(-6.5, 6.5),
                ],
            } satisfies BodyConfig;
        });
    }, [bodyMaps]);

    const brickBodies = useMemo<BrickConfig[]>(() => {
        const urls = [
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-hq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/bevel-lq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-hq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/none-lq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-hq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/round-lq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-hq-plate-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-corner.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-2x3.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-3x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-3x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-corner-inside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-corner-inside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-corner-outside-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-corner-outside-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-inverted-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-brick-slope-inverted-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x1-round.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x1.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-1x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-2x2.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-2x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-2x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-2x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-4x4.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-4x6.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-4x8.glb",
            "/assets/kenny/brick-kit/Models/GLBFormat/square-lq-plate-corner.glb",
        ];

        return urls.map((url, index) => {
            const angle = (index / urls.length) * Math.PI * 2;
            const radius = 7.5;

            return {
                id: `brick-${index}`,
                url,
                scale: 2,
                rotation: [0, angle, 0],
                position: [Math.cos(angle) * radius, 0.5 + (index % 3) * 0.7, Math.sin(angle) * radius],
            } satisfies BrickConfig;
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
            <group position={[0, 3.5, -10]}>
                {textureEntries.map((entry, index) => {
                    const columns = 6;
                    const spacing = 1.5;
                    const col = index % columns;
                    const row = Math.floor(index / columns);
                    const x = (col - (columns - 1) / 2) * spacing;
                    const y = (1 - row) * spacing;

                    return (
                        <mesh key={entry.id} position={[x, y, 0]}>
                            <planeGeometry args={[1.1, 1.1]} />
                            <meshBasicMaterial map={entry.texture} transparent={entry.transparent} />
                        </mesh>
                    );
                })}
            </group>
            <Physics gravity={[0, 0, 0]}>
                <MouseBall emissiveMap={textures.gradientRadial} />
                {brickBodies.map((brick) => (
                    <BrickBody key={brick.id} {...brick} />
                ))}
                {bodies.map((body) => (
                    <FloatyBody key={body.id} {...body} />
                ))}
            </Physics>
        </>
    );
}
