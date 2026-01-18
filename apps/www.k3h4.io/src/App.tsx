import "./index.css";

import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { AtlasScene } from "./components/AtlasScene";

function MainMenu() {
    const menuItems = [
        { label: "Enter Atlas", subtitle: "Launch into the world" },
        { label: "Resume Session", subtitle: "Continue from last checkpoint" },
        { label: "Settings", subtitle: "Audio, controls, and display" },
    ];

    return (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-gradient-to-b from-slate-950/70 via-slate-950/80 to-slate-950/95 text-slate-50">
            <div className="pointer-events-auto w-full max-w-3xl rounded-[32px] border border-white/10 bg-white/5 p-8 shadow-2xl shadow-slate-900/60 backdrop-blur">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                    <div>
                        <div className="text-xs uppercase tracking-[0.3em] text-slate-400">K3H4</div>
                        <div className="text-3xl font-bold text-white md:text-4xl">Atlas Command</div>
                        <p className="mt-2 max-w-xl text-sm text-slate-300">
                            A focused main menu to launch the client. Pick an entry point, tweak your rig, or jump back into your last run.
                        </p>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-emerald-200">
                        <span className="h-2 w-2 rounded-full bg-emerald-400" />
                        Servers: Online
                    </div>
                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-3">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-left transition hover:border-white/30 hover:bg-white/10"
                        >
                            <div className="absolute inset-0 opacity-0 blur-3xl transition group-hover:opacity-25" style={{ background: "radial-gradient(circle at 20% 20%, rgba(125,211,252,0.6), transparent 40%)" }} />
                            <div className="flex items-center justify-between gap-3">
                                <div>
                                    <div className="text-sm font-semibold text-white">{item.label}</div>
                                    <div className="text-xs text-slate-300">{item.subtitle}</div>
                                </div>
                                <span className="text-lg text-slate-200 transition group-hover:translate-x-1">→</span>
                            </div>
                        </button>
                    ))}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-slate-400">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Build: pre-alpha menu</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Input: controller + kb/m</span>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">Region: auto</span>
                </div>
            </div>
        </div>
    );
}

export default function App() {
    return (
        <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
            <Canvas shadows dpr={[1, 1.8]} className="h-full w-full">
                <AtlasScene />
                <Html fullscreen>
                    <MainMenu />
                </Html>
            </Canvas>
        </div>
    );
}
