import { Link, useLocation } from 'react-router-dom'
import { Bell, Home, Search } from 'lucide-react'
import type { PropsWithChildren } from 'react'

import { Button } from './ui/button'
import { Input } from './ui/input'
import { cn } from '../lib/utils'

const navItems = [{ to: '/', label: 'Home', icon: Home }]

export function Shell({ children }: PropsWithChildren) {
    const location = useLocation()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-30 border-b bg-background/80 backdrop-blur">
                <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-3 px-4 py-4">
                    <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
                        <div className="h-8 w-8 rounded-full bg-primary/10" />
                        <span>K3H4</span>
                    </Link>
                    <nav className="flex flex-1 flex-wrap items-center gap-2 text-sm">
                        {navItems.map((item) => {
                            const active = location.pathname === item.to
                            return (
                                <Link
                                    key={item.to}
                                    to={item.to}
                                    className={cn(
                                        'rounded-full px-3 py-1.5 transition hover:bg-accent',
                                        active ? 'bg-accent text-foreground' : 'text-muted-foreground'
                                    )}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>
                    <div className="flex items-center gap-2">
                        <div className="relative hidden sm:block">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                            <Input
                                className="h-9 w-56 pl-9"
                                placeholder="Search (disabled)"
                                aria-label="Search"
                                disabled
                            />
                        </div>
                        <Button variant="ghost" size="icon" aria-label="Notifications" disabled>
                            <Bell className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </header>

            <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pb-16 pt-8">
                {children}
            </main>
        </div>
    )
}
