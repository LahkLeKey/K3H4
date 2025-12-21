import { Section } from '../components/section'
import { Card } from '../components/ui/card'
import { inboxItems } from '../data/domains'

export function InboxPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Inbox"
                title="System and ops updates"
                description="Messages across banking, logistics, staffing, and ad ops."
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    {inboxItems.map((item) => (
                        <Card key={item.subject} className="rounded-xl border bg-background/70 p-4 space-y-1">
                            <p className="text-sm text-muted-foreground">{item.from}</p>
                            <p className="font-medium">{item.subject}</p>
                            <p className="text-xs text-muted-foreground">{item.time}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
