import { type ReactNode } from 'react'

import { cn } from '../lib/utils'

export type SectionProps = {
    eyebrow?: string
    title: string
    description?: string
    actions?: ReactNode
    children?: ReactNode
    className?: string
}

export function Section({ eyebrow, title, description, actions, children, className }: SectionProps) {
    return (
        <section className={cn('glass-surface grid gap-6 rounded-2xl p-6 md:p-8', className)}>
            <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1">
                    {eyebrow ? (
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
                    ) : null}
                    <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
                    {description ? <p className="max-w-2xl text-sm text-muted-foreground">{description}</p> : null}
                </div>
                {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
            </div>
            {children}
        </section>
    )
}
