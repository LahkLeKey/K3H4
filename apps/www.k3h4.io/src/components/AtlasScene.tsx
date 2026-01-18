import { OrbitControls, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { Alert3D, Button3D, Card3D, Panel3D } from "./ui/3d";
import { useAtlasState } from "../state/atlas";
import type { AtlasContext } from "../data/atlas";

type CameraRigProps = { target: AtlasContext };

function CameraRig({ target }: CameraRigProps) {
    const desired = useRef({
        position: new THREE.Vector3(...target.camera.position),
        look: new THREE.Vector3(...target.camera.target),
    });

    useMemo(() => {
        desired.current.position.set(...target.camera.position);
        desired.current.look.set(...target.camera.target);
    }, [target.camera.position, target.camera.target]);

    useFrame(({ camera }, delta) => {
        const lerpFactor = 1 - Math.pow(0.001, delta);
        camera.position.lerp(desired.current.position, lerpFactor);
        camera.lookAt(desired.current.look);
        camera.updateProjectionMatrix();
    });

    return null;
}

type ContextNodeProps = {
    context: AtlasContext;
    active: boolean;
    onSelect: () => void;
};

function ContextNode({ context, active, onSelect }: ContextNodeProps) {
    const accent = useMemo(() => new THREE.Color(context.accent), [context.accent]);
    const lift = context.anchor[1];

    return (
        <group position={[context.anchor[0], 0, context.anchor[2]]}>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.02, 0]}>
                <ringGeometry args={[0.5, 1.15, 64]} />
                <meshStandardMaterial
                    color={accent}
                    emissive={accent}
                    emissiveIntensity={active ? 0.5 : 0.28}
                    roughness={0.8}
                    metalness={0.2}
                    transparent
                    opacity={0.45}
                />
            </mesh>

            <mesh position={[0, lift * 0.5, 0]} castShadow>
                <cylinderGeometry args={[0.14, 0.14, lift + 0.24, 18]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.55 : 0.35} metalness={0.35} roughness={0.3} />
            </mesh>

            <mesh position={[0, lift + 0.52, 0]} rotation={[Math.PI / 2.2, 0, 0]} castShadow>
                <torusKnotGeometry args={[0.38, 0.12, 96, 16]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={active ? 0.75 : 0.4} metalness={0.55} roughness={0.22} />
            </mesh>

            <Button3D position={[context.anchor[0], lift + 1.2, context.anchor[2]]} accent={context.accent} onClick={onSelect}>
                {context.glyph ? `${context.glyph} ${context.name}` : context.name}
            </Button3D>

            {active ? (
                <Card3D position={[context.anchor[0], lift + 2.3, context.anchor[2]]} width={360} eyebrow="Active context" title={context.name}>
                    <div className="flex flex-col gap-2 text-sm text-slate-100">
                        <p className="text-slate-200/90">{context.summary}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
                            {context.metrics.slice(0, 3).map((metric) => (
                                <div key={metric.label} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                                    <div className="text-[10px] uppercase tracking-[0.2em] text-slate-400">{metric.label}</div>
                                    <div className="text-sm font-semibold text-white">{metric.value}</div>
                                    {metric.delta ? <div className="text-[11px] text-emerald-200">{metric.delta}</div> : null}
                                </div>
                            ))}
                        </div>
                    </div>
                </Card3D>
            ) : null}
        </group>
    );
}

function GroundPlane() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, -0.06, 0]}>
            <planeGeometry args={[80, 80, 12, 12]} />
            <meshStandardMaterial color="#0b1020" roughness={0.95} metalness={0.05} opacity={0.8} transparent />
        </mesh>
    );
}

export function AtlasScene() {
    const { contexts, activeContext, setActiveId } = useAtlasState();

    return (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-950 via-slate-950/70 to-slate-950">
            <Canvas shadows camera={{ position: activeContext.camera.position, fov: 44 }} dpr={[1, 1.8]}>
                <color attach="background" args={[activeContext.environment.background]} />
                <fog attach="fog" args={[activeContext.environment.fog.color, activeContext.environment.fog.near, activeContext.environment.fog.far]} />

                <ambientLight intensity={0.25} />
                <hemisphereLight intensity={activeContext.environment.lights.fill.intensity} color={activeContext.environment.lights.fill.color} groundColor="#0b1220" position={activeContext.environment.lights.fill.position} />
                <directionalLight
                    position={activeContext.environment.lights.key.position}
                    intensity={activeContext.environment.lights.key.intensity}
                    castShadow
                    shadow-mapSize={[1024, 1024]}
                    color={activeContext.environment.lights.key.color}
                />
                <pointLight position={activeContext.environment.lights.rim.position} intensity={activeContext.environment.lights.rim.intensity} color={activeContext.environment.lights.rim.color} />

                <GroundPlane />

                {contexts.map((ctx) => (
                    <ContextNode key={ctx.id} context={ctx} active={ctx.id === activeContext.id} onSelect={() => setActiveId(ctx.id)} />
                ))}

                <Panel3D position={[activeContext.anchor[0], activeContext.anchor[1] + 1.6, activeContext.anchor[2] + 1.2]} width={320} title="HUD is live" accent={activeContext.accent}>
                    <div className="flex flex-col gap-1 text-xs text-slate-200">
                        <span>{activeContext.summary}</span>
                        <span className="text-slate-400">Workspace stays mounted while you move the camera.</span>
                    </div>
                </Panel3D>

                <Alert3D
                    position={[activeContext.anchor[0], activeContext.anchor[1] + 3.4, activeContext.anchor[2]]}
                    width={320}
                    title="Atlas field"
                    description="Use the HUD to travel, open the map, or pin a workspace tab."
                    tone="info"
                />

                <Stars radius={60} depth={40} count={5000} factor={4} saturation={0.85} fade speed={0.6} />
                <CameraRig target={activeContext} />
                <OrbitControls enablePan={false} enableRotate enableZoom minDistance={7} maxDistance={18} minPolarAngle={0.6} maxPolarAngle={1.4} />
            </Canvas>
        </div>
    );
}
