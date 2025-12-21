import { Button } from '../components/ui/button'
import { Card, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Section } from '../components/section'

export function ContactPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Contact"
                title="Let’s build something"
                description="Product engineering, design systems, and resilient UI delivery. Based in Hastings, Minnesota and collaborating remotely."
                actions={
                    <Button asChild>
                        <a href="mailto:hi@k3h4.io">Email Kyle</a>
                    </Button>
                }
            />

            <Section title="Details" description="Availability and response times">
                <div className="grid gap-4 sm:grid-cols-2">
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle>Email</CardTitle>
                            <CardDescription>Fastest response for projects and collabs.</CardDescription>
                        </CardHeader>
                    </Card>
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle>Availability</CardTitle>
                            <CardDescription>Product pods, design systems, UI modernization.</CardDescription>
                        </CardHeader>
                    </Card>
                </div>
            </Section>
        </div>
    )
}
