type CollapsedPanelHintProps = {
    accent: string;
    label: string;
    glyph?: string;
    onOpen: () => void;
};

export function CollapsedPanelHint({ accent, label, glyph, onOpen }: CollapsedPanelHintProps) {
    return (
        <div className="fixed inset-x-0 bottom-20 z-20 flex justify-center px-3 md:static md:justify-end">
            <button
                type="button"
                onClick={onOpen}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-900/80 px-4 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur"
            >
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: accent }} />
                <span>{glyph ? `${glyph} ${label}` : label}</span>
                <span className="text-xs uppercase tracking-[0.18em] text-slate-300">Open Panel</span>
            </button>
        </div>
    );
}
