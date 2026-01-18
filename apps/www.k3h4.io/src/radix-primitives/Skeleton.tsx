export type SkeletonProps = {
    width?: string | number;
    height?: string | number;
    className?: string;
};

export function Skeleton({ width = "100%", height = "1rem", className = "" }: SkeletonProps) {
    return <div className={`animate-pulse rounded-lg bg-white/10 ${className}`.trim()} style={{ width, height }} />;
}
