import { useMemo, useState } from "react";

export type TabOption = {
    key: string;
    label: string;
    content?: React.ReactNode;
};

export type Tabs2DProps = {
    tabs: TabOption[];
    value?: string;
    onValueChange?: (key: string) => void;
    className?: string;
};

export function Tabs2D({ tabs, value, onValueChange, className = "" }: Tabs2DProps) {
    const initial = useMemo(() => value ?? tabs[0]?.key ?? "", [tabs, value]);
    const [internal, setInternal] = useState(initial);
    const active = value ?? internal;

    return (
        <div className={`flex flex-col gap-3 ${className}`.trim()}>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 p-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
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
                            className={`rounded-full px-3 py-1 transition ${isActive ? "bg-emerald-400/20 text-white" : "text-slate-300 hover:text-white"}`.trim()}
                        >
                            {tab.label}
                        </button>
                    );
                })}
            </div>
            {tabs.map((tab) => (tab.content && tab.key === active ? <div key={`${tab.key}-content`}>{tab.content}</div> : null))}
        </div>
    );
}
