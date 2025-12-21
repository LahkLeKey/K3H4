import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

import { Button } from './ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from './ui/dropdown-menu'

export function Navbar() {
    return (
        <header className="sticky top-0 z-40 w-full backdrop-blur">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
                <Link to="/" className="flex items-center gap-2 text-sm font-semibold">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span>K3H4 · Kyle Halek</span>
                </Link>

                <div className="flex items-center gap-2">
                    <Button variant="ghost" asChild>
                        <Link to="/">Home</Link>
                    </Button>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost">Projects</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                                <Link to="/banking">Banking</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/logistics">Logistics</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/staffing">Staffing</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/ads">Ads</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                                <Link to="/inbox">Inbox</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <Button variant="ghost" asChild>
                        <Link to="/ui">UI kit</Link>
                    </Button>

                    <Button variant="outline" className="gap-2" asChild>
                        <Link to="/contact">Contact</Link>
                    </Button>
                </div>
            </div>
        </header>
    )
}
