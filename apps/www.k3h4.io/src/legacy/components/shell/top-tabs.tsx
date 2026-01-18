import type { ReactNode } from "react";

import { cn } from "../../lib/utils";

export type TopTabKey = "bank" | "persona" | "agency" | "freight" | "warehouse";

export type TopTabsProps = {
    activeTab: TopTabKey;
    onChange: (tab: TopTabKey) => void;
    className?: string;
    prefix?: ReactNode;
    suffix?: ReactNode;
};

const tabs: { key: TopTabKey; label: string; description: string }[] = [
    {
        key: "bank",
        label: "Bank",
        description: "Balance, actions, and activity",
    },
    {
        key: "persona",
        label: "Persona",
        description: "Link fake accounts to pay or request",
    },
    {
        key: "agency",
        label: "Assignment agency",
        description: "Staffing, timecards, and payouts",
    },
    {
        key: "freight",
        label: "Freight manager",
        description: "Routing, pricing, k3h4c billing",
    },
    {
        key: "warehouse",
        label: "Warehouse",
        description: "Inventory + freight handoff",
    },
];

export function TopTabs({ activeTab, onChange, className, prefix, suffix }: TopTabsProps) {
    return (
        <div className={cn("flex w-full flex-wrap items-center gap-3", className)}>
            {prefix}
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border bg-muted/40 p-1 shadow-sm">
                {tabs.map((tab) => {
                    const active = activeTab === tab.key;
                    return (
                        <button
                            key={tab.key}
                            type="button"
                            className={cn(
                                "flex min-w-[140px] flex-col rounded-full px-4 py-2 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                                active
                                    ? "bg-background text-foreground shadow"
                                    : "text-muted-foreground hover:bg-background/60 hover:text-foreground"
                            )}
                            onClick={() => onChange(tab.key)}
                            aria-pressed={active}
                        >
                            <span className="text-sm font-semibold leading-tight">{tab.label}</span>
                            <span className="text-xs leading-tight text-muted-foreground">{tab.description}</span>
                        </button>
                    );
                })}
            </div>
            {suffix}
        </div>
    );
}
