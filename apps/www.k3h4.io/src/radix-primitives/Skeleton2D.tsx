export type Skeleton2DProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
};

export function Skeleton2D({ width = "100%", height = "1rem", className = "" }: Skeleton2DProps) {
    return <div className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()} style={{ width, height }} />;
}
