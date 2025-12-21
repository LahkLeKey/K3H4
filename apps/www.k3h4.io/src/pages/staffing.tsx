import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { staffingRoles } from '../data/domains'

export function StaffingPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Staffing"
                title="Placements that move fast"
                description="Applicant funnels, interviews, and assignments that keep talent flowing."
                actions={
                    <>
                        <Button>Post role</Button>
                        <Button variant="outline">Add candidate</Button>
                    </>
                }
            />

            <Section eyebrow="Pipeline" title="Open roles" description="Stubbed roles until ATS/API integration is wired.">
                <div className="grid gap-3 sm:grid-cols-2">
                    {staffingRoles.map((role) => (
                        <Card key={role.title} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{role.title}</span>
                                <Badge variant="secondary">{role.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{role.location}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
