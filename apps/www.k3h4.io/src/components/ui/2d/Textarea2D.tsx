import type { TextareaHTMLAttributes } from "react";

export type Textarea2DProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export function Textarea2D({ className = "", ...rest }: Textarea2DProps) {
    return (
        <textarea
            {...rest}
            className={`w-full rounded-xl border border-white/15 bg-slate-950/60 px-3 py-2 text-sm text-slate-100 shadow-sm backdrop-blur transition hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-300/60 focus:border-transparent ${className}`.trim()}
        />
    );
}
