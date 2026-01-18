export type BreadcrumbItem = {
    key: string;
    label: string;
    href?: string;
};

export type Breadcrumbs2DProps = {
    items: BreadcrumbItem[];
    className?: string;
};

export function Breadcrumbs2D({ items, className = "" }: Breadcrumbs2DProps) {
    return (
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
    );
}
