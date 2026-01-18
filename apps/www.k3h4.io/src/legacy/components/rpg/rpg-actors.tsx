import { Html, OrbitControls, Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useMemo } from "react";
import { enemyColor, type Enemy, type GearItem, type HeroState } from "./use-fantasy-rpg";

export function focusIcon(focus: Enemy["focus"]) {
    if (focus === "blades") return "⚔";
    if (focus === "arcane") return "✦";
    if (focus === "wilds") return "❋";
    return "◇";
}

export function focusAccent(focus: Enemy["focus"]) {
    if (focus === "blades") return "bg-rose-500/40 border-rose-500/40";
    if (focus === "arcane") return "bg-indigo-500/40 border-indigo-500/40";
    if (focus === "wilds") return "bg-emerald-500/40 border-emerald-500/40";
    return "bg-slate-500/30 border-slate-500/40";
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function RiftChamber({
    hero,
    enemies,
    selectedEnemy,
    onSelectEnemy,
    heroCritChance,
    gearBag,
}: {
    hero: HeroState;
    enemies: Enemy[];
    selectedEnemy?: Enemy;
    onSelectEnemy?: (id: string) => void;
    heroCritChance: number;
    gearBag: GearItem[];
}) {
    const hoverTitle = useMemo(() => {
        const weapon = hero.gear.weapon?.name ?? "Bare focus";
        const charm = hero.gear.charm?.name ?? "No charm";
        return `${weapon} / ${charm} — Crit ${(heroCritChance * 100).toFixed(0)}%`;
    }, [hero.gear.charm?.name, hero.gear.weapon?.name, heroCritChance]);

    return (
        <Canvas camera={{ position: [0, 2.8, 6], fov: 50 }} className="rounded-2xl shadow-2xl border border-slate-800/80 bg-slate-950/60">
            <color attach="background" args={["#0b1220"]} />
            <fog attach="fog" args={["#0b1220", 8, 16]} />
            <Stars radius={42} depth={20} count={650} factor={3} saturation={0.2} fade />
            <hemisphereLight color="#9cc2ff" groundColor="#080a14" intensity={0.65} />
            <directionalLight position={[5, 8, 4]} intensity={1.2} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
            <pointLight position={[-4, 2, 2]} intensity={0.4} color="#7dd3fc" />
            <ambientLight intensity={0.35} />
            <OrbitControls enablePan={false} maxDistance={9} minDistance={4.5} enableDamping dampingFactor={0.18} />
            <HeroAvatar hero={hero} hoverTitle={hoverTitle} />
            {enemies.map((enemy, index) => (
                <EnemyShard
                    key={enemy.id}
                    enemy={enemy}
                    index={index}
                    selected={selectedEnemy?.id === enemy.id}
                    onSelectEnemy={onSelectEnemy}
                    gearBag={gearBag}
                />
            ))}
            <mesh receiveShadow rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
                <circleGeometry args={[6, 48]} />
                <meshStandardMaterial color="#0f172a" roughness={0.65} metalness={0.1} />
            </mesh>
        </Canvas>
    );
}

function HumanoidModel({ tint, glow, pose }: { tint: string; glow: string; pose?: "ready" | "cast" }) {
    return (
        <group rotation={[0, Math.PI / 9, 0]}>
            <mesh castShadow position={[0, 1, 0]}>
                <cylinderGeometry args={[0.28, 0.32, 1.8, 7]} />
                <meshStandardMaterial color={tint} metalness={0.2} roughness={0.7} emissive={glow} emissiveIntensity={0.2} />
            </mesh>
            <mesh castShadow position={[0, 2, 0]}>
                <sphereGeometry args={[0.32, 12, 12]} />
                <meshStandardMaterial color={tint} metalness={0.15} roughness={0.75} emissive={glow} emissiveIntensity={0.18} />
            </mesh>
            <mesh castShadow position={[pose === "cast" ? 0.5 : 0.4, 1.4, 0]} rotation={[0, 0, 0.4]}>
                <cylinderGeometry args={[0.08, 0.12, 0.9, 6]} />
                <meshStandardMaterial color={tint} emissive={glow} emissiveIntensity={0.18} roughness={0.6} />
            </mesh>
            <mesh castShadow position={[-0.4, 1.2, 0]} rotation={[0, 0, -0.4]}>
                <cylinderGeometry args={[0.08, 0.12, 0.9, 6]} />
                <meshStandardMaterial color={tint} emissive={glow} emissiveIntensity={0.18} roughness={0.6} />
            </mesh>
        </group>
    );
}

function HeroAvatar({ hero, hoverTitle }: { hero: HeroState; hoverTitle: string }) {
    const hpRatio = hero.hp / hero.maxHp;
    const energyRatio = hero.energy / hero.maxEnergy;
    return (
        <group position={[-2, 0, 0]}>
            <HumanoidModel tint="#93c5fd" glow="#3b82f6" pose="cast" />
            <Html position={[0, 2.7, 0]} center>
                <div className="text-center text-xs text-slate-200/80 backdrop-blur-sm px-3 py-2 rounded-full border border-slate-700/80 bg-slate-900/70 shadow-lg" title={hoverTitle}>
                    <div className="font-semibold text-slate-100">{hero.name}</div>
                    <div className="grid grid-cols-2 gap-2 mt-1">
                        <div className="flex items-center gap-1"><span className="text-red-300">♥</span><span>{hero.hp}/{hero.maxHp}</span></div>
                        <div className="flex items-center gap-1"><span className="text-sky-300">✹</span><span>{hero.energy}/{hero.maxEnergy}</span></div>
                    </div>
                    <div className="flex gap-1 mt-1">
                        <span className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden"><span style={{ width: `${hpRatio * 100}%` }} className="block h-full bg-gradient-to-r from-rose-400 to-amber-300" /></span>
                        <span className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden"><span style={{ width: `${energyRatio * 100}%` }} className="block h-full bg-gradient-to-r from-sky-400 to-cyan-300" /></span>
                    </div>
                </div>
            </Html>
        </group>
    );
}

function EnemyShard({ enemy, selected, onSelectEnemy, index, gearBag }: { enemy: Enemy; selected: boolean; onSelectEnemy?: (id: string) => void; index: number; gearBag: GearItem[] }) {
    const tint = enemyColor(enemy.tier);
    const gearHint = useMemo(() => gearBag.find((g) => g.focus === enemy.focus)?.name, [enemy.focus, gearBag]);
    const shimmer = selected ? 0.4 : 0.12;
    const hpRatio = enemy.hp / enemy.maxHp;
    const shieldRatio = enemy.shield ? enemy.shield / (enemy.shield + enemy.maxHp) : 0;
    return (
        <group position={[1.4 + index * 1.6, 0, -0.2]} onClick={() => onSelectEnemy?.(enemy.id)}>
            <HumanoidModel tint={tint} glow={selected ? tint : "#0ea5e9"} pose="ready" />
            <mesh position={[0, 0.6, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.5, 0.7, 24]} />
                <meshStandardMaterial color={tint} transparent opacity={0.4} emissive={tint} emissiveIntensity={shimmer} />
            </mesh>
            <Html position={[0, 2.6, 0]} center className="select-none" distanceFactor={1.2} transform>
                <div className={`min-w-[200px] px-3 py-2 rounded-xl border shadow-xl ${selected ? "border-amber-300/80 bg-white/95" : "border-slate-300 bg-white/92"}`}>
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-900 font-semibold flex items-center gap-1">
                            <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full border ${selected ? "border-amber-300" : "border-slate-300"} text-xs bg-slate-100`}>{focusIcon(enemy.focus)}</span>
                            <span>{enemy.name}</span>
                        </div>
                        <span className={`text-[10px] px-2 py-1 rounded-full uppercase tracking-wide ${enemy.boss ? "bg-amber-100 text-amber-700 border border-amber-300" : "bg-slate-100 text-slate-700 border border-slate-200"}`}>{enemy.boss ? "Boss" : enemy.tier}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-1 mt-1 text-[10px] text-slate-700">
                        <div>HP {enemy.hp}/{enemy.maxHp}</div>
                        <div>ATK {enemy.attack}</div>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden mt-1">
                        <div style={{ width: `${hpRatio * 100}%` }} className="h-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-200" />
                        {enemy.shield ? (
                            <div style={{ width: `${clamp(shieldRatio * 100, 0, 100)}%` }} className="h-full bg-cyan-300/60 -mt-2" />
                        ) : null}
                    </div>
                    {gearHint ? <div className="mt-1 text-[10px] text-cyan-700">Tip: {gearHint} hums near this foe.</div> : null}
                </div>
            </Html>
        </group>
    );
}
