import type { ReactNode } from "react";

export type Card2DProps = {
    title?: string;
    eyebrow?: string;
    actions?: ReactNode;
    children?: ReactNode;
    footer?: ReactNode;
    className?: string;
};

export function Card2D({ title, eyebrow, actions, children, footer, className = "" }: Card2DProps) {
    return (
        <div className={`rounded-2xl border border-white/10 bg-slate-950 shadow-xl ${className}`.trim()}>
            {(eyebrow || title || actions) ? (
                <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-3">
                    <div className="flex flex-col gap-1">
                        {eyebrow ? <span className="text-[11px] uppercase tracking-[0.18em] text-slate-400">{eyebrow}</span> : null}
                        {title ? <span className="text-sm font-semibold text-white">{title}</span> : null}
                    </div>
                    {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
                </div>
            ) : null}
            <div className="px-4 py-3 text-sm text-slate-200">{children}</div>
            {footer ? <div className="border-t border-white/10 px-4 py-3 text-xs text-slate-300">{footer}</div> : null}
        </div>
    );
}
