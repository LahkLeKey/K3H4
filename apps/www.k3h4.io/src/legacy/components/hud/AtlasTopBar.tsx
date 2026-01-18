import { Map, Menu, MoveLeft, MoveRight } from "lucide-react";

import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { useAtlas, useActiveZone } from "../../state/atlas/atlas-store";

export type AtlasTopBarProps = {
    userEmail: string | null;
    profileAvatar?: string | null;
    onSignOut?: () => void;
    onOpenMap?: () => void;
};

export function AtlasTopBar({ userEmail, profileAvatar, onSignOut, onOpenMap }: AtlasTopBarProps) {
    const { zones, activeZoneId, setActiveZone, nextZone, prevZone } = useAtlas();
    const activeZone = useActiveZone();

    return (
        <header className="fixed inset-x-0 top-0 z-30 border-b border-white/10 bg-slate-950/70 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.35)]">
            <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-lg font-semibold text-white">K3</div>
                    <div className="flex flex-col leading-tight">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-slate-400">Atlas</span>
                        <span className="text-sm font-semibold text-white">{activeZone.glyph ? `${activeZone.glyph} ${activeZone.label}` : activeZone.label}</span>
                    </div>
                </div>

                <div className="flex flex-1 items-center justify-center">
                    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2 py-1.5 text-white shadow-sm backdrop-blur">
                        <Button variant="ghost" size="icon" onClick={prevZone} aria-label="Previous zone" className="rounded-full text-white/90">
                            <MoveLeft className="h-4 w-4" />
                        </Button>
                        <div className="flex flex-col leading-tight">
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-300">Context</span>
                            <span className="text-sm font-semibold text-white">{activeZone.label}</span>
                        </div>
                        <Button variant="ghost" size="icon" onClick={nextZone} aria-label="Next zone" className="rounded-full text-white/90">
                            <MoveRight className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={onOpenMap} aria-label="Open world map" className="rounded-full text-white/90">
                            <Map className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-10 w-10 rounded-full border border-white/15 bg-white/5 text-white shadow-sm backdrop-blur" aria-label="Open context menu">
                            <Menu className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start" className="w-[300px] p-0">
                        <div className="flex items-center gap-3 border-b border-white/10 bg-slate-900/80 px-4 py-3 text-white">
                            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-300">Contexts</span>
                            <span className="text-sm font-semibold">{activeZone.label}</span>
                        </div>
                        <DropdownMenuSeparator />
                        {zones.map((zone) => (
                            <DropdownMenuItem
                                key={zone.id}
                                className="flex items-start gap-3"
                                onSelect={(event) => {
                                    event.preventDefault();
                                    setActiveZone(zone.id);
                                }}
                            >
                                <span className="mt-1 h-2.5 w-2.5 rounded-full" style={{ background: zone.accent }} />
                                <div className="flex flex-col">
                                    <span className="font-semibold text-white">{zone.glyph ? `${zone.glyph} ${zone.label}` : zone.label}</span>
                                    <span className="text-xs text-slate-400">{zone.description}</span>
                                </div>
                                {zone.id === activeZoneId ? <span className="ml-auto text-[11px] uppercase tracking-[0.18em] text-emerald-200">Active</span> : null}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex items-center gap-2">
                    <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-200">{userEmail ?? "Guest"}</div>
                    {userEmail ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" aria-label="Account menu">
                                    <Avatar className="h-8 w-8">
                                        <AvatarImage src={profileAvatar ?? undefined} />
                                        <AvatarFallback className="text-xs">{userEmail.slice(0, 2).toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem disabled>{userEmail}</DropdownMenuItem>
                                <DropdownMenuSeparator />
                                {onSignOut ? <DropdownMenuItem onSelect={onSignOut}>Sign out</DropdownMenuItem> : null}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : null}
                </div>
            </div>
        </header>
    );
}
