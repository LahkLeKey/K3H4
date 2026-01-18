import { Float, Grid, OrbitControls, PerspectiveCamera, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function CoreMonolith() {
    const meshRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (meshRef.current) {
            meshRef.current.rotation.y = t * 0.2;
        }
    });

    return (
        <mesh ref={meshRef} position={[0, 1.2, 0]} castShadow>
            <boxGeometry args={[1.2, 2.4, 1.2]} />
            <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.5} metalness={0.4} roughness={0.25} />
        </mesh>
    );
}

function OrbitingRings() {
    const ringRef = useRef<THREE.Mesh>(null);
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (ringRef.current) {
            ringRef.current.rotation.x = Math.sin(t * 0.35) * 0.4;
            ringRef.current.rotation.z = Math.cos(t * 0.3) * 0.4;
        }
    });

    return (
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[2.4, 0.05, 48, 96]} />
            <meshStandardMaterial color="#a5b4fc" emissive="#a5b4fc" emissiveIntensity={0.35} metalness={0.6} roughness={0.35} />
        </mesh>
    );
}

function FloatingBits() {
    const groupRef = useRef<THREE.Group>(null);
    useFrame(({ clock }) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = clock.getElapsedTime() * 0.15;
        }
    });

    const seed = Array.from({ length: 36 }, (_, i) => i);
    return (
        <group ref={groupRef}>
            {seed.map((i) => (
                <mesh key={i} position={[(Math.random() - 0.5) * 10, Math.random() * 3 + 0.4, (Math.random() - 0.5) * 10]} scale={0.14 + Math.random() * 0.1}>
                    <octahedronGeometry args={[1, 0]} />
                    <meshStandardMaterial color="#e0f2fe" emissive="#e0f2fe" emissiveIntensity={0.4} metalness={0.3} roughness={0.25} />
                </mesh>
            ))}
        </group>
    );
}

function FloorGrid() {
    return (
        <>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <circleGeometry args={[22, 64]} />
                <meshStandardMaterial color="#0b1224" emissive="#0b1224" emissiveIntensity={0.6} />
            </mesh>
            <Grid args={[40, 40]} position={[0, 0.01, 0]} cellColor="#1e293b" sectionColor="#334155" infiniteGrid fadeDistance={24} fadeStrength={4} />
        </>
    );
}

export function AuthenticatedScene() {
    return (
        <>
            <PerspectiveCamera makeDefault position={[0, 4, 9]} fov={52} />
            <color attach="background" args={["#050910"]} />
            <fog attach="fog" args={["#050910", 16, 42]} />

            <ambientLight intensity={0.55} />
            <directionalLight position={[6, 9, 6]} intensity={1.1} color="#7dd3fc" castShadow shadow-mapSize={[1024, 1024]} />
            <pointLight position={[-7, 5, -6]} intensity={0.6} color="#cbd5ff" />

            <Stars radius={70} depth={28} count={3800} factor={2.4} fade speed={0.3} saturation={0.9} />

            <Float floatIntensity={0.35} speed={1.1} rotationIntensity={0.25}>
                <CoreMonolith />
            </Float>
            <OrbitingRings />
            <FloatingBits />
            <FloorGrid />

            <OrbitControls enablePan={false} enableZoom minDistance={6} maxDistance={14} minPolarAngle={0.4} maxPolarAngle={1.4} />
        </>
    );
}
