import { type ReactNode } from 'react'

import { cn } from '../lib/utils'

export type SectionProps = {
    eyebrow?: string
    title: string
    description?: string
    actions?: ReactNode
    children?: ReactNode
    className?: string
    align?: 'left' | 'center'
}

export function Section({ eyebrow, title, description, actions, children, className, align = 'left' }: SectionProps) {
    const isCenter = align === 'center'
    return (
        <section className={cn('glass-surface grid gap-6 rounded-2xl p-6 md:p-8', className)}>
            <div className={cn('flex flex-wrap items-start gap-3', isCenter ? 'justify-center text-center' : 'justify-between')}>
                <div className={cn('space-y-1', isCenter ? 'items-center' : 'items-start')}>
                    {eyebrow ? (
                        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{eyebrow}</p>
                    ) : null}
                    <h2 className="text-xl font-semibold md:text-2xl">{title}</h2>
                    {description ? (
                        <p className={cn('text-sm text-muted-foreground', isCenter ? 'mx-auto max-w-3xl' : 'max-w-2xl')}>
                            {description}
                        </p>
                    ) : null}
                </div>
                {actions && !isCenter ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
            </div>
            {children}
        </section>
    )
}
