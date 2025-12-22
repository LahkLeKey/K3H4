import { useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { logisticsExceptions, logisticsLanes, logisticsLoads, logisticsPlaybooks } from '../data/domains'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Skeleton } from '../components/ui/skeleton'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../components/ui/empty'

export function LogisticsPage() {
    const [selectedLoad, setSelectedLoad] = useState<typeof logisticsLoads[number] | null>(null)
    const [selectedPlaybook, setSelectedPlaybook] = useState<typeof logisticsPlaybooks[number] | null>(null)

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
                        <Button variant="ghost">Open tower</Button>
                    </>
                }
            />

            <Section
                eyebrow="Control tower"
                title="Status at a glance"
                description="Recognizable summaries for dispatchers—no hunting for tiles."
            >
                <div className="grid gap-3 sm:grid-cols-4">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">In transit</p>
                        <p className="text-2xl font-semibold">18</p>
                        <p className="text-xs text-muted-foreground">Auto-tracking with geofences</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">At risk</p>
                        <p className="text-2xl font-semibold text-amber-500">4</p>
                        <p className="text-xs text-muted-foreground">Delays, temp, or route change</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">OTIF</p>
                        <p className="text-2xl font-semibold">94%</p>
                        <p className="text-xs text-muted-foreground">On-time, in-full KPI</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Tasks</p>
                        <p className="text-2xl font-semibold">7</p>
                        <p className="text-xs text-muted-foreground">Docs, check calls, customs</p>
                    </Card>
                </div>
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Map snapshot</p>
                        <div className="mt-2 h-32 rounded-lg bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700" />
                        <p className="mt-2 text-xs text-muted-foreground">Mini map placeholder for lane density</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Task queue</p>
                        <div className="mt-2 space-y-2 text-xs text-muted-foreground">
                            <p>• Collect POD for L-883</p>
                            <p>• Rebook carrier for L-882</p>
                            <p>• Confirm temp logs for L-877</p>
                        </div>
                    </Card>
                </div>
            </Section>

            <Section eyebrow="Operations" title="Active loads" description="Stubbed loads shown until data hooks are wired.">
                <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="space-x-2">
                        <Badge variant="outline">All</Badge>
                        <Badge variant="outline">In transit</Badge>
                        <Badge variant="outline">Delayed</Badge>
                        <Badge variant="outline">Delivered</Badge>
                    </div>
                    <div className="space-x-2">
                        <Badge variant="secondary">Origin: Any</Badge>
                        <Badge variant="secondary">Destination: Any</Badge>
                        <Badge variant="secondary">Carrier: Any</Badge>
                    </div>
                </div>
                <Tabs defaultValue="live" className="w-full">
                    <TabsList>
                        <TabsTrigger value="live">Live</TabsTrigger>
                        <TabsTrigger value="risk">At risk</TabsTrigger>
                        <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    </TabsList>
                    <TabsContent value="live" className="mt-4">
                        <Table aria-label="Live shipments">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Load</TableHead>
                                    <TableHead>Route</TableHead>
                                    <TableHead>Carrier</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Mode</TableHead>
                                    <TableHead className="text-right">ETA</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {logisticsLoads.map((load) => (
                                    <TableRow key={load.id}>
                                        <TableCell>{load.id}</TableCell>
                                        <TableCell>{load.route}</TableCell>
                                        <TableCell>{load.carrier}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={load.status === 'Delivered' ? 'success' : load.status === 'Awaiting pickup' ? 'warning' : 'info'}
                                            >
                                                {load.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="muted">FTL</Badge>
                                        </TableCell>
                                        <TableCell className="text-right">{load.eta}</TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="sm" variant="outline">
                                                Assign
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="ghost" onClick={() => setSelectedLoad(load)}>
                                                        Detail
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Shipment detail</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-2 text-sm text-muted-foreground">
                                                        <p>ID: {selectedLoad?.id}</p>
                                                        <p>Route: {selectedLoad?.route}</p>
                                                        <p>Carrier: {selectedLoad?.carrier}</p>
                                                        <p>Status: {selectedLoad?.status}</p>
                                                        <p>Timeline: depart • hub • out for delivery</p>
                                                        <p>Documents: BOL/POD stub • tasks tab placeholder</p>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-3 flex gap-3">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-32" />
                        </div>
                    </TabsContent>
                    <TabsContent value="risk" className="mt-4">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>No risky loads</EmptyTitle>
                                <EmptyDescription>Telemetry will surface risk automatically.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </TabsContent>
                    <TabsContent value="delivered" className="mt-4">
                        <Empty>
                            <EmptyHeader>
                                <EmptyTitle>No delivered loads yet</EmptyTitle>
                                <EmptyDescription>Closed loads will land here with PODs.</EmptyDescription>
                            </EmptyHeader>
                        </Empty>
                    </TabsContent>
                </Tabs>
            </Section>

            <Section eyebrow="Exceptions" title="Issue queue" description="Surface exceptions we can later feed from TMS webhooks.">
                <div className="grid gap-3 sm:grid-cols-2">
                    {logisticsExceptions.map((issue) => (
                        <Card key={issue.id} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{issue.id}</span>
                                <Badge variant={issue.severity === 'High' ? 'danger' : 'warning'}>{issue.severity}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{issue.type} on {issue.load}</p>
                            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                                <Badge variant="warning">SLA: 2h</Badge>
                                <Button size="sm" variant="ghost">
                                    Assign owner
                                </Button>
                            </div>
                            <p className="text-xs text-muted-foreground">Action: {issue.action}</p>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section
                eyebrow="Playbooks"
                title="Guided resolutions"
                description="Pre-baked responses for common issues—recognition over recall."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    {logisticsPlaybooks.map((play) => (
                        <Card key={play.title} className="rounded-xl border bg-background/70 p-4">
                            <p className="font-medium">{play.title}</p>
                            <p className="text-sm text-muted-foreground">{play.steps}</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="mt-3" onClick={() => setSelectedPlaybook(play)}>
                                        Run steps
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Playbook steps</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>Playbook: {selectedPlaybook?.title}</p>
                                        <p>Checklist stub with documents/tasks tabs</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section
                eyebrow="Network"
                title="Lane templates"
                description="Cost and service cues so planners select lanes without remembering codes."
            >
                <div className="grid gap-3 sm:grid-cols-3">
                    {logisticsLanes.map((lane) => (
                        <Card key={lane.name} className="rounded-xl border bg-background/70 p-4">
                            <p className="font-medium">{lane.name}</p>
                            <p className="text-sm text-muted-foreground">{lane.service} • {lane.cost}</p>
                            <p className="text-xs text-muted-foreground">Score: {lane.score}</p>
                            <Button size="sm" variant="ghost" className="mt-3">
                                Apply template
                            </Button>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
