export type AvatarProps = {
    src?: string | null;
    alt?: string;
    fallback?: string;
    size?: number;
    className?: string;
};

export function Avatar({ src, alt = "", fallback = "?", size = 36, className = "" }: AvatarProps) {
    const initials = fallback.slice(0, 2).toUpperCase();
    return (
        <div
            className={`grid place-content-center rounded-full border border-white/15 bg-slate-900 text-sm font-semibold text-slate-100 ${className}`.trim()}
            style={{ width: size, height: size }}
        >
            {src ? <img src={src} alt={alt} className="h-full w-full rounded-full object-cover" /> : <span>{initials}</span>}
        </div>
    );
}
