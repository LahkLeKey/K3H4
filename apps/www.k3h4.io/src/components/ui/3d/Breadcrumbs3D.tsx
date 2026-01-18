import { Html3D } from "./Html3D";

export type Breadcrumb3DItem = {
    key: string;
    label: string;
    href?: string;
};

export type Breadcrumbs3DProps = {
    position?: [number, number, number];
    items: Breadcrumb3DItem[];
    className?: string;
};

export function Breadcrumbs3D({ position = [0, 1, 0], items, className = "" }: Breadcrumbs3DProps) {
    return (
        <Html3D position={position} distanceFactor={9}>
            <nav className={`flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400 ${className}`.trim()} aria-label="Breadcrumb">
                {items.map((item, idx) => (
                    <span key={item.key} className="inline-flex items-center gap-2">
                        {item.href ? (
                            <a href={item.href} className="font-semibold text-slate-100 hover:text-emerald-200">
                                {item.label}
                            </a>
                        ) : (
                            <span className="font-semibold text-slate-100">{item.label}</span>
                        )}
                        {idx < items.length - 1 ? <span className="text-slate-500">/</span> : null}
                    </span>
                ))}
            </nav>
        </Html3D>
    );
}
