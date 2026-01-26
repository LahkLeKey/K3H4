import { useMemo, useState, type ReactNode } from "react";
import * as RadixTabs from "@radix-ui/react-tabs";

export type TabOption = {
    key: string;
    label: ReactNode;
    content?: ReactNode;
    disabled?: boolean;
};

export type TabsProps = {
    tabs: TabOption[];
    value?: string;
    onValueChange?: (key: string) => void;
    className?: string;
};

export function Tabs({ tabs, value, onValueChange, className = "" }: TabsProps) {
    const initial = useMemo(() => value ?? tabs[0]?.key ?? "", [tabs, value]);
    const [internal, setInternal] = useState(initial);
    const active = value ?? internal;
    const handleChange = (next: string) => {
        if (value === undefined) setInternal(next);
        onValueChange?.(next);
    };

    return (
        <RadixTabs.Root value={active} onValueChange={handleChange} className={`flex flex-col gap-3 ${className}`.trim()}>
            <RadixTabs.List className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/70 p-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-200">
                {tabs.map((tab) => (
                    <RadixTabs.Trigger
                        key={tab.key}
                        value={tab.key}
                        disabled={tab.disabled}
                        className="rounded-full px-3 py-1 transition data-[state=active]:bg-emerald-400/20 data-[state=active]:text-white data-[state=inactive]:text-slate-300 data-[state=inactive]:hover:text-white disabled:opacity-50"
                    >
                        {tab.label}
                    </RadixTabs.Trigger>
                ))}
            </RadixTabs.List>

            {tabs.map((tab) => (
                <RadixTabs.Content key={`${tab.key}-content`} value={tab.key} className="focus-visible:outline-none">
                    {tab.content}
                </RadixTabs.Content>
            ))}
        </RadixTabs.Root>
    );
}
