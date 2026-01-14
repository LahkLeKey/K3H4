import { Suspense, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls, Stars } from "@react-three/drei";

import { SectionCard } from "../shell/section-card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";

export type FantasyRpgModuleProps = {
    userEmail?: string | null;
};

type HeroState = {
    name: string;
    level: number;
    xp: number;
    nextLevelXp: number;
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    gold: number;
    skillPoints: number;
};

type Enemy = {
    id: string;
    name: string;
    tier: "feral" | "cursed" | "elite";
    hp: number;
    maxHp: number;
    attack: number;
    rewardXp: number;
    rewardGold: number;
    focus: "blades" | "arcane" | "wilds";
    alive: boolean;
};

type SkillNode = {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    cost: number;
};

type Quest = {
    id: string;
    title: string;
    detail: string;
    target: number;
    progress: number;
    status: "active" | "ready" | "turned-in";
    rewardXp: number;
    rewardGold: number;
    tag: Enemy["focus"] | "any";
};

type CombatLog = { id: string; text: string; tone?: "good" | "warn" | "bad" };

const initialHero: HeroState = {
    name: "Arin of Verdantia",
    level: 1,
    xp: 0,
    nextLevelXp: 120,
    hp: 36,
    maxHp: 36,
    energy: 18,
    maxEnergy: 18,
    gold: 12,
    skillPoints: 1,
};

const baseEnemies: Enemy[] = [
    {
        id: "spriggan-scout",
        name: "Spriggan Scout",
        tier: "feral",
        hp: 26,
        maxHp: 26,
        attack: 7,
        rewardXp: 40,
        rewardGold: 8,
        focus: "wilds",
        alive: true,
    },
    {
        id: "gloom-cultist",
        name: "Gloom Cultist",
        tier: "cursed",
        hp: 34,
        maxHp: 34,
        attack: 9,
        rewardXp: 60,
        rewardGold: 10,
        focus: "arcane",
        alive: true,
    },
    {
        id: "obsidian-sentinel",
        name: "Obsidian Sentinel",
        tier: "elite",
        hp: 46,
        maxHp: 46,
        attack: 12,
        rewardXp: 90,
        rewardGold: 15,
        focus: "blades",
        alive: true,
    },
];

const baseSkills: SkillNode[] = [
    {
        id: "blade-dance",
        name: "Blade Dance",
        description: "+3 strike power and higher crits against blade foes.",
        unlocked: false,
        cost: 1,
    },
    {
        id: "wardens-heart",
        name: "Warden's Heart",
        description: "Take 15% less retaliation and heal 6 on victory.",
        unlocked: false,
        cost: 1,
    },
    {
        id: "starcaller",
        name: "Starcaller",
        description: "+8% crit chance; refund 3 energy on crits.",
        unlocked: false,
        cost: 1,
    },
];

const baseQuests: Quest[] = [
    {
        id: "clear-thickets",
        title: "Clear the Thickets",
        detail: "Cull the wild spirits that choke Verdantia's trade road.",
        target: 2,
        progress: 0,
        status: "active",
        rewardXp: 80,
        rewardGold: 12,
        tag: "wilds",
    },
    {
        id: "snuff-the-rites",
        title: "Snuff the Rites",
        detail: "Break the cultists weaving stormlight into the valley.",
        target: 1,
        progress: 0,
        status: "active",
        rewardXp: 110,
        rewardGold: 16,
        tag: "arcane",
    },
    {
        id: "wake-the-ward",
        title: "Wake the Ward",
        detail: "Gather gold to repair the stone ward that shields Verdantia's gate.",
        target: 35,
        progress: 12,
        status: "active",
        rewardXp: 90,
        rewardGold: 0,
        tag: "any",
    },
];

