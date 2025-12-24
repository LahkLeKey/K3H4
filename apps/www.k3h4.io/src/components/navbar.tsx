import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

import { Button } from './ui/button'

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>K3H4 Auth</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link to="/">Home</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
