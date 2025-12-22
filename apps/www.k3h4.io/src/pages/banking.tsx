import { useState } from 'react'

import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '../components/ui/dialog'
import { bankingAccounts, bankingBeneficiaries, bankingCompliance, bankingPayments, bankingTransactions } from '../data/domains'
import { Skeleton } from '../components/ui/skeleton'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../components/ui/empty'

export function BankingPage() {
    const [selectedPayment, setSelectedPayment] = useState<typeof bankingPayments[number] | null>(null)
    const [selectedBeneficiary, setSelectedBeneficiary] = useState<typeof bankingBeneficiaries[number] | null>(null)
    const [selectedTransaction, setSelectedTransaction] = useState<typeof bankingTransactions[number] | null>(null)
    const [columnsOpen, setColumnsOpen] = useState(false)

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
                        <Button variant="ghost">Invite controller</Button>
                    </>
                }
            />

            <Section
                eyebrow="Workbench"
                title="Daily shortcuts"
                description="Patterned after treasury portals: quick rails to move funds, set controls, and export evidence."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Funding</p>
                        <p className="font-medium">Move money</p>
                        <p className="text-xs text-muted-foreground">Wire, ACH, internal transfer</p>
                        <Button className="mt-3" size="sm" variant="outline">
                            Start transfer
                        </Button>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Controls</p>
                        <p className="font-medium">Roles & approvals</p>
                        <p className="text-xs text-muted-foreground">Dual control, limits, teams</p>
                        <Button className="mt-3" size="sm" variant="outline">
                            Manage policies
                        </Button>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Reporting</p>
                        <p className="font-medium">Export month-end</p>
                        <p className="text-xs text-muted-foreground">Trial balance, ledgers, CSV</p>
                        <Button className="mt-3" size="sm" variant="outline">
                            Download
                        </Button>
                    </Card>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-3">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Wallet</p>
                        <p className="font-medium">Cash</p>
                        <p className="text-xs text-muted-foreground">Operating • Savings</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Cards</p>
                        <p className="font-medium">Issue & limits</p>
                        <p className="text-xs text-muted-foreground">Virtual • Physical</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Accounting</p>
                        <p className="font-medium">Close-ready</p>
                        <p className="text-xs text-muted-foreground">Reports • Exports</p>
                    </Card>
                </div>
            </Section>

            <Section
                eyebrow="Signals"
                title="Status bar"
                description="Borrowed from enterprise treasury: at-a-glance health so finance doesn’t click around."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Availability</p>
                        <p className="text-2xl font-semibold">$764k</p>
                        <p className="text-xs text-muted-foreground">Cash + sweep eligible today</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Payments queued</p>
                        <p className="text-2xl font-semibold">3</p>
                        <p className="text-xs text-muted-foreground">Dual control enforced</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Exceptions</p>
                        <p className="text-2xl font-semibold text-amber-500">1</p>
                        <p className="text-xs text-muted-foreground">Wire hold requires review</p>
                    </Card>
                </div>
            </Section>

            <Section
                eyebrow="Snapshot"
                title="KPIs"
                description="Mirroring Brex/Ramp home: balances, burn, and upcoming payables with tiny trends."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">Cash on hand</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-semibold">$764,000</p>
                            <div className="h-1.5 rounded-full bg-muted">
                                <div className="h-full w-2/3 rounded-full bg-emerald-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">↑ 8% vs last 30 days</p>
                        </CardContent>
                    </Card>
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">Spend this month</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-semibold">$128,400</p>
                            <div className="h-1.5 rounded-full bg-muted">
                                <div className="h-full w-1/2 rounded-full bg-blue-500" />
                            </div>
                            <p className="text-xs text-muted-foreground">Top categories: vendors, travel</p>
                        </CardContent>
                    </Card>
                    <Card className="border bg-background/70">
                        <CardHeader>
                            <CardTitle className="text-sm text-muted-foreground">Upcoming payables</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <p className="text-2xl font-semibold">$64,000</p>
                            <p className="text-xs text-muted-foreground">Next 7 days • dual control on</p>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            <Section
                eyebrow="Policies"
                title="Budgets and limits"
                description="Progress bars nudge controllers when approaching policy thresholds."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    <Card className="border bg-background/70 p-4">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Travel budget</p>
                            <Badge variant="secondary">Policy</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Monthly cap $150k</p>
                        <div className="mt-3 h-2 rounded-full bg-muted">
                            <div className="h-full w-[72%] rounded-full bg-amber-500" />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">72% used • warn at 80%</p>
                    </Card>
                    <Card className="border bg-background/70 p-4">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Card limits</p>
                            <Badge variant="secondary">Cards</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Team cards with dual control</p>
                        <div className="mt-3 h-2 rounded-full bg-muted">
                            <div className="h-full w-[48%] rounded-full bg-emerald-500" />
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">48% utilization • healthy</p>
                    </Card>
                    <Card className="border bg-background/70 p-4">
                        <div className="flex items-center justify-between">
                            <p className="font-medium">Vendors</p>
                            <Badge variant="secondary">Risk</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Policy chips on risky vendors</p>
                        <div className="mt-3 flex gap-2 text-xs text-muted-foreground">
                            <Badge variant="outline">KYC strict</Badge>
                            <Badge variant="outline">FX hold</Badge>
                            <Badge variant="outline">Docs required</Badge>
                        </div>
                    </Card>
                </div>
            </Section>

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
                                <Badge variant={acct.status === 'Active' ? 'success' : 'warning'}>{acct.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">Balance: {acct.balance}</p>
                            <p className="text-xs text-muted-foreground">KYC: {acct.kyc}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Cash movement" title="Ledger-ready" description="Two lanes—processing vs. settled—to match how controllers work in tools like Brex/Ramp.">
                <div className="mb-3 flex items-center justify-between">
                    <div className="space-x-2 text-sm text-muted-foreground">
                        <Badge variant="outline">Columns pinned</Badge>
                        {columnsOpen ? <Badge variant="secondary">Custom view on</Badge> : <Badge variant="secondary">Default view</Badge>}
                    </div>
                    <div className="space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setColumnsOpen((prev) => !prev)}>
                            {columnsOpen ? 'Reset columns' : 'Customize columns'}
                        </Button>
                        <Button size="sm" variant="ghost">
                            Export CSV
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="processing" className="w-full">
                    <TabsList>
                        <TabsTrigger value="processing">Processing</TabsTrigger>
                        <TabsTrigger value="settled">Settled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="processing" className="mt-4">
                        <Table aria-label="Processing transactions">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bankingTransactions.map((trx) => (
                                    <TableRow key={trx.id}>
                                        <TableCell>{trx.id}</TableCell>
                                        <TableCell>{trx.account}</TableCell>
                                        <TableCell>{trx.type}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={trx.status === 'Settled' ? 'success' : trx.status === 'Processing' ? 'info' : 'warning'}
                                            >
                                                {trx.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Button size="sm" variant="outline">
                                                Approve
                                            </Button>
                                            <Button size="sm" variant="ghost">
                                                Receipt
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="ghost" onClick={() => setSelectedTransaction(trx)}>
                                                        Details
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Transaction detail</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-2 text-sm text-muted-foreground">
                                                        <p>ID: {selectedTransaction?.id}</p>
                                                        <p>Account: {selectedTransaction?.account}</p>
                                                        <p>Type: {selectedTransaction?.type}</p>
                                                        <p>Status: {selectedTransaction?.status}</p>
                                                        <p>Amount: {selectedTransaction?.amount}</p>
                                                        <p>Audit trail: approval pending • comments stub</p>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                        <TableCell className="text-right">{trx.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-3 flex gap-3">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </TabsContent>
                    <TabsContent value="settled" className="mt-4">
                        <Table aria-label="Settled transactions">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Type</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bankingTransactions.map((trx) => (
                                    <TableRow key={trx.id + '-settled'}>
                                        <TableCell>{trx.id}</TableCell>
                                        <TableCell>{trx.account}</TableCell>
                                        <TableCell>{trx.type}</TableCell>
                                        <TableCell>
                                            <Badge variant="success">Settled</Badge>
                                        </TableCell>
                                        <TableCell className="space-x-2">
                                            <Button size="sm" variant="ghost">
                                                Export
                                            </Button>
                                            <Button size="sm" variant="ghost" onClick={() => setSelectedTransaction(trx)}>
                                                Details
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">{trx.amount}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-3 flex gap-3">
                            <Skeleton className="h-8 w-28" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </TabsContent>
                </Tabs>
            </Section>

            <Section
                eyebrow="Disbursements"
                title="Payment queue"
                description="Pre-approval queue to move fast while keeping controls obvious."
            >
                <div className="mb-3 flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">Queued payments honor dual approvals and SLA timers.</div>
                    <div className="space-x-2">
                        <Button size="sm">Bulk approve</Button>
                        <Button size="sm" variant="outline">
                            Assign reviewer
                        </Button>
                    </div>
                </div>
                <Table aria-label="Payment queue">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Payment</TableHead>
                            <TableHead>Counterparty</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>SLA</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {bankingPayments.map((payment) => (
                            <TableRow key={payment.id}>
                                <TableCell>{payment.id}</TableCell>
                                <TableCell>{payment.counterparty}</TableCell>
                                <TableCell>{payment.method}</TableCell>
                                <TableCell>
                                    <Badge
                                        variant={payment.status === 'Approved' ? 'success' : payment.status === 'Ready' ? 'info' : 'warning'}
                                    >
                                        {payment.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant="secondary">Clears in 2d</Badge>
                                </TableCell>
                                <TableCell className="text-right">{payment.amount}</TableCell>
                                <TableCell className="text-right">
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button size="sm" variant="ghost" onClick={() => setSelectedPayment(payment)}>
                                                View
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent>
                                            <DialogHeader>
                                                <DialogTitle>Payment details</DialogTitle>
                                            </DialogHeader>
                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <p>ID: {selectedPayment?.id}</p>
                                                <p>Counterparty: {selectedPayment?.counterparty}</p>
                                                <p>Method: {selectedPayment?.method}</p>
                                                <p>Status: {selectedPayment?.status}</p>
                                                <p>Amount: {selectedPayment?.amount}</p>
                                                <p>Audit trail: approvals + comments stub</p>
                                            </div>
                                        </DialogContent>
                                    </Dialog>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="ghost">
                        Export queue
                    </Button>
                </div>
                <div className="mt-3">
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>No more queued payments</EmptyTitle>
                            <EmptyDescription>When cleared, this table empties automatically.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                </div>
            </Section>

            <Section
                eyebrow="Directory"
                title="Beneficiaries"
                description="Recognizable counterparties with risk and last-paid context to reduce search."
            >
                <div className="mb-3 flex gap-2 text-sm text-muted-foreground">
                    <Badge variant="muted">Type: All</Badge>
                    <Badge variant="muted">Risk: Any</Badge>
                    <Badge variant="muted">Filters stub</Badge>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                    {bankingBeneficiaries.map((beneficiary) => (
                        <Card key={beneficiary.name} className="rounded-xl border bg-background/70 p-4">
                            <p className="font-medium">{beneficiary.name}</p>
                            <p className="text-sm text-muted-foreground">{beneficiary.type}</p>
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <Badge variant={beneficiary.risk === 'Low' ? 'success' : 'warning'}>Risk: {beneficiary.risk}</Badge>
                                <span>Last paid: {beneficiary.lastPaid}</span>
                            </div>
                            <div className="mt-3 flex gap-2">
                                <Button size="sm" variant="outline">
                                    Freeze
                                </Button>
                                <Button size="sm" variant="ghost">
                                    Set limit
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="ghost" onClick={() => setSelectedBeneficiary(beneficiary)}>
                                            Details
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Beneficiary detail</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p>Name: {selectedBeneficiary?.name}</p>
                                            <p>Type: {selectedBeneficiary?.type}</p>
                                            <p>Risk: {selectedBeneficiary?.risk}</p>
                                            <p>Last paid: {selectedBeneficiary?.lastPaid}</p>
                                            <p>Audit: last change stub • comments stub</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Trust" title="Compliance checklist" description="Runbooks we can wire to audit and KYB providers.">
                <div className="grid gap-3 sm:grid-cols-3">
                    {bankingCompliance.map((item) => (
                        <Card key={item.title} className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">{item.owner}</p>
                            <p className="font-medium">{item.title}</p>
                            <Badge variant="secondary" className="mt-2">{item.status}</Badge>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
