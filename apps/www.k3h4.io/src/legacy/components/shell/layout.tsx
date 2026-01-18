import type { ReactNode, HTMLAttributes } from "react";

import { cn } from "../../lib/utils";

export type ShellLayoutProps = {
    children: ReactNode;
    className?: string;
} & HTMLAttributes<HTMLDivElement>;

export function ShellLayout({ children, className, ...rest }: ShellLayoutProps) {
    return <div className={cn("min-h-screen bg-background text-foreground", className)} {...rest}>{children}</div>;
}

export type ShellMainProps = {
    children: ReactNode;
    className?: string;
    widthClassName?: string;
};

export function ShellMain({ children, className, widthClassName }: ShellMainProps) {
    return (
        <main
            className={cn(
                "mx-auto flex w-full flex-col gap-8 px-6 pb-16 pt-8",
                widthClassName ?? "max-w-none",
                className,
            )}
        >
            {children}
        </main>
    );
}
