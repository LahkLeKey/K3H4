import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { bankingAccounts } from '../data/domains'

export function BankingPage() {
    return (
        <div className="space-y-6">
            <Section
                eyebrow="Banking SaaS"
                title="Secure, compliant, fast"
                description="Onboarding, KYC, treasury dashboards, and reporting pipelines built for trust and availability."
                actions={
                    <>
                        <Button>Sign in</Button>
                        <Button variant="outline">Open account</Button>
                    </>
                }
            />

            <Section
                eyebrow="Accounts"
                title="Customer accounts"
                description="Lightweight stub data until real APIs connect."
            >
                <div className="grid gap-3 sm:grid-cols-2">
                    {bankingAccounts.map((acct) => (
                        <Card key={acct.name} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{acct.name}</span>
                                <Badge variant="secondary">{acct.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Balance: {acct.balance}</p>
                            <p className="text-xs text-muted-foreground">KYC: {acct.kyc}</p>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
