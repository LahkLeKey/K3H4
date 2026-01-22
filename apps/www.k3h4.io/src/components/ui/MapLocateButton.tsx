type Props = {
    onClick: () => void;
};

export function MapLocateButton({ onClick }: Props) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="absolute right-3 top-3 z-10 rounded bg-white/90 px-3 py-2 text-xs font-semibold text-slate-800 shadow"
        >
            Locate me
        </button>
    );
}