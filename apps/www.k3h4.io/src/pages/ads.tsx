import { useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { adCampaigns, adFlights, adPlacements, adProofQueue } from '../data/domains'
import { Progress } from '../components/ui/progress'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../components/ui/empty'
import { Skeleton } from '../components/ui/skeleton'

export function AdsPage() {
    const [placementView, setPlacementView] = useState<'list' | 'map'>('list')

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
                        <Button variant="ghost">Upload proof</Button>
                    </>
                }
            />

            <Section eyebrow="Campaigns" title="Live & planned" description="Borrowed from OOH platforms: tabs for status with CPM and spend up front.">
                <Tabs defaultValue="active" className="w-full">
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                        <TabsTrigger value="planning">Planning</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active" className="mt-4">
                        <Table aria-label="Active campaigns">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Campaign</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>CPM</TableHead>
                                    <TableHead>Goal</TableHead>
                                    <TableHead className="text-right">Spend</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adCampaigns.map((ad, idx) => (
                                    <TableRow key={ad.name}>
                                        <TableCell className="space-y-1">
                                            <p>{ad.name}</p>
                                            <Progress value={[70, 55, 30][idx] ?? 40} />
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant={ad.status === 'Live' ? 'success' : ad.status === 'Paused' ? 'warning' : 'info'}>
                                                {ad.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{ad.cpm}</TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Impressions goal</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{ad.spend}</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <div className="flex items-center gap-3">
                                            <Skeleton className="h-6 w-1/4" />
                                            <Skeleton className="h-6 w-1/6" />
                                            <Skeleton className="h-6 w-1/6" />
                                            <Skeleton className="h-6 w-1/6" />
                                        </div>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="paused" className="mt-4">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>No paused campaigns</EmptyTitle>
                                <EmptyDescription>Bring paused flights here once delivery pauses.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </TabsContent>
                    <TabsContent value="planning" className="mt-4">
                        <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
                            <div className="space-y-3">
                                {[1, 2, 3, 4, 5].map((step) => (
                                    <Card key={step} className="rounded-xl border bg-background/70 p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <Badge variant="secondary">Step {step}</Badge>
                                                <p className="font-medium">
                                                    {['Audience', 'Inventory', 'Flight & Budget', 'Creatives', 'Review'][step - 1]}
                                                </p>
                                            </div>
                                            <Badge variant="outline">In progress</Badge>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            {step === 1 && 'Target: logistics decision-makers, retarget site visitors.'}
                                            {step === 2 && 'Select venues and DMA; map + list toggle for inventory.'}
                                            {step === 3 && 'Set dates, budget caps, and pacing rules.'}
                                            {step === 4 && 'Upload/edit creatives and specs.'}
                                            {step === 5 && 'Review summary before launch.'}
                                        </p>
                                    </Card>
                                ))}
                            </div>
                            <Card className="rounded-xl border bg-background/70 p-4">
                                <p className="text-sm text-muted-foreground">Insights</p>
                                <p className="text-lg font-semibold">Inventory summary</p>
                                <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                                    <p>Venues selected: 42</p>
                                    <p>Est. impressions: 1.2M</p>
                                    <p>Est. spend: $48.2k</p>
                                    <p>Formats: billboard, transit, place-based</p>
                                </div>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </Section>

            <Section eyebrow="Inventory" title="Placements" description="Proof-of-performance mocks we can later store and reconcile.">
                <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="space-x-2">
                        <Button size="sm" variant={placementView === 'list' ? 'secondary' : 'outline'} onClick={() => setPlacementView('list')}>
                            List
                        </Button>
                        <Button size="sm" variant={placementView === 'map' ? 'secondary' : 'outline'} onClick={() => setPlacementView('map')}>
                            Map
                        </Button>
                    </div>
                    <div className="space-x-2">
                        <Badge variant="outline">Format: Any</Badge>
                        <Badge variant="outline">Environment: Any</Badge>
                        <Badge variant="outline">DMA: Any</Badge>
                    </div>
                </div>
                {placementView === 'map' ? (
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Map view</p>
                        <div className="mt-2 h-48 rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
                        <p className="mt-2 text-xs text-muted-foreground">Inventory pins stub with list sidecar.</p>
                    </Card>
                ) : (
                    <div className="grid gap-3 sm:grid-cols-3">
                        {adPlacements.map((placement) => (
                            <Card key={placement.id} className="rounded-xl border bg-background/70 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{placement.id}</span>
                                    <Badge
                                        variant={
                                            placement.status === 'Installed'
                                                ? 'success'
                                                : placement.status === 'Scheduled'
                                                    ? 'info'
                                                    : 'muted'
                                        }
                                    >
                                        {placement.status}
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{placement.location}</p>
                                <p className="text-xs text-muted-foreground">Proof: {placement.proof}</p>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" variant="outline" className="mt-3">
                                            Add to plan
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Placement insight</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-2 text-sm text-muted-foreground">
                                            <p>Est. impressions: 120k</p>
                                            <p>CPM target: $8.50</p>
                                            <p>Environment: Transit</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </Card>
                        ))}
                    </div>
                )}
            </Section>

            <Section eyebrow="Proof" title="Submission queue" description="Make it obvious who owes creative or proof so teams don’t search threads.">
                <Table aria-label="Proof submission queue">
                    <TableHeader>
                        <TableRow>
                            <TableHead>Proof</TableHead>
                            <TableHead>Placement</TableHead>
                            <TableHead>Owner</TableHead>
                            <TableHead>Due</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {adProofQueue.map((proof) => (
                            <TableRow key={proof.id}>
                                <TableCell>{proof.id}</TableCell>
                                <TableCell>{proof.placement}</TableCell>
                                <TableCell>{proof.owner}</TableCell>
                                <TableCell>
                                    <Badge variant={proof.due === 'Today' ? 'warning' : 'info'}>{proof.due}</Badge>
                                </TableCell>
                                <TableCell className="text-right space-x-2">
                                    <Button size="sm" variant="outline">
                                        Request
                                    </Button>
                                    <Button size="sm" variant="ghost">
                                        Upload
                                    </Button>
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
            </Section>

            <Section eyebrow="Flights" title="Flight windows" description="Lock/draft states so ops sees timing without recalling dates.">
                <div className="grid gap-3 lg:grid-cols-[2fr_1fr]">
                    <div className="space-y-3">
                        {adFlights.map((flight) => (
                            <Card key={flight.window} className="rounded-xl border bg-background/70 p-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium">{flight.window}</span>
                                    <Badge variant={flight.status === 'Locked' ? 'success' : 'info'}>{flight.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{flight.campaign}</p>
                                <div className="mt-2 flex gap-2 text-xs text-muted-foreground">
                                    <Badge variant="outline">Upcoming</Badge>
                                    <Badge variant="outline">Edit allowed</Badge>
                                </div>
                                <Button size="sm" variant="outline" className="mt-3">
                                    Edit flight
                                </Button>
                            </Card>
                        ))}
                    </div>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Performance summary</p>
                        <div className="mt-2 space-y-2 text-sm text-muted-foreground">
                            <p>Delivery vs goal: 72%</p>
                            <Progress value={72} />
                            <p>Spend vs budget: $12.4k of $18k</p>
                            <Progress value={68} />
                        </div>
                    </Card>
                </div>
            </Section>

            <Section eyebrow="Detail" title="Campaign detail" description="Tabs modeled after OOH platforms: overview, performance, locations, creatives, settings.">
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="performance">Performance</TabsTrigger>
                        <TabsTrigger value="locations">Locations</TabsTrigger>
                        <TabsTrigger value="creatives">Creatives</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-4 grid gap-3 sm:grid-cols-3">
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Status</p>
                            <p className="font-medium">Live</p>
                            <Badge variant="success" className="mt-2">Pacing ok</Badge>
                        </Card>
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Goal</p>
                            <p className="font-medium">1.5M impressions</p>
                            <p className="text-xs text-muted-foreground">Budget $22k</p>
                        </Card>
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Flight</p>
                            <p className="font-medium">Jan 2 → Jan 16</p>
                            <p className="text-xs text-muted-foreground">Edit in Flights</p>
                        </Card>
                    </TabsContent>
                    <TabsContent value="performance" className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Delivery vs goal</p>
                            <Progress value={72} />
                            <p className="text-xs text-muted-foreground">72% delivered</p>
                        </Card>
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Spend vs budget</p>
                            <Progress value={68} />
                            <p className="text-xs text-muted-foreground">$12.4k of $18k</p>
                        </Card>
                    </TabsContent>
                    <TabsContent value="locations" className="mt-4">
                        <Table aria-label="Campaign locations detail">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Venue</TableHead>
                                    <TableHead>DMA</TableHead>
                                    <TableHead>Format</TableHead>
                                    <TableHead className="text-right">Est. impressions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {adPlacements.map((placement) => (
                                    <TableRow key={placement.id + '-detail'}>
                                        <TableCell>{placement.location}</TableCell>
                                        <TableCell>MSP</TableCell>
                                        <TableCell>Transit</TableCell>
                                        <TableCell className="text-right">120k</TableCell>
                                    </TableRow>
                                ))}
                                <TableRow>
                                    <TableCell colSpan={4}>
                                        <Skeleton className="h-6 w-1/2" />
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="creatives" className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Billboard set</p>
                            <p className="text-xs text-muted-foreground">JPG/MP4 • 300x600</p>
                            <Button size="sm" variant="outline" className="mt-3">
                                Upload replacement
                            </Button>
                        </Card>
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">Transit wraps</p>
                            <p className="text-xs text-muted-foreground">PDF • Specs linked</p>
                            <Button size="sm" variant="ghost" className="mt-3">
                                Download spec
                            </Button>
                        </Card>
                    </TabsContent>
                    <TabsContent value="settings" className="mt-4 grid gap-3 sm:grid-cols-2">
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="font-medium">Pacing rule</p>
                            <p className="text-sm text-muted-foreground">Even delivery over flight</p>
                            <Button size="sm" variant="outline" className="mt-3">
                                Edit pacing
                            </Button>
                        </Card>
                        <Card className="rounded-xl border bg-background/70 p-4">
                            <p className="font-medium">Frequency cap</p>
                            <p className="text-sm text-muted-foreground">3 / 24h per device</p>
                            <Button size="sm" variant="ghost" className="mt-3">
                                Adjust cap
                            </Button>
                        </Card>
                    </TabsContent>
                </Tabs>
            </Section>
        </div>
    )
}
