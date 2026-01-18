import { Suspense, useLayoutEffect, useRef, useState } from "react";
import { Html } from "@react-three/drei";

import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "../../lib/utils";
import { RiftChamber, focusIcon } from "./rpg-actors";
import { rarityTint, useFantasyRpg } from "./use-fantasy-rpg";

export type FantasyRpgModuleProps = {
    userEmail?: string | null;
};

export function FantasyRpgModule({ userEmail }: FantasyRpgModuleProps) {
    void userEmail;
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [viewportHeight, setViewportHeight] = useState<number | null>(null);

    const {
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
    } = useFantasyRpg();

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

    return (
        <div className="w-full px-3 sm:px-4 lg:px-6">
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden rounded-3xl border bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"
                style={viewportHeight ? { height: `${viewportHeight}px`, maxHeight: `${viewportHeight}px` } : undefined}
            >
                <Suspense fallback={<Html center className="text-sm text-muted-foreground">Summoning Verdantia…</Html>}>
                    <div className="absolute inset-0">
                        <RiftChamber
                            hero={hero}
                            enemies={enemies}
                            selectedEnemy={currentEnemy}
                            onSelectEnemy={setSelectedEnemy}
                            heroCritChance={heroCritChance}
                            gearBag={gearBag}
                        />
                    </div>
                </Suspense>

                <div className="pointer-events-none absolute inset-0 flex flex-col p-3 sm:p-4 lg:p-6">
                    <div className="pointer-events-auto flex w-full items-center gap-2 rounded-full border bg-background/80 px-3 py-2 text-xs font-semibold shadow">
                        <span className="hidden sm:inline text-muted-foreground">Shards of Verdantia</span>
                        <Badge variant="outline">Tier {encounterTier}</Badge>
                        <Badge variant="secondary">HP {hero.hp}/{hero.maxHp}</Badge>
                        <Badge variant="outline">Energy {hero.energy}/{hero.maxEnergy}</Badge>
                        <Badge variant="outline">Gold {hero.gold}</Badge>
                        <Badge variant="outline">Ward {wardCharge}%</Badge>
                        <div className="ml-auto flex items-center gap-2 text-muted-foreground"><span>Controls</span><Badge variant="outline">1-5 actions, Q/E target</Badge></div>
                    </div>

                    <div className="pointer-events-none relative mt-auto flex items-end">
                        <div className="pointer-events-none flex w-full items-end gap-3">
                            <div className="pointer-events-auto flex w-72 max-w-sm flex-col gap-2 text-xs text-muted-foreground">
                                <div className="rounded-lg border bg-background/85 px-3 py-2 shadow">
                                    <div className="flex items-center justify-between gap-2 text-sm font-semibold">{hero.name}<Badge variant="outline">Lvl {hero.level}</Badge></div>
                                    <div className="mt-1 flex items-center gap-2">
                                        <span>XP</span><Progress className="flex-1" value={Math.min(100, (hero.xp / hero.nextLevelXp) * 100)} />
                                    </div>
                                    <div className="mt-2 flex items-center gap-2 text-xs">
                                        <Button size="sm" variant="secondary" onClick={handleRest}>Rest (2)</Button>
                                        <Button size="sm" variant="ghost" onClick={() => cycleEnemy(-1)}>Q ←</Button>
                                        <Button size="sm" variant="ghost" onClick={() => cycleEnemy(1)}>E →</Button>
                                    </div>
                                    <p className="mt-1 text-[11px] text-muted-foreground leading-tight">{storyline}</p>
                                </div>
                                <ScrollArea className="h-24 w-full rounded-lg border bg-background/75 p-2 shadow">
                                    <div className="space-y-2">
                                        {log.slice(0, 6).map((entry) => (
                                            <div key={entry.id} className={cn("rounded-md border px-2 py-1 text-[11px]", entry.tone === "good" && "border-green-500/40 bg-green-500/10", entry.tone === "warn" && "border-amber-500/40 bg-amber-500/10", entry.tone === "bad" && "border-red-500/40 bg-red-500/10")}>
                                                {entry.text}
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </div>

                            <div className="flex-1" />

                            <div className="pointer-events-auto flex w-[420px] max-w-lg flex-col gap-2">
                                <div className="rounded-xl border bg-background/85 p-3 text-xs shadow">
                                    <div className="flex items-center justify-between text-sm font-semibold">
                                        <div className="flex items-center gap-2">
                                            <span>{currentEnemy?.name ?? "No target"}</span>
                                            {currentEnemy ? <Badge variant="outline">{focusIcon(currentEnemy.focus)}</Badge> : null}
                                        </div>
                                        <Badge variant="secondary">Foes {aliveCount}</Badge>
                                    </div>
                                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-foreground/20">
                                        <div className="h-full rounded-full bg-primary" style={{ width: `${currentEnemy ? (currentEnemy.hp / currentEnemy.maxHp) * 100 : 0}%` }} />
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2 text-sm">
                                        <Button onClick={() => currentEnemy && handleAttack(currentEnemy.id)} disabled={!currentEnemy}>Attack (1)</Button>
                                        <Button variant="outline" onClick={handleWardBurst}>Burst (3)</Button>
                                        <Button variant="outline" onClick={handleRelightWard}>Relight (4)</Button>
                                        <Button variant="ghost" onClick={resetEncounter}>New wave (5)</Button>
                                    </div>
                                    <div className="mt-2 text-muted-foreground">Click a shard to set target or use Q/E.</div>
                                </div>

                                <div className="flex flex-col gap-2 rounded-xl border bg-background/90 p-3 shadow">
                                    <div className="flex items-center gap-2 text-xs font-semibold">
                                        <Button size="sm" variant={sidePanel === "quests" ? "default" : "outline"} onClick={() => setSidePanel("quests")}>Quests</Button>
                                        <Button size="sm" variant={sidePanel === "skills" ? "default" : "outline"} onClick={() => setSidePanel("skills")}>Skills</Button>
                                        <Button size="sm" variant={sidePanel === "shop" ? "default" : "outline"} onClick={() => setSidePanel("shop")}>Shop</Button>
                                        <Button size="sm" variant={sidePanel === "inventory" ? "default" : "outline"} onClick={() => setSidePanel("inventory")}>Bag</Button>
                                        <Button size="sm" variant={sidePanel === "log" ? "default" : "outline"} onClick={() => setSidePanel("log")}>Log</Button>
                                    </div>
                                    {sidePanel === "quests" ? (
                                        <div className="space-y-2 max-h-64 overflow-auto pr-1">
                                            {quests.map((quest) => (
                                                <div key={quest.id} className="rounded-lg border bg-muted/30 p-2 text-[12px]">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold">{quest.title}</span>
                                                        <Badge variant={quest.status === "ready" ? "default" : quest.status === "turned-in" ? "secondary" : "outline"}>{quest.status}</Badge>
                                                    </div>
                                                    <div className="mt-1 text-muted-foreground">{quest.detail}</div>
                                                    <div className="mt-1 flex items-center justify-between text-muted-foreground">
                                                        <span>{quest.progress}/{quest.target} {quest.tag === "any" ? "any" : quest.tag}</span>
                                                        <span>+{quest.rewardXp}xp/+{quest.rewardGold}g</span>
                                                    </div>
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <Button size="sm" variant="outline" onClick={() => setSelectedEnemy(quest.tag === "any" ? currentEnemy?.id ?? enemies[0].id : enemies.find((enemy) => enemy.focus === quest.tag && enemy.alive)?.id ?? selectedEnemy)}>
                                                            Hunt
                                                        </Button>
                                                        <Button size="sm" disabled={quest.status !== "ready"} onClick={() => handleTurnIn(quest.id)}>
                                                            Turn in
                                                        </Button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {sidePanel === "skills" ? (
                                        <div className="grid grid-cols-2 gap-2 max-h-52 overflow-auto pr-1">
                                            {skills.map((skill) => (
                                                <div key={skill.id} className={cn("rounded-lg border p-2 text-[12px]", skill.unlocked ? "border-primary/60 bg-primary/5" : "bg-muted/30")}>
                                                    <div className="font-semibold text-sm">{skill.name}</div>
                                                    <p className="text-muted-foreground text-[11px]">{skill.description}</p>
                                                    <Button size="sm" className="mt-1" variant={skill.unlocked ? "secondary" : "outline"} disabled={skill.unlocked || hero.skillPoints <= 0} onClick={() => unlockSkill(skill.id)}>
                                                        {skill.unlocked ? "Unlocked" : `Unlock (-${skill.cost})`}
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {sidePanel === "shop" ? (
                                        <div className="space-y-2 max-h-52 overflow-auto pr-1">
                                            {shopStock.map((item) => (
                                                <div key={item.id} className="rounded-lg border bg-muted/25 p-2 text-[12px]">
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-semibold">{item.name}</span>
                                                        <Badge variant="secondary">{item.cost}g</Badge>
                                                    </div>
                                                    <p className="text-muted-foreground text-[11px]">{item.description}</p>
                                                    <Button size="sm" className="mt-2" variant="outline" onClick={() => buyItem(item.id)} disabled={hero.gold < item.cost}>
                                                        Buy
                                                    </Button>
                                                </div>
                                            ))}
                                        </div>
                                    ) : null}
                                    {sidePanel === "inventory" ? (
                                        <div className="space-y-3 max-h-64 overflow-auto pr-1 text-[12px]">
                                            <div className="rounded-lg border bg-muted/20 p-3 space-y-2">
                                                <div className="flex items-center justify-between text-xs font-semibold">
                                                    <span>Equipped</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2">
                                                    <div className="rounded-md border bg-background/80 p-2">
                                                        <div className="text-[11px] uppercase text-muted-foreground">Weapon</div>
                                                        {hero.gear.weapon ? (
                                                            <div className="font-semibold">{hero.gear.weapon.name}</div>
                                                        ) : <div className="text-muted-foreground">None</div>}
                                                    </div>
                                                    <div className="rounded-md border bg-background/80 p-2">
                                                        <div className="text-[11px] uppercase text-muted-foreground">Charm</div>
                                                        {hero.gear.charm ? (
                                                            <div className="font-semibold">{hero.gear.charm.name}</div>
                                                        ) : <div className="text-muted-foreground">None</div>}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                {shopStock.filter((item) => (inventory[item.id] ?? 0) > 0).length === 0 && gearBag.length === 0 ? (
                                                    <div className="rounded-lg border bg-muted/20 p-3 text-muted-foreground">Your bag is empty. Buy or earn items.</div>
                                                ) : null}

                                                {gearBag.map((item) => (
                                                    <div key={item.id} className="rounded-lg border bg-muted/25 p-2">
                                                        <div className="flex items-center justify-between">
                                                            <span className="font-semibold">{item.name}</span>
                                                            <Badge variant="outline" style={{ borderColor: rarityTint(item.rarity), color: rarityTint(item.rarity) }}>{item.rarity}</Badge>
                                                        </div>
                                                        <p className="text-muted-foreground text-[11px]">{item.description}</p>
                                                        <Button size="sm" className="mt-2" variant="secondary" onClick={() => equipGear(item.id)}>
                                                            Equip to {item.slot}
                                                        </Button>
                                                    </div>
                                                ))}

                                                {shopStock.map((item) => {
                                                    const count = inventory[item.id] ?? 0;
                                                    if (count <= 0) return null;
                                                    return (
                                                        <div key={item.id} className="rounded-lg border bg-muted/30 p-2">
                                                            <div className="flex items-center justify-between">
                                                                <span className="font-semibold">{item.name}</span>
                                                                <Badge variant="outline">x{count}</Badge>
                                                            </div>
                                                            <p className="text-muted-foreground text-[11px]">{item.description}</p>
                                                            <Button size="sm" className="mt-2" variant="secondary" onClick={() => useItem(item.id)}>
                                                                Use
                                                            </Button>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    ) : null}
                                    {sidePanel === "log" ? (
                                        <ScrollArea className="h-48 rounded-lg border bg-muted/40">
                                            <div className="space-y-2 p-2 text-[12px]">
                                                {log.map((entry) => (
                                                    <div key={entry.id} className={cn("rounded-md border px-2 py-1", entry.tone === "good" && "border-green-500/40 bg-green-500/10", entry.tone === "warn" && "border-amber-500/40 bg-amber-500/10", entry.tone === "bad" && "border-red-500/40 bg-red-500/10")}>
                                                        {entry.text}
                                                    </div>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
