export type Spinner2DProps = {
    size?: number;
    className?: string;
};

export function Spinner2D({ size = 18, className = "" }: Spinner2DProps) {
    return (
        <span
            className={`inline-block animate-spin rounded-full border-2 border-white/20 border-t-emerald-300 ${className}`.trim()}
            style={{ width: size, height: size }}
        />
    );
}
