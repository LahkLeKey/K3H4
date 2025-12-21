import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { adCampaigns } from '../data/domains'

export function AdsPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Out-of-house ads"
                title="Logistics-driven advertising"
                description="Asset planning, inventory, and proof-of-placement tooling aligned to ops data."
                actions={
                    <>
                        <Button>Launch campaign</Button>
                        <Button variant="outline">Add asset</Button>
                    </>
                }
            />

            <Section eyebrow="Campaigns" title="Live & planned" description="Stubbed campaigns until data hooks are wired.">
                <div className="grid gap-3 sm:grid-cols-2">
                    {adCampaigns.map((ad) => (
                        <Card key={ad.name} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{ad.name}</span>
                                <Badge variant="secondary">{ad.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Spend: {ad.spend}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
