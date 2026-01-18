import { useEffect, useMemo, useRef, useState } from "react";

export type Rarity = "common" | "rare" | "epic" | "legendary";
export type GearItem = {
    id: string;
    name: string;
    slot: "weapon" | "charm";
    rarity: Rarity;
    attackBonus?: number;
    critBonus?: number;
    wardBonus?: number;
    description: string;
    focus?: Enemy["focus"];
};

export type HeroState = {
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
    gear: {
        weapon?: GearItem;
        charm?: GearItem;
    };
};

export type Enemy = {
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
    boss?: boolean;
    shield?: number;
};

export type SkillNode = {
    id: string;
    name: string;
    description: string;
    unlocked: boolean;
    cost: number;
};

export type Quest = {
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

export type CombatLog = { id: string; text: string; tone?: "good" | "warn" | "bad" };

export type ShopItem = {
    id: string;
    name: string;
    description: string;
    cost: number;
    effect: "heal" | "energize" | "burst";
};

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
    gear: {},
};

const baseEnemies: Enemy[] = [
    { id: "spriggan-scout", name: "Spriggan Scout", tier: "feral", hp: 26, maxHp: 26, attack: 7, rewardXp: 40, rewardGold: 8, focus: "wilds", alive: true },
    { id: "gloom-cultist", name: "Gloom Cultist", tier: "cursed", hp: 34, maxHp: 34, attack: 9, rewardXp: 60, rewardGold: 10, focus: "arcane", alive: true },
    { id: "obsidian-sentinel", name: "Obsidian Sentinel", tier: "elite", hp: 46, maxHp: 46, attack: 12, rewardXp: 90, rewardGold: 15, focus: "blades", alive: true },
];

const bossTemplates: Enemy[] = [
    { id: "verdant-warden", name: "Verdant Warden", tier: "elite", hp: 180, maxHp: 180, attack: 18, rewardXp: 200, rewardGold: 60, focus: "wilds", alive: true, boss: true, shield: 40 },
    { id: "storm-channeler", name: "Storm Channeler", tier: "cursed", hp: 160, maxHp: 160, attack: 21, rewardXp: 220, rewardGold: 70, focus: "arcane", alive: true, boss: true, shield: 50 },
    { id: "obsidian-knight", name: "Obsidian Knight", tier: "elite", hp: 200, maxHp: 200, attack: 24, rewardXp: 260, rewardGold: 80, focus: "blades", alive: true, boss: true, shield: 60 },
];

const gearPool: GearItem[] = [
    { id: "thornblade", name: "Thornblade", slot: "weapon", rarity: "rare", attackBonus: 4, critBonus: 0.04, description: "Barbed steel tuned for blades foes.", focus: "blades" },
    { id: "stormbrand", name: "Stormbrand", slot: "weapon", rarity: "epic", attackBonus: 6, critBonus: 0.06, description: "Arc-spitting blade that loves crits.", focus: "arcane" },
    { id: "gale-wand", name: "Gale Wand", slot: "weapon", rarity: "rare", attackBonus: 3, critBonus: 0.05, description: "Channel gusts into precise strikes.", focus: "arcane" },
    { id: "warden-antler", name: "Warden Antler", slot: "weapon", rarity: "common", attackBonus: 2, description: "A wild-carved focus." },
    { id: "sun-charm", name: "Sun Charm", slot: "charm", rarity: "rare", wardBonus: 10, critBonus: 0.02, description: "Adds ward resonance to bursts." },
    { id: "ember-amulet", name: "Ember Amulet", slot: "charm", rarity: "epic", wardBonus: 15, attackBonus: 2, description: "Hums warm, bolstering resolve." },
    { id: "thorn-ring", name: "Thorn Ring", slot: "charm", rarity: "common", critBonus: 0.02, description: "Slight edge to your strikes." },
];

