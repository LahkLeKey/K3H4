import { useEffect, useMemo, useRef } from "react";
import { Html, ContactShadows } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

import { COIN_HEIGHT } from "./bank-constants";
import { useBankStore } from "./bank-store";
import { useCoinMaterials } from "./use-coin-material";

function DroppingCoin({ index, baseY, geometry, materials }: { index: number; baseY: number; geometry: THREE.CylinderGeometry; materials: THREE.Material[] }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const delay = useMemo(() => Math.random() * 0.6, []);
    const rotationOffset = useMemo(() => Math.random() * Math.PI * 2, []);
    const startY = baseY + 2 + index * 0.05;
    const targetY = baseY + index * COIN_HEIGHT + COIN_HEIGHT / 2 + 0.05;
    const dropDuration = 1.2;
    const burstState = useRef({ key: -1, t0: 0 });

    const { perfLimited, burstStackId, burstToken } = useBankStore((state) => ({
        perfLimited: state.perfLimited,
        burstStackId: state.burstStackId,
        burstToken: state.burstToken,
    }));

    const active = useRef(false);
    useEffect(() => {
        active.current = true;
    }, []);

    useFrame((state) => {
        const elapsed = Math.max(0, state.clock.getElapsedTime() - delay);
        const progress = Math.min(1, elapsed / dropDuration);
        const ease = 1 - Math.pow(1 - progress, 3);
        const wobble = (1 - progress) * 0.02 * Math.sin(elapsed * 6);

        const currentBurstKey = burstStackId ? burstToken : 0;
        if (currentBurstKey !== burstState.current.key && burstStackId) {
            burstState.current = { key: currentBurstKey, t0: state.clock.getElapsedTime() };
        }

        const burstElapsed = state.clock.getElapsedTime() - burstState.current.t0;
        const burstPhase = Math.max(0, Math.min(1, burstElapsed / 0.9));
        const burstLift = burstStackId ? Math.sin(burstPhase * Math.PI) * (0.5 + 0.06 * index) * (1 - burstPhase) : 0;

        const y = startY * (1 - ease) + targetY * ease + wobble + burstLift;
        if (meshRef.current) {
            meshRef.current.position.y = y;

            const idleSpin = state.clock.getElapsedTime() * 0.12;
            const burstSpin = burstStackId ? burstPhase * Math.PI * 0.9 : 0;
            meshRef.current.rotation.y = rotationOffset + idleSpin + ease * Math.PI * 0.35 + burstLift * 0.6 + burstSpin;
        }
    });

    return <mesh ref={meshRef} position={[0, startY, 0]} castShadow={!perfLimited} receiveShadow geometry={geometry} material={materials} />;
}

export function CoinStacksLayer() {
    const coinMaterials = useCoinMaterials();
    const coinGeometry = useMemo(() => new THREE.CylinderGeometry(0.35, 0.35, COIN_HEIGHT, 48, 1, false), []);

    useEffect(() => () => coinGeometry.dispose(), [coinGeometry]);

    const { stacks, hoveredId, setHovered, triggerBurst, perfLimited } = useBankStore((state) => ({
        stacks: state.coinStacks,
        hoveredId: state.hoveredId,
        setHovered: state.setHovered,
        triggerBurst: state.triggerBurst,
        perfLimited: state.perfLimited,
    }));

    return (
        <group>
            {stacks.map((stack) => {
                const ringColor = stack.direction === "credit" ? "#16a34a" : stack.direction === "debit" ? "#f97316" : "#94a3b8";
                return (
                    <group
                        key={stack.id}
                        position={[stack.position[0], 0, stack.position[2]]}
                        onPointerOver={(event) => {
                            event.stopPropagation();
                            setHovered(stack.id);
                        }}
                        onPointerOut={(event) => {
                            event.stopPropagation();
                            setHovered(null);
                        }}
                        onClick={(event) => {
                            event.stopPropagation();
                            triggerBurst(stack.id);
                        }}
                    >
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, stack.baseY + 0.001, 0]} receiveShadow>
                            <circleGeometry args={[0.62, 48]} />
                            <meshStandardMaterial color={`${ringColor}55`} transparent roughness={0.6} metalness={0.2} />
                        </mesh>
                        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, stack.baseY + 0.002, 0]} receiveShadow castShadow={!perfLimited}>
                            <torusGeometry args={[0.62, 0.02, 24, 64]} />
                            <meshStandardMaterial
                                color={ringColor}
                                emissive={ringColor}
                                emissiveIntensity={hoveredId === stack.id ? 0.8 : 0.25}
                                metalness={0.6}
                                roughness={0.2}
                            />
                        </mesh>
                        {Array.from({ length: stack.coins }).map((_, coinIndex) => (
                            <DroppingCoin key={`${stack.id}-coin-${coinIndex}`} index={coinIndex} baseY={stack.baseY} geometry={coinGeometry} materials={coinMaterials.materials} />
                        ))}
                        {hoveredId === stack.id ? (
                            <Html center style={{ pointerEvents: "none" }}>
                                <div className="rounded-md border border-slate-200 bg-white/95 px-3 py-2 text-xs text-slate-900 shadow-xl backdrop-blur">
                                    <p className="font-semibold">{stack.direction === "credit" ? "+" : "-"}{stack.amount.toFixed(2)}</p>
                                    <p className="text-[11px] text-slate-600">{stack.note || "No note"}</p>
                                    <p className="text-[11px] text-slate-500">Bal {stack.balanceAfter.toFixed(2)}</p>
                                </div>
                            </Html>
                        ) : null}
                    </group>
                );
            })}
            {perfLimited ? null : <ContactShadows position={[0, -0.02, 0]} opacity={0.32} width={24} height={24} blur={2.4} far={12} />}
        </group>
    );
}
