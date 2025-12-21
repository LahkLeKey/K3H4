import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Section } from '../components/section'
import { domains } from '../data/domains'

export function HomePage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Portfolio"
                title="Kyle Halek — shipping resilient products"
                description="Full-stack product engineering across banking, logistics, staffing, and out-of-house advertising."
                actions={
                    <Button className="gap-2" asChild>
                        <Link to="/contact">
                            Contact
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                }
            >
                <div className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                    <div className="rounded-xl border bg-background/70 p-4">
                        <p className="font-medium">Location</p>
                        <p>Hastings, Minnesota</p>
                    </div>
                    <div className="rounded-xl border bg-background/70 p-4">
                        <p className="font-medium">Mode</p>
                        <p>Product engineering • Design systems</p>
                    </div>
                </div>
            </Section>

            <Section
                eyebrow="Projects"
                title="Active domains"
                description="Each domain will get authentication, dashboards, and workflows. Start exploring below."
            >
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {domains.map((domain) => (
                        <Card key={domain.path} className="h-full border bg-background/70">
                            <CardHeader className="space-y-1">
                                <CardTitle className="text-base">{domain.name}</CardTitle>
                                <CardDescription>{domain.headline}</CardDescription>
                            </CardHeader>
                            <div className="px-6 pb-6">
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to={domain.path}>Open</Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
