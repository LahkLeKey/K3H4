import { useMemo, useState } from "react";

import { Html } from "./Html";

export type TabOption = {
    key: string;
    label: string;
    content?: React.ReactNode;
};

export type TabsProps = {
    position?: [number, number, number];
    tabs: TabOption[];
    value?: string;
    onValueChange?: (key: string) => void;
    className?: string;
};

export function Tabs({ position = [0, 1.1, 0], tabs, value, onValueChange, className = "" }: TabsProps) {
    const initial = useMemo(() => value ?? tabs[0]?.key ?? "", [tabs, value]);
    const [internal, setInternal] = useState(initial);
    const active = value ?? internal;

    return (
        <Html position={position} distanceFactor={8}>
            <div className={`flex flex-col gap-3 ${className}`.trim()}>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-slate-900/80 p-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200 shadow-xl backdrop-blur">
                    {tabs.map((tab) => {
                        const isActive = tab.key === active;
                        return (
                            <button
                                key={tab.key}
                                type="button"
                                onClick={() => {
                                    setInternal(tab.key);
                                    onValueChange?.(tab.key);
                                }}
                                className={`rounded-full px-3 py-1 transition ${isActive ? "bg-emerald-400/25 text-white" : "text-slate-300 hover:text-white"}`.trim()}
                            >
                                {tab.label}
                            </button>
                        );
                    })}
                </div>
                {tabs.map((tab) => (tab.content && tab.key === active ? <div key={`${tab.key}-content`}>{tab.content}</div> : null))}
            </div>
        </Html>
    );
}
