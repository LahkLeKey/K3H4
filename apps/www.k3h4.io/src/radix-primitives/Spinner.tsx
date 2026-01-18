export type SpinnerProps = {
    size?: number;
    className?: string;
};

export function Spinner({ size = 18, className = "" }: SpinnerProps) {
    return (
        <span
            className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-emerald-300 ${className}`.trim()}
            style={{ width: size, height: size }}
        />
    );
}