const baseSkills: SkillNode[] = [
    { id: "blade-dance", name: "Blade Dance", description: "+3 strike power and higher crits against blade foes.", unlocked: false, cost: 1 },
    { id: "wardens-heart", name: "Warden's Heart", description: "Take 15% less retaliation and heal 6 on victory.", unlocked: false, cost: 1 },
    { id: "starcaller", name: "Starcaller", description: "+8% crit chance; refund 3 energy on crits.", unlocked: false, cost: 1 },
    { id: "stormweaver", name: "Stormweaver", description: "Burst deals +25% and grants 4 energy per kill.", unlocked: false, cost: 1 },
    { id: "thorncaller", name: "Thorncaller", description: "+2 damage vs wilds; ward burst adds bleed (extra 6).", unlocked: false, cost: 1 },
    { id: "aegis-ritual", name: "Aegis Ritual", description: "Relight also grants +15 ward charge and 6 temp HP.", unlocked: false, cost: 1 },
];

const baseQuests: Quest[] = [
    { id: "clear-thickets", title: "Clear the Thickets", detail: "Cull the wild spirits that choke Verdantia's trade road.", target: 2, progress: 0, status: "active", rewardXp: 80, rewardGold: 12, tag: "wilds" },
    { id: "snuff-the-rites", title: "Snuff the Rites", detail: "Break the cultists weaving stormlight into the valley.", target: 1, progress: 0, status: "active", rewardXp: 110, rewardGold: 16, tag: "arcane" },
    { id: "wake-the-ward", title: "Wake the Ward", detail: "Gather gold to repair the stone ward that shields Verdantia's gate.", target: 35, progress: 12, status: "active", rewardXp: 90, rewardGold: 0, tag: "any" },
    { id: "wyrm-heart-1", title: "Echoes Beneath", detail: "Hear the wyrm-heart. Defeat any foe to attune to its pulse.", target: 1, progress: 0, status: "active", rewardXp: 120, rewardGold: 10, tag: "any" },
    { id: "wyrm-heart-2", title: "Shards to the Gate", detail: "Deliver shards: fell arcane or elite foes to charge the gate.", target: 2, progress: 0, status: "active", rewardXp: 160, rewardGold: 18, tag: "arcane" },
    { id: "wyrm-heart-3", title: "Rouse the Wyrm", detail: "Defeat a boss to wake Verdantia's guardian spirit.", target: 1, progress: 0, status: "active", rewardXp: 260, rewardGold: 40, tag: "any" },
];

export const shopStock: ShopItem[] = [
    { id: "ward-draught", name: "Ward Draught", description: "Restore 24 HP.", cost: 14, effect: "heal" },
    { id: "ember-ampoule", name: "Ember Ampoule", description: "Restore 14 Energy.", cost: 12, effect: "energize" },
    { id: "sunshard-surge", name: "Sunshard Surge", description: "Charge ward by 25%.", cost: 18, effect: "burst" },
];

function capLog(log: CombatLog[], entry: CombatLog, limit = 16) {
    const next = [entry, ...log];
    return next.slice(0, limit);
}

function clamp(value: number, min: number, max: number) {
    return Math.min(max, Math.max(min, value));
}

function rollRarity(tier: number): Rarity {
    const roll = Math.random();
    const legendary = 0.02 + tier * 0.002;
    const epic = 0.08 + tier * 0.01;
    const rare = 0.26 + tier * 0.02;
    if (roll < legendary) return "legendary";
    if (roll < legendary + epic) return "epic";
    if (roll < legendary + epic + rare) return "rare";
    return "common";
}

