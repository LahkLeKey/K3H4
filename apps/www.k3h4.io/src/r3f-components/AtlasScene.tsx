import { Float, OrbitControls, PerspectiveCamera, Sparkles, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function LogoCore() {
    return (
        <mesh castShadow>
            <icosahedronGeometry args={[1.1, 0]} />
            <meshStandardMaterial color="#7dd3fc" emissive="#7dd3fc" emissiveIntensity={0.8} roughness={0.2} metalness={0.35} />
        </mesh>
    );
}

function HaloRing() {
    const ringRef = useRef<THREE.Mesh>(null);

    useFrame(({ clock }) => {
        if (!ringRef.current) return;
        const t = clock.getElapsedTime();
        ringRef.current.rotation.x = Math.sin(t * 0.4) * 0.4;
        ringRef.current.rotation.z = Math.cos(t * 0.35) * 0.4;
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.6, 0.08, 48, 96]} />
            <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.45} roughness={0.35} metalness={0.6} />
        </mesh>
    );
}

function FloatingShards() {
    const groupRef = useRef<THREE.Group>(null);
    const shards = useMemo(() => {
        const seed = Array.from({ length: 24 }, (_, i) => i);
        return seed.map((i) => ({
            id: `shard-${i}`,
            position: new THREE.Vector3((Math.random() - 0.5) * 8, Math.random() * 3 + 0.5, (Math.random() - 0.5) * 8),
            rotation: new THREE.Euler(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI),
            scale: 0.12 + Math.random() * 0.25,
        }));
    }, []);

    useFrame(({ clock }) => {
        if (!groupRef.current) return;
        const t = clock.getElapsedTime();
        groupRef.current.rotation.y = t * 0.05;
    });

    return (
        <group ref={groupRef}>
            {shards.map((shard) => (
                <mesh key={shard.id} position={shard.position} rotation={shard.rotation} scale={shard.scale}>
                    <tetrahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.55} roughness={0.15} metalness={0.45} />
                </mesh>
            ))}
        </group>
    );
}

function FloorGlow() {
    return (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
            <circleGeometry args={[18, 72]} />
            <meshStandardMaterial color="#0f172a" emissive="#0f172a" emissiveIntensity={0.6} transparent opacity={0.9} />
        </mesh>
    );
}

export function AtlasScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 5.2, 11]} fov={48} />

            <ambientLight intensity={0.5} />
            <directionalLight position={[6, 10, 6]} intensity={1.4} color="#7dd3fc" castShadow shadow-mapSize={[1024, 1024]} />
            <pointLight position={[-8, 6, -6]} intensity={0.6} color="#a5b4fc" />

            <Stars radius={72} depth={32} count={5200} factor={3.1} saturation={0.8} fade speed={0.4} />
            <Sparkles count={90} scale={[26, 12, 26]} size={1.2} speed={0.8} opacity={0.25} color="#93c5fd" />

            <Float floatIntensity={0.35} speed={1.2} rotationIntensity={0.25}>
                <LogoCore />
            </Float>
            <HaloRing />
            <FloatingShards />
            <FloorGlow />

            <OrbitControls
                enablePan={false}
                enableZoom
                enableRotate
                minDistance={7}
                maxDistance={16}
                minPolarAngle={0.5}
                maxPolarAngle={1.45}
            />
        </>
    );
}
