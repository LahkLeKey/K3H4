import { Float, Grid, Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import type { ReactNode } from "react";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

export type IndustryModuleKey =
    | "bank"
    | "persona"
    | "agency"
    | "freight"
    | "warehouse"
    | "pos"
    | "agriculture"
    | "culinary"
    | "graphics"
    | "arcade"
    | "rpg"
    | "laplace";

export type WorldNode = {
    key: IndustryModuleKey;
    label: string;
    description: string;
    position: [number, number, number];
    accent: string;
    glyph?: string;
    marker?: ReactNode;
    environment?: WorldEnvironment;
    hudChips?: HudChip[];
};

export type HudChip = {
    label: string;
    value: string;
    tone?: "neutral" | "info" | "positive" | "warning";
};

export type WorldEnvironment = {
    background: string;
    fog: { color: string; near: number; far: number };
    keyLight: { color: string; intensity: number; position?: [number, number, number] };
    fillLight?: { color: string; intensity: number; position?: [number, number, number] };
    rimLight?: { color: string; intensity: number; position?: [number, number, number] };
    grid?: { cell: string; section: string };
};

const defaultEnvironment: WorldEnvironment = {
    background: "#05070d",
    fog: { color: "#05070d", near: 10, far: 46 },
    keyLight: { color: "#b8fff0", intensity: 1.1, position: [6, 10, 8] },
    fillLight: { color: "#72a8ff", intensity: 0.55, position: [-6, 4, -4] },
    rimLight: { color: "#72f0d0", intensity: 0.4, position: [0, 8, -6] },
    grid: { cell: "#1b2a41", section: "#27405f" },
};

type ImmersiveWorldProps = {
    nodes: WorldNode[];
    activeKey: IndustryModuleKey;
    onSelect: (key: IndustryModuleKey) => void;
};

export function ImmersiveWorld({ nodes, activeKey, onSelect }: ImmersiveWorldProps) {
    const activeNode = useMemo(() => nodes.find((node) => node.key === activeKey) ?? nodes[0], [activeKey, nodes]);
    const targetPosition = useMemo(() => new THREE.Vector3(...(activeNode?.position ?? [0, 2.4, 8])), [activeNode?.position]);
    const lookTarget = useMemo(() => new THREE.Vector3(0, 1.25, 0), []);
    const activeEnvironment = useMemo(() => activeNode?.environment ?? defaultEnvironment, [activeNode?.environment]);
    const backgroundTarget = useMemo(() => new THREE.Color(activeEnvironment.background), [activeEnvironment.background]);
    const fogTarget = useMemo(() => new THREE.Color(activeEnvironment.fog.color), [activeEnvironment.fog.color]);
    const keyLightTarget = useMemo(() => new THREE.Color(activeEnvironment.keyLight.color), [activeEnvironment.keyLight.color]);
    const fillLightTarget = useMemo(
        () => new THREE.Color(activeEnvironment.fillLight?.color ?? defaultEnvironment.fillLight?.color ?? "#72a8ff"),
        [activeEnvironment.fillLight?.color],
    );
    const rimLightTarget = useMemo(
        () => new THREE.Color(activeEnvironment.rimLight?.color ?? defaultEnvironment.rimLight?.color ?? "#72f0d0"),
        [activeEnvironment.rimLight?.color],
    );
    const cameraState = useRef({
        pos: new THREE.Vector3(targetPosition.x + 4, targetPosition.y + 2, targetPosition.z + 4),
        look: new THREE.Vector3().copy(lookTarget),
    });
    const directionalRef = useRef<THREE.DirectionalLight>(null);
    const hemiRef = useRef<THREE.HemisphereLight>(null);
    const rimRef = useRef<THREE.PointLight>(null);
    const backgroundColor = useMemo(() => new THREE.Color(defaultEnvironment.background), []);
    const fogColor = useMemo(() => new THREE.Color(defaultEnvironment.fog.color), []);
    const [reduceMotion, setReduceMotion] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setReduceMotion(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia("(max-width: 768px)");
        const update = () => setIsMobile(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);

    // Smooth camera glide toward the next context anchor to maintain the single-scene illusion.
    useFrame(({ camera, scene }, delta) => {
        const damp = THREE.MathUtils.damp;
        const travelLambda = reduceMotion ? 5 : 3;
        const lookLambda = reduceMotion ? 6 : 3.4;
        const offset = isMobile ? 3.5 : 4.5;
        cameraState.current.pos.x = damp(cameraState.current.pos.x, targetPosition.x + offset, travelLambda, delta);
        cameraState.current.pos.y = damp(cameraState.current.pos.y, Math.max(targetPosition.y + (isMobile ? 1.4 : 2), 1.2), travelLambda, delta);
        cameraState.current.pos.z = damp(cameraState.current.pos.z, targetPosition.z + offset, travelLambda, delta);
        cameraState.current.look.x = damp(cameraState.current.look.x, lookTarget.x, lookLambda, delta);
        cameraState.current.look.y = damp(cameraState.current.look.y, lookTarget.y, lookLambda, delta);
        cameraState.current.look.z = damp(cameraState.current.look.z, lookTarget.z, lookLambda, delta);

        camera.position.copy(cameraState.current.pos);
        camera.lookAt(cameraState.current.look);

        // Ease lighting and atmosphere toward the active accent to make context shifts feel in-world.
        if (directionalRef.current) {
            directionalRef.current.color.lerp(keyLightTarget, delta * 0.85);
            directionalRef.current.intensity = damp(
                directionalRef.current.intensity,
                activeEnvironment.keyLight.intensity,
                reduceMotion ? 6 : 2.6,
                delta,
            );
            if (activeEnvironment.keyLight.position) {
                directionalRef.current.position.set(...activeEnvironment.keyLight.position);
            }
        }
        if (hemiRef.current) {
            hemiRef.current.color.lerp(fillLightTarget, delta * 0.6);
            hemiRef.current.intensity = damp(
                hemiRef.current.intensity,
                activeEnvironment.fillLight?.intensity ?? defaultEnvironment.fillLight!.intensity,
                reduceMotion ? 6 : 2.4,
                delta,
            );
        }
        if (rimRef.current) {
            rimRef.current.color.lerp(rimLightTarget, delta * 0.5);
            rimRef.current.intensity = damp(
                rimRef.current.intensity,
                activeEnvironment.rimLight?.intensity ?? defaultEnvironment.rimLight!.intensity,
                reduceMotion ? 6 : 2.4,
                delta,
            );
            if (activeEnvironment.rimLight?.position) {
                rimRef.current.position.set(...activeEnvironment.rimLight.position);
            }
        }

        if (scene.background instanceof THREE.Color) {
            scene.background.lerpColors(backgroundColor, backgroundTarget, reduceMotion ? 0.08 : 0.18);
        }
        if (scene.fog instanceof THREE.Fog) {
            scene.fog.color.lerpColors(fogColor, fogTarget, reduceMotion ? 0.1 : 0.22);
            scene.fog.near = damp(scene.fog.near, activeEnvironment.fog.near, reduceMotion ? 6 : 3, delta);
            scene.fog.far = damp(scene.fog.far, activeEnvironment.fog.far, reduceMotion ? 6 : 3, delta);
        }
    });

    return (
        <div className="fixed inset-0 -z-10 bg-slate-950">
            <Suspense fallback={<WorldLoader />}>
                <Canvas shadows camera={{ position: isMobile ? [5, 3, 10] : [6, 4, 12], fov: isMobile ? 46 : 42 }}>
                    <color attach="background" args={[activeEnvironment.background]} />
                    <fog attach="fog" args={[activeEnvironment.fog.color, activeEnvironment.fog.near, activeEnvironment.fog.far]} />

                    <hemisphereLight ref={hemiRef} intensity={activeEnvironment.fillLight?.intensity ?? 0.6} groundColor="#0b1220" color={activeEnvironment.fillLight?.color ?? "#a7c4ff"} />
                    <directionalLight ref={directionalRef} position={activeEnvironment.keyLight.position ?? [6, 10, 8]} intensity={activeEnvironment.keyLight.intensity} castShadow shadow-mapSize={[1024, 1024]} />
                    <pointLight ref={rimRef} position={activeEnvironment.rimLight?.position ?? [0, 6, -4]} intensity={activeEnvironment.rimLight?.intensity ?? 0.4} color={activeEnvironment.rimLight?.color ?? "#72f0d0"} />

                    <Grid
                        args={[100, 100]}
                        cellSize={0.9}
                        cellThickness={0.5}
                        cellColor={activeEnvironment.grid?.cell ?? defaultEnvironment.grid!.cell}
                        sectionSize={6}
                        sectionThickness={1.2}
                        sectionColor={activeEnvironment.grid?.section ?? defaultEnvironment.grid!.section}
                        infiniteGrid
                        fadeDistance={24}
                        fadeStrength={4}
                        position={[0, 0, 0]}
                    />

                    {nodes.map((node) => (
                        <ContextPortal key={node.key} node={node} active={node.key === activeKey} onSelect={onSelect} />
                    ))}

                    <Stars radius={50} depth={40} count={9000} factor={6} fade speed={0.6} saturation={0.8} />
                    <OrbitControls
                        enablePan={false}
                        enableZoom
                        minDistance={isMobile ? 8 : 7}
                        maxDistance={isMobile ? 14 : 16}
                        minPolarAngle={0.65}
                        maxPolarAngle={1.35}
                        enableRotate={!reduceMotion}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

type ContextPortalProps = {
    node: WorldNode;
    active: boolean;
    onSelect: (key: IndustryModuleKey) => void;
};

function ContextPortal({ node, active, onSelect }: ContextPortalProps) {
    const accent = node.accent;
    const indicatorHeight = node.position[1] + 1.6;
    return (
        <Float speed={active ? 2 : 1.2} floatIntensity={active ? 1.4 : 0.6} rotationIntensity={0.2}>
            <mesh
                position={node.position}
                onClick={() => onSelect(node.key)}
                castShadow
                receiveShadow
            >
                <torusKnotGeometry args={[0.6, 0.18, 128, 16]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.6 : 0.28} metalness={0.65} roughness={0.25} />
            </mesh>
            <Html
                position={[node.position[0], indicatorHeight + 0.4, node.position[2]]}
                center
                transform
                distanceFactor={6}
                className="select-none"
            >
                <button
                    type="button"
                    onClick={() => onSelect(node.key)}
                    className="group rounded-full border border-white/10 bg-slate-900/70 px-4 py-2 text-left text-xs font-semibold text-slate-50 shadow-lg backdrop-blur hover:border-white/30"
                >
                    <div className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
                        <span className="text-[11px] uppercase tracking-[0.22em] text-slate-300">{node.glyph ? `${node.glyph} ${node.label}` : node.label}</span>
                    </div>
                    <p className="mt-1 max-w-[240px] text-[11px] text-slate-300/90">{node.description}</p>
                </button>
            </Html>
        </Float>
    );
}

function WorldLoader() {
    return (
        <div className="absolute inset-0 grid place-items-center bg-slate-950">
            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-100 shadow-lg backdrop-blur">
                <span className="h-2.5 w-2.5 animate-ping rounded-full bg-emerald-300" />
                <span>Loading immersive world…</span>
            </div>
        </div>
    );
}