function rarityTint(rarity: Rarity) {
    if (rarity === "legendary") return "#fbbf24";
    if (rarity === "epic") return "#c084fc";
    if (rarity === "rare") return "#38bdf8";
    return "#e5e7eb";
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

export function useFantasyRpg() {
    const [encounterTier, setEncounterTier] = useState(1);
    const spawnEnemies = (tier: number) => baseEnemies.map((enemy, index) => ({
        ...enemy,
        hp: Math.round(enemy.maxHp * (1 + 0.12 * tier + 0.04 * index)),
        maxHp: Math.round(enemy.maxHp * (1 + 0.12 * tier + 0.04 * index)),
        attack: Math.round(enemy.attack * (1 + 0.08 * tier)),
        alive: true,
    }));

    const spawnBoss = (tier: number) => {
        const template = bossTemplates[tier % bossTemplates.length];
        const scale = 1 + tier * 0.18;
        const shieldScale = 1 + tier * 0.1;
        return [{
            ...template,
            id: `${template.id}-t${tier}`,
            hp: Math.round(template.maxHp * scale),
            maxHp: Math.round(template.maxHp * scale),
            attack: Math.round(template.attack * scale),
            rewardXp: Math.round(template.rewardXp * scale),
            rewardGold: Math.round(template.rewardGold * scale),
            shield: Math.round((template.shield ?? 0) * shieldScale),
            alive: true,
        }];
    };

    const [hero, setHero] = useState<HeroState>(initialHero);
    const [enemies, setEnemies] = useState<Enemy[]>(() => spawnEnemies(encounterTier));
    const [skills, setSkills] = useState<SkillNode[]>(baseSkills);
    const [quests, setQuests] = useState<Quest[]>(baseQuests);
    const [log, setLog] = useState<CombatLog[]>([
        { id: "intro", text: "Verdantia's ward is dim. The road is overrun. Strike, gather shards, and relight the gate." },
    ]);
    const [inventory, setInventory] = useState<Record<string, number>>({});
    const [gearBag, setGearBag] = useState<GearItem[]>([]);
    const [selectedEnemy, setSelectedEnemy] = useState<string>(baseEnemies[0].id);
    const [wardCharge, setWardCharge] = useState(20);
    const [sidePanel, setSidePanel] = useState<"quests" | "skills" | "log" | "shop" | "inventory">("quests");

    const prevAliveRef = useRef(enemies.filter((enemy) => enemy.alive).length);

    const unlocked = useMemo(() => new Set(skills.filter((skill) => skill.unlocked).map((skill) => skill.id)), [skills]);
    const currentEnemy = enemies.find((enemy) => enemy.id === selectedEnemy && enemy.alive) ?? enemies.find((enemy) => enemy.alive) ?? enemies[0];
    const heroCritChance = 0.12 + (unlocked.has("starcaller") ? 0.08 : 0) + (hero.gear.weapon?.critBonus ?? 0) + (hero.gear.charm?.critBonus ?? 0);
    const aliveCount = enemies.filter((enemy) => enemy.alive).length;

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
        const alive = enemies.filter((enemy) => enemy.alive).length;
        if (alive === 0 && prevAliveRef.current !== 0) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "All foes down. The ward drinks in their shards." }));
            setWardCharge((prev) => clamp(prev + 15, 0, 100));
        }
        prevAliveRef.current = alive;
    }, [enemies]);

    function rollGear(focus: Enemy["focus"], tier: number): GearItem | null {
        const rarity = rollRarity(tier);
        const candidates = gearPool.filter((g) => g.rarity === rarity || (rarity === "common" && g.rarity === "common"));
        if (candidates.length === 0) return null;
        const focused = candidates.filter((g) => !g.focus || g.focus === focus);
        const pool = focused.length > 0 ? focused : candidates;
        return { ...pool[Math.floor(Math.random() * pool.length)], id: `${rarity}-${crypto.randomUUID()}` };
    }

    function awardLoot(foe: Enemy) {
        const loot: string[] = [];
        const gear = rollGear(foe.focus, encounterTier + (foe.boss ? 2 : 0));
        if (gear) {
            setGearBag((prev) => [...prev, gear]);
            loot.push(`${gear.name} (${gear.rarity})`);
        }
        const dropPotion = Math.random() < 0.35;
        if (dropPotion) {
            const item = shopStock[Math.floor(Math.random() * shopStock.length)];
            setInventory((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }));
            loot.push(item.name);
        }
        if (loot.length > 0) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Loot: ${loot.join(", ")}.`, tone: "good" }));
        }
    }

    function handleAttack(enemyId: string) {
        const foe = enemies.find((enemy) => enemy.id === enemyId && enemy.alive);
        if (!foe) return;
        if (hero.energy < 4) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Too winded to strike.", tone: "warn" }));
            return;
        }

        const crit = Math.random() < heroCritChance;
        const gearAttack = (hero.gear.weapon?.attackBonus ?? 0) + (hero.gear.charm?.attackBonus ?? 0);
        const base = 6 + hero.level * 1.8 + gearAttack + (unlocked.has("blade-dance") && foe.focus === "blades" ? 3 : 0);
        const variance = 0.8 + Math.random() * 0.45;
        let damage = Math.round(base * variance * (crit ? 1.9 : 1));
        if (foe.boss && (foe.shield ?? 0) > 0) {
            damage = Math.round(damage * 0.6);
        }
        const mitigator = unlocked.has("wardens-heart") ? 0.85 : 1;
        const retaliation = Math.round(foe.attack * (0.65 + Math.random() * 0.5) * mitigator);

        setEnemies((prev) => prev.map((enemy) => {
            if (enemy.id !== foe.id) return enemy;
            const nextShield = enemy.shield ? Math.max(0, enemy.shield - damage * 0.4) : 0;
            const hpAfter = clamp(enemy.hp - damage, 0, enemy.maxHp);
            return { ...enemy, hp: hpAfter, alive: hpAfter > 0, shield: nextShield };
        }));
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
            awardLoot(foe);

            if (foe.boss) {
                setQuests((prev) => prev.map((quest) => quest.id === "wyrm-heart-3" ? { ...quest, progress: 1, status: "ready" } : quest));
            }

            setQuests((prev) => prev.map((quest) => {
                if (quest.status === "turned-in") return quest;
                const matches = quest.tag === "any" || quest.tag === foe.focus;
                const progress = matches ? clamp(quest.progress + 1, 0, quest.target) : quest.progress;
                const status = progress >= quest.target ? "ready" : quest.status;
                const extraGold = quest.id === "wake-the-ward" ? foe.rewardGold : 0;
                return { ...quest, progress, status, rewardGold: quest.rewardGold + extraGold };
            }));

            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Defeated ${foe.name}! +${foe.rewardXp} xp, +${foe.rewardGold} gold.`, tone: "good" }));
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
            const base = 9 + hero.level * 2.4 + ((hero.gear.weapon?.attackBonus ?? 0) + (hero.gear.charm?.attackBonus ?? 0)) + (unlocked.has("blade-dance") && enemy.focus === "blades" ? 3 : 0);
            const variance = 0.85 + Math.random() * 0.55 + index * 0.05;
            const damageBase = Math.round(base * variance * (crit ? 1.4 : 1) * (unlocked.has("stormweaver") ? 1.25 : 1));
            const damage = enemy.boss && (enemy.shield ?? 0) > 0 ? Math.round(damageBase * 0.6) : damageBase;
            const hp = clamp(enemy.hp - damage - (unlocked.has("thorncaller") ? 6 : 0), 0, enemy.maxHp);
            const aliveAfter = hp > 0;
            if (!aliveAfter) defeated.push(enemy);
            const nextShield = enemy.shield ? Math.max(0, enemy.shield - damage * 0.4) : 0;
            return { ...enemy, hp, alive: aliveAfter, shield: nextShield };
        }));

        const totalXp = defeated.reduce((sum, foe) => sum + foe.rewardXp, 0);
        const totalGold = defeated.reduce((sum, foe) => sum + foe.rewardGold, 0);

        setHero((prev) => updateHeroAfterXpGain({
            ...prev,
            xp: prev.xp + totalXp,
            gold: prev.gold + totalGold,
            energy: clamp(prev.energy - 8 + (unlocked.has("stormweaver") ? defeated.length * 4 : 0), 0, prev.maxEnergy),
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
            defeated.forEach((foe) => awardLoot(foe));
        }

        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Ward burst ripples outward${crit ? " (empowered)" : ""}. ${defeated.length} foes shattered.`, tone: defeated.length > 0 ? "good" : undefined }));
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
        setWardCharge((prev) => clamp(prev + (unlocked.has("aegis-ritual") ? 15 : 0), 0, 100));
        setHero((prev) => unlocked.has("aegis-ritual") ? { ...prev, hp: clamp(prev.hp + 6, 0, prev.maxHp) } : prev);
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "The gate flares—vitality floods back.", tone: "good" }));
    }

    function buyItem(itemId: string) {
        const item = shopStock.find((i) => i.id === itemId);
        if (!item) return;
        if (hero.gold < item.cost) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Not enough gold for that purchase.", tone: "warn" }));
            return;
        }
        setHero((prev) => ({ ...prev, gold: prev.gold - item.cost }));
        setInventory((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Bought ${item.name} for ${item.cost}g.` }));
    }

    function useItem(itemId: string) {
        const item = shopStock.find((i) => i.id === itemId);
        if (!item) return;
        const count = inventory[itemId] ?? 0;
        if (count <= 0) {
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "You don't have that item.", tone: "warn" }));
            return;
        }

        setInventory((prev) => ({ ...prev, [itemId]: Math.max(0, (prev[itemId] ?? 0) - 1) }));

        if (item.effect === "heal") {
            setHero((prev) => ({ ...prev, hp: clamp(prev.hp + 24, 0, prev.maxHp) }));
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "You drink a ward draught and mend.", tone: "good" }));
        } else if (item.effect === "energize") {
            setHero((prev) => ({ ...prev, energy: clamp(prev.energy + 14, 0, prev.maxEnergy) }));
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Ember ampoule restores your focus.", tone: "good" }));
        } else if (item.effect === "burst") {
            setWardCharge((prev) => clamp(prev + 25, 0, 100));
            setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: "Sunshard surge hums through the ward.", tone: "good" }));
        }
    }

    function equipGear(itemId: string) {
        const idx = gearBag.findIndex((g) => g.id === itemId);
        if (idx === -1) return;
        const item = gearBag[idx];
        const baseBag = gearBag.filter((_, i) => i !== idx);
        setHero((prev) => {
            const current = prev.gear[item.slot];
            const swappedBag = current ? [...baseBag, current] : baseBag;
            setGearBag(swappedBag);
            return {
                ...prev,
                gear: {
                    ...prev.gear,
                    [item.slot]: item,
                },
            };
        });
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `Equipped ${item.name} (${item.slot}).`, tone: "good" }));
    }

    useEffect(() => {
        const onKey = (event: KeyboardEvent) => {
            if (event.key === "1") {
                event.preventDefault();
                if (currentEnemy) handleAttack(currentEnemy.id);
            } else if (event.key === "2" || event.key === "r" || event.key === "R") {
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
    }, [currentEnemy]);

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
        const nextTier = encounterTier + 1;
        const bossWave = nextTier % 3 === 0;
        const nextPack = bossWave ? spawnBoss(nextTier) : spawnEnemies(nextTier);
        setEnemies(nextPack);
        setSelectedEnemy(nextPack[0].id);
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: bossWave ? "A boss steps through the gate." : "New foes converge from the mists." }));
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

        if (quest.id === "wyrm-heart-1") {
            setQuests((prev) => prev.map((q) => q.id === "wyrm-heart-2" ? { ...q, status: "active" } : q));
        } else if (quest.id === "wyrm-heart-2") {
            setQuests((prev) => prev.map((q) => q.id === "wyrm-heart-3" ? { ...q, status: "active" } : q));
        }
    }

    function unlockSkill(skillId: string) {
        if (hero.skillPoints <= 0) return;
        const skill = skills.find((node) => node.id === skillId);
        if (!skill || skill.unlocked) return;
        setSkills((prev) => prev.map((node) => node.id === skillId ? { ...node, unlocked: true } : node));
        setHero((prev) => ({ ...prev, skillPoints: prev.skillPoints - 1 }));
        setLog((prev) => capLog(prev, { id: crypto.randomUUID(), text: `${skill.name} etched into your weave.`, tone: "good" }));
    }

    const storyline = "Verdantia was built atop a slumbering wyrm-heart. As its ward dims, wild spirits break through." +
        " The city needs shards from fallen foes to rekindle the gate before the caravans halt.";

    return {
        hero,
        enemies,
        skills,
        quests,
        log,
        inventory,
        gearBag,
        selectedEnemy,
        setSelectedEnemy,
        wardCharge,
        encounterTier,
        sidePanel,
        setSidePanel,
        currentEnemy,
        heroCritChance,
        aliveCount,
        storyline,
        handleAttack,
        handleWardBurst,
        handleRelightWard,
        handleRest,
        resetEncounter,
        handleTurnIn,
        unlockSkill,
        buyItem,
        useItem,
        equipGear,
        cycleEnemy,
        shopStock,
    };
}

export { clamp, rarityTint, enemyColor };