function capLog(log: CombatLog[], entry: CombatLog, limit = 16) {
    const next = [entry, ...log];
    return next.slice(0, limit);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function enemyColor(tier: Enemy["tier"]) {
    switch (tier) {
        case "feral":
            return "#22c55e";
        case "cursed":
            return "#6366f1";
        case "elite":
            return "#f97316";
        default:
            return "#e5e7eb";
    }
}

function focusIcon(focus: Enemy["focus"]) {
    if (focus === "arcane") return "✦";
    if (focus === "blades") return "⚔";
    return "❧";
}

export function FantasyRpgModule({ userEmail }: FantasyRpgModuleProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);

    useLayoutEffect(() => {
        const recompute = () => {
            const top = containerRef.current?.getBoundingClientRect().top ?? 0;
            const padding = 8;
            const height = Math.max(600, window.innerHeight - top - padding);
            setViewportHeight(height);
        };
        recompute();
        window.addEventListener("resize", recompute);
        return () => window.removeEventListener("resize", recompute);
    }, []);

    const [encounterTier, setEncounterTier] = useState(1);
    const spawnEnemies = (tier: number) => baseEnemies.map((enemy, index) => ({
        ...enemy,
        hp: Math.round(enemy.maxHp * (1 + 0.12 * tier + 0.04 * index)),
        maxHp: Math.round(enemy.maxHp * (1 + 0.12 * tier + 0.04 * index)),
        attack: Math.round(enemy.attack * (1 + 0.08 * tier)),
        alive: true,
    }));

    const [hero, setHero] = useState<HeroState>(initialHero);
    const [enemies, setEnemies] = useState<Enemy[]>(() => spawnEnemies(encounterTier));
    const [skills, setSkills] = useState<SkillNode[]>(baseSkills);
    const [quests, setQuests] = useState<Quest[]>(baseQuests);
    const [log, setLog] = useState<CombatLog[]>([
        {
            id: "intro",
            text: "Verdantia's ward is dim. The road is overrun. Strike, gather shards, and relight the gate.",
        },
    ]);
    const [selectedEnemy, setSelectedEnemy] = useState<string>(baseEnemies[0].id);
    const [wardCharge, setWardCharge] = useState(20);

    const prevAliveRef = useRef(enemies.filter((enemy) => enemy.alive).length);

    const unlocked = useMemo(() => new Set(skills.filter((skill) => skill.unlocked).map((skill) => skill.id)), [skills]);
    const currentEnemy = enemies.find((enemy) => enemy.id === selectedEnemy && enemy.alive) ?? enemies.find((enemy) => enemy.alive) ?? enemies[0];
    const heroCritChance = 0.12 + (unlocked.has("starcaller") ? 0.08 : 0);

    const cycleEnemy = (direction: 1 | -1) => {
        const alive = enemies.filter((enemy) => enemy.alive);
        if (alive.length === 0) return;
        const currentIndex = alive.findIndex((enemy) => enemy.id === currentEnemy?.id);
        const nextIndex = currentIndex === -1 ? 0 : (currentIndex + direction + alive.length) % alive.length;
        setSelectedEnemy(alive[nextIndex].id);
    };

    function updateHeroAfterXpGain(nextHero: HeroState) {
        const heroCopy = { ...nextHero };
        while (heroCopy.xp >= heroCopy.nextLevelXp) {
            heroCopy.xp -= heroCopy.nextLevelXp;
            heroCopy.level += 1;
            heroCopy.skillPoints += 1;
            heroCopy.maxHp += 8;
            heroCopy.maxEnergy += 4;
            heroCopy.hp = heroCopy.maxHp;
            heroCopy.energy = heroCopy.maxEnergy;
            heroCopy.nextLevelXp = Math.round(heroCopy.nextLevelXp * 1.25);
        }
        return heroCopy;
    }

    useEffect(() => {
        const alive = enemies.find((enemy) => enemy.id === selectedEnemy && enemy.alive);
        if (!alive) {
            const fallback = enemies.find((enemy) => enemy.alive);
            if (fallback) setSelectedEnemy(fallback.id);
        }
    }, [enemies, selectedEnemy]);

    useEffect(() => {
        const aliveCount = enemies.filter((enemy) => enemy.alive).length;
        if (aliveCount === 0 && prevAliveRef.current !== 0) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "All foes down. The ward drinks in their shards." }));
            setWardCharge((prev) => clamp(prev + 15, 0, 100));
        }
        prevAliveRef.current = aliveCount;
    }, [enemies]);

    function handleAttack(enemyId: string) {
        const foe = enemies.find((enemy) => enemy.id === enemyId && enemy.alive);
        if (!foe) return;
        if (hero.energy < 4) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Too winded to strike.", tone: "warn" }));
            return;
        }

        const crit = Math.random() < heroCritChance;
        const base = 6 + hero.level * 1.8 + (unlocked.has("blade-dance") && foe.focus === "blades" ? 3 : 0);
        const variance = 0.8 + Math.random() * 0.45;
        const damage = Math.round(base * variance * (crit ? 1.9 : 1));
        const mitigator = unlocked.has("wardens-heart") ? 0.85 : 1;
        const retaliation = Math.round(foe.attack * (0.65 + Math.random() * 0.5) * mitigator);

        setEnemies((prev) => prev.map((enemy) => enemy.id === foe.id ? { ...enemy, hp: clamp(enemy.hp - damage, 0, enemy.maxHp), alive: clamp(enemy.hp - damage, 0, enemy.maxHp) > 0 } : enemy));
        setHero((prev) => ({
            ...prev,
            hp: clamp(prev.hp - retaliation, 0, prev.maxHp),
            energy: clamp(prev.energy - 4, 0, prev.maxEnergy),
        }));
        setLog((prev) => capLog(prev, {
            id: crypto.randomUUID(),
            text: `${crit ? "Critical " : ""}hit on ${foe.name}: ${damage} dmg; retaliation ${retaliation}.`,
            tone: crit ? "good" : undefined,
        }));

        // Resolve victory
        setTimeout(() => {
            setEnemies((prev) => prev.map((enemy) => enemy.id === foe.id ? { ...enemy, hp: clamp(enemy.hp, 0, enemy.maxHp), alive: enemy.hp > 0 } : enemy));
            const defeated = foe.hp - damage <= 0;
            if (!defeated) return;

            setHero((prev) => {
                const energyRefund = crit && unlocked.has("starcaller") ? 3 : 0;
                const healing = unlocked.has("wardens-heart") ? 6 : 0;
                const heroRewarded = updateHeroAfterXpGain({
                    ...prev,
                    xp: prev.xp + foe.rewardXp,
                    gold: prev.gold + foe.rewardGold,
                    hp: clamp(prev.hp + healing, 0, prev.maxHp),
                    energy: clamp(prev.energy + energyRefund, 0, prev.maxEnergy),
                });
                return heroRewarded;
            });
            setWardCharge((prev) => clamp(prev + 10, 0, 100));

            setQuests((prev) => prev.map((quest) => {
                if (quest.status === "turned-in") return quest;
                const matches = quest.tag === "any" || quest.tag === foe.focus;
                const progress = matches ? clamp(quest.progress + 1, 0, quest.target) : quest.progress;
                const status = progress >= quest.target ? "ready" : quest.status;
                const extraGold = quest.id === "wake-the-ward" ? foe.rewardGold : 0;
                return { ...quest, progress, status, rewardGold: quest.rewardGold + extraGold };
            }));

            setLog((prev) => capLog(prev, {
                id: crypto.randomUUID(),
                text: `Defeated ${foe.name}! +${foe.rewardXp} xp, +${foe.rewardGold} gold.`,
                tone: "good",
            }));
        }, 80);
    }

    function handleWardBurst() {
        const alive = enemies.filter((enemy) => enemy.alive);
        if (alive.length === 0) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "No targets remain to engulf." }));
            return;
        }
        if (hero.energy < 8) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "You need more energy to channel the ward.", tone: "warn" }));
            return;
        }
        const crit = Math.random() < 0.18;
        const defeated: Enemy[] = [];
        setEnemies((prev) => prev.map((enemy, index) => {
            if (!enemy.alive) return enemy;
            const base = 9 + hero.level * 2.4 + (unlocked.has("blade-dance") && enemy.focus === "blades" ? 3 : 0);
            const variance = 0.85 + Math.random() * 0.55 + index * 0.05;
            const damage = Math.round(base * variance * (crit ? 1.4 : 1));
            const hp = clamp(enemy.hp - damage, 0, enemy.maxHp);
            const aliveAfter = hp > 0;
            if (!aliveAfter) defeated.push(enemy);
            return { ...enemy, hp, alive: aliveAfter };
        }));

        const totalXp = defeated.reduce((sum, foe) => sum + foe.rewardXp, 0);
        const totalGold = defeated.reduce((sum, foe) => sum + foe.rewardGold, 0);

        setHero((prev) => updateHeroAfterXpGain({
            ...prev,
            xp: prev.xp + totalXp,
            gold: prev.gold + totalGold,
            energy: clamp(prev.energy - 8, 0, prev.maxEnergy),
            hp: clamp(prev.hp - Math.round(prev.maxHp * 0.08), 0, prev.maxHp),
        }));

        if (defeated.length > 0) {
            setQuests((prev) => prev.map((quest) => {
                if (quest.status === "turned-in") return quest;
                const killsForQuest = defeated.filter((foe) => quest.tag === "any" || quest.tag === foe.focus).length;
                const progress = clamp(quest.progress + killsForQuest, 0, quest.target);
                const status = progress >= quest.target ? "ready" : quest.status;
                return { ...quest, progress, status };
            }));
            setWardCharge((prev) => clamp(prev + 5 * defeated.length, 0, 100));
        }

        setLog((prev) => capLog(prev, {
            id: crypto.randomUUID(),
            text: `Ward burst ripples outward${crit ? " (empowered)" : ""}. ${defeated.length} foes shattered.`,
            tone: defeated.length > 0 ? "good" : undefined,
        }));
    }

    function handleRelightWard() {
        if (wardCharge < 40) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Not enough ward charge yet.", tone: "warn" }));
            return;
        }
        setWardCharge((prev) => clamp(prev - 40, 0, 100));
        setHero((prev) => ({
            ...prev,
            hp: clamp(prev.hp + Math.round(prev.maxHp * 0.5), 0, prev.maxHp),
            energy: clamp(prev.energy + Math.round(prev.maxEnergy * 0.7), 0, prev.maxEnergy),
        }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "The gate flares—vitality floods back.", tone: "good" }));
    }

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "1") {
                event.preventDefault();
                if (currentEnemy) handleAttack(currentEnemy.id);
            } else if (event.key === "2") {
                event.preventDefault();
                handleRest();
            } else if (event.key === "3") {
                event.preventDefault();
                handleWardBurst();
            } else if (event.key === "4") {
                event.preventDefault();
                handleRelightWard();
            } else if (event.key === "5") {
                event.preventDefault();
                resetEncounter();
            } else if (event.key === "q" || event.key === "Q") {
                event.preventDefault();
                cycleEnemy(-1);
            } else if (event.key === "e" || event.key === "E") {
                event.preventDefault();
                cycleEnemy(1);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [currentEnemy, handleAttack, handleRest, handleWardBurst, handleRelightWard, resetEncounter, cycleEnemy]);

    function handleRest() {
        setHero((prev) => ({
            ...prev,
            hp: clamp(prev.hp + Math.round(prev.maxHp * 0.35), 0, prev.maxHp),
            energy: clamp(prev.energy + Math.round(prev.maxEnergy * 0.6), 0, prev.maxEnergy),
        }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "You catch your breath beneath the warded lanterns.", tone: "good" }));
    }

    function resetEncounter() {
        setEncounterTier((prev) => prev + 1);
        setEnemies(spawnEnemies(encounterTier + 1));
        const next = spawnEnemies(encounterTier + 1);
        setSelectedEnemy(next[0].id);
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "New foes converge from the mists." }));
    }

    function handleTurnIn(questId: string) {
        const quest = quests.find((q) => q.id === questId);
        if (!quest || quest.status !== "ready") return;
        setQuests((prev) => prev.map((q) => q.id === questId ? { ...q, status: "turned-in" } : q));
        setHero((prev) => updateHeroAfterXpGain({
            ...prev,
            xp: prev.xp + quest.rewardXp,
            gold: prev.gold + quest.rewardGold,
        }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Quest complete: ${quest.title}. Rewards banked.`, tone: "good" }));
    }

    function unlockSkill(skillId: string) {
        if (hero.skillPoints <= 0) return;
        const skill = skills.find((node) => node.id === skillId);
        if (!skill || skill.unlocked) return;
        setSkills((prev) => prev.map((node) => node.id === skillId ? { ...node, unlocked: true } : node));
        setHero((prev) => ({ ...prev, skillPoints: prev.skillPoints - 1 }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `${skill.name} etched into your weave.`, tone: "good" }));
    }

    const aliveCount = enemies.filter((enemy) => enemy.alive).length;
    const storyline = "Verdantia was built atop a slumbering wyrm-heart. As its ward dims, wild spirits break through."
        + " The city needs shards from fallen foes to rekindle the gate before the caravans halt.";

    return (
        <div className="w-full px-3 sm:px-4 lg:px-6">
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
                style={viewportHeight ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` } : undefined}
            >
                <Canvas camera={{ position: [10, 8, 10], fov: 48 }} shadows>
                    <color attach="background" args={["#050712"]} />
                    <hemisphereLight intensity={0.7} color="#e0f2fe" groundColor="#0b1224" />
                    <directionalLight position={[5, 10, 5]} intensity={1.25} castShadow shadow-mapSize-width={1024} shadow-mapSize-height={1024} />
                    <Suspense fallback={<Html center className="text-sm text-muted-foreground">Summoning Verdantia…</Html>}>
                        <Stars radius={42} depth={20} count={650} factor={3} saturation={0.2} fade />
                        <RiftChamber />
                        <HeroAvatar color="#38bdf8" hp={hero.hp} maxHp={hero.maxHp} />
                        {enemies.map((enemy, index) => (
                            <EnemyShard
                                key={enemy.id}
                                enemy={enemy}
                                index={index}
                                selected={enemy.id === currentEnemy?.id}
                            />
                        ))}
                        <OrbitControls enablePan={false} maxDistance={16} minDistance={6} target={[0, 0.8, 0]} />
                    </Suspense>

                    <Html fullscreen wrapperClass="pointer-events-none">
                        <div className="pointer-events-none absolute inset-0 flex flex-col gap-3 p-3 sm:p-4 lg:p-6">
                            <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 rounded-2xl border bg-background/85 px-3 py-2 text-xs font-semibold shadow">
                                <Badge variant="outline">Story</Badge>
                                <p className="text-sm text-muted-foreground">{storyline}</p>
                                <Badge variant="secondary">Tier {encounterTier}</Badge>
                                <Badge variant="outline">User: {userEmail ?? "guest"}</Badge>
                            </div>

                            <div className="pointer-events-auto mx-auto flex w-full max-w-6xl flex-1 min-h-0 flex-col gap-3 lg:flex-row">
                                <div className="flex-1 space-y-3 min-h-0">
                                    <SectionCard className="space-y-3 bg-background/85">
                                        <div className="flex flex-wrap items-center gap-3">
                                            <div>
                                                <div className="text-xs uppercase tracking-wide text-muted-foreground">Warden</div>
                                                <div className="text-lg font-semibold">{hero.name}</div>
                                            </div>
                                            <Badge variant="outline">HP {hero.hp}/{hero.maxHp}</Badge>
                                            <Badge variant="outline">Energy {hero.energy}/{hero.maxEnergy}</Badge>
                                            <Badge variant="secondary">Gold {hero.gold}</Badge>
                                            <Badge variant="outline">Ward {wardCharge}%</Badge>
                                            <Badge variant="outline">Foes {aliveCount}</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="space-y-1">
                                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                    <span>XP</span>
                                                    <span>{hero.xp} / {hero.nextLevelXp}</span>
                                                </div>
                                                <Progress value={Math.min(100, (hero.xp / hero.nextLevelXp) * 100)} />
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                                                <div className="rounded-lg border bg-muted/40 px-3 py-2">Skill points: {hero.skillPoints}</div>
                                                <div className="rounded-lg border bg-muted/40 px-3 py-2">Current foe: {currentEnemy?.name ?? "None"}</div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {enemies.map((enemy) => (
                                                <Button
                                                    key={enemy.id}
                                                    variant={enemy.id === currentEnemy?.id ? "default" : "outline"}
                                                    size="sm"
                                                    onClick={() => setSelectedEnemy(enemy.id)}
                                                    disabled={!enemy.alive}
                                                >
                                                    {enemy.name}
                                                </Button>
                                            ))}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <Button onClick={() => currentEnemy && handleAttack(currentEnemy.id)} disabled={!currentEnemy}>
                                                Attack
                                            </Button>
                                            <Button variant="secondary" onClick={handleRest}>Rest</Button>
                                            <Button variant="outline" onClick={handleWardBurst}>Ward burst</Button>
                                            <Button variant="outline" onClick={handleRelightWard}>Relight ward</Button>
                                            <Button variant="ghost" onClick={resetEncounter}>New encounter</Button>
                                        </div>
                                    </SectionCard>

                                    <SectionCard className="space-y-3 bg-background/85">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-xs uppercase tracking-wide text-muted-foreground">Combat log</p>
                                                <p className="text-sm text-muted-foreground">Latest encounters and quest events.</p>
                                            </div>
                                            <Badge variant="secondary">Level {hero.level}</Badge>
                                        </div>
                                        <ScrollArea className="max-h-48 rounded-xl border bg-muted/50">
                                            <div className="space-y-2 p-3">
                                                {log.map((entry) => (
                                                    <div key={entry.id} className={cn("rounded-lg border px-3 py-2 text-sm", entry.tone === "good" && "border-green-500/50 bg-green-500/10", entry.tone === "warn" && "border-amber-500/60 bg-amber-500/10", entry.tone === "bad" && "border-red-500/50 bg-red-500/10")}>
                                                        {entry.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </SectionCard>
                                </div>

                                <div className="w-full space-y-3 min-h-0 lg:w-[380px]">
                                    <SectionCard className="space-y-3 bg-background/85">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm font-semibold">Quests</div>
                                                <p className="text-xs text-muted-foreground">Track goals and turn in for XP and gold.</p>
                                            </div>
                                            <Badge variant="outline">Story beat</Badge>
                                        </div>
                                        <div className="space-y-3">
                                            {quests.map((quest) => (
                                                <div key={quest.id} className="rounded-xl border bg-muted/40 p-3">
                                                    <div className="flex items-start justify-between gap-2">
                                                        <div className="space-y-1">
                                                            <div className="text-sm font-semibold">{quest.title}</div>
                                                            <p className="text-xs text-muted-foreground">{quest.detail}</p>
                                                        </div>
                                                        <Badge variant={quest.status === "turned-in" ? "secondary" : quest.status === "ready" ? "default" : "outline"}>
                                                            {quest.status === "turned-in" ? "Turned in" : quest.status === "ready" ? "Ready" : "Active"}
                                                        </Badge>
                                                    </div>
                                                    <div className="mt-2 space-y-1">
                                                        <Progress value={Math.min(100, (quest.progress / quest.target) * 100)} />
                                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                                            <span>{quest.progress} / {quest.target} {quest.tag === "any" ? "any foes" : `${quest.tag} foes`}</span>
                                                            <span>+{quest.rewardXp} xp / +{quest.rewardGold}g</span>
                                                        </div>
                                                    </div>
                                                    <div className="mt-2 flex flex-wrap gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setSelectedEnemy(quest.tag === "any" ? currentEnemy?.id ?? enemies[0].id : enemies.find((enemy) => enemy.focus === quest.tag && enemy.alive)?.id ?? selectedEnemy)}>
                                                            Hunt target
                                                        </Button>
                                                        <Button size="sm" disabled={quest.status !== "ready"} onClick={() => handleTurnIn(quest.id)}>
                                                            Turn in
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </SectionCard>

                                    <SectionCard className="space-y-3 bg-background/85">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="text-sm font-semibold">Skill tree</div>
                                                <p className="text-xs text-muted-foreground">Spend points earned from leveling.</p>
                                            </div>
                                            <Badge variant="outline">{hero.skillPoints} points</Badge>
                                        </div>
                                        <div className="grid gap-2 md:grid-cols-2">
                                            {skills.map((skill) => (
                                                <div key={skill.id} className={cn("rounded-xl border p-3", skill.unlocked ? "border-primary/60 bg-primary/5" : "bg-muted/40")}>
                                                    <div className="text-sm font-semibold">{skill.name}</div>
                                                    <p className="text-xs text-muted-foreground">{skill.description}</p>
                                                    <Button
                                                        size="sm"
                                                        className="mt-2"
                                                        variant={skill.unlocked ? "secondary" : "outline"}
                                                        disabled={skill.unlocked || hero.skillPoints <= 0}
                                                        onClick={() => unlockSkill(skill.id)}
                                                    >
                                                        {skill.unlocked ? "Unlocked" : `Unlock (-${skill.cost})`}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    </SectionCard>
                                </div>
                            </div>
                        </div>
                    </Html>
                </Canvas>
            </div>
        </div>
    );
}

function RiftChamber() {
    return (
        <group>
            <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
                <planeGeometry args={[32, 32]} />
                <meshStandardMaterial color="#0f172a" roughness={0.9} metalness={0.05} />
            </mesh>
            <Float speed={1.4} rotationIntensity={0.2} floatIntensity={0.6} position={[0, 0.2, 0]}>
                <mesh castShadow>
                    <torusGeometry args={[1.6, 0.18, 32, 64]} />
                    <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} metalness={0.2} roughness={0.3} />
                </mesh>
                <Html center position={[0, 0.08, 0]} className="pointer-events-none select-none">
                    <div className="rounded-full bg-background/80 px-3 py-1 text-xs font-semibold shadow">Verdantia Gate</div>
                </Html>
            </Float>
        </group>
    );
}

function HeroAvatar({ color, hp, maxHp }: { color: string; hp: number; maxHp: number; }) {
    const pulse = clamp(hp / maxHp, 0.2, 1);
    return (
        <group position={[0, 0.4, 0]}>
            <Float speed={2} rotationIntensity={0.6} floatIntensity={0.5}>
                <mesh castShadow>
                    <dodecahedronGeometry args={[0.8, 0]} />
                    <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35 + (1 - pulse) * 0.3} roughness={0.2} metalness={0.25} />
                </mesh>
            </Float>
            <Html center position={[0, -0.6, 0]} className="pointer-events-none select-none">
                <div className="flex items-center gap-2 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow">
                    <span>Warden</span>
                    <span className="text-primary">{Math.round(pulse * 100)}%</span>
                </div>
            </Html>
        </group>
    );
}

function EnemyShard({ enemy, index, selected }: { enemy: Enemy; index: number; selected: boolean; }) {
    const distance = 4.8 + index * 1.8;
    const angle = (index / 3) * Math.PI * 2 + 0.6;
    const position: [number, number, number] = [Math.cos(angle) * distance, 0.6, Math.sin(angle) * distance];
    const color = enemyColor(enemy.tier);
    return (
        <group position={position}>
            <Float speed={1.1 + index * 0.2} rotationIntensity={0.5} floatIntensity={1.1}>
                <mesh castShadow>
                    <icosahedronGeometry args={[0.75, 0]} />
                    <meshStandardMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={selected ? 0.65 : 0.4}
                        transparent
                        opacity={enemy.alive ? 1 : 0.25}
                    />
                </mesh>
                <Html center position={[0, 1, 0]} className="pointer-events-none select-none">
                    <div className="rounded-lg bg-background/85 px-3 py-1 text-xs font-semibold shadow">
                        {enemy.name} {focusIcon(enemy.focus)}
                    </div>
                    <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-foreground/20">
                        <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }}
                        />
                    </div>
                </Html>
            </Float>
        </group>
    );
}
