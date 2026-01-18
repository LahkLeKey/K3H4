import { useState } from "react";

export type AccordionItem2D = {
    key: string;
    title: string;
    content: React.ReactNode;
};

export type Accordion2DProps = {
    items: AccordionItem2D[];
    defaultOpenKey?: string;
    className?: string;
};

export function Accordion2D({ items, defaultOpenKey, className = "" }: Accordion2DProps) {
    const [openKey, setOpenKey] = useState(defaultOpenKey ?? items[0]?.key ?? "");
    return (
        <div className={`flex flex-col divide-y divide-white/10 rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
            {items.map((item) => {
                const open = item.key === openKey;
                return (
                    <div key={item.key}>
                        <button
                            type="button"
                            onClick={() => setOpenKey(open ? "" : item.key)}
                            className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-slate-100"
                        >
                            <span>{item.title}</span>
                            <span className="text-xs uppercase tracking-[0.2em] text-slate-400">{open ? "-" : "+"}</span>
                        </button>
                        {open ? <div className="px-4 pb-4 text-sm text-slate-200">{item.content}</div> : null}
                    </div>
                );
            })}
        </div>
    );
}
