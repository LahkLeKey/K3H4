import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { logisticsLoads } from '../data/domains'

export function LogisticsPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Logistics"
                title="Shipping and load intelligence"
                description="Dispatch, routing, and carrier visibility with resilient UIs and live status."
                actions={
                    <>
                        <Button>Create shipment</Button>
                        <Button variant="outline">Add carrier</Button>
                    </>
                }
            />

            <Section eyebrow="Operations" title="Active loads" description="Stubbed loads shown until data hooks are wired.">
                <div className="grid gap-3 sm:grid-cols-2">
                    {logisticsLoads.map((load) => (
                        <Card key={load.id} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{load.id}</span>
                                <Badge variant="secondary">{load.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{load.route}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
