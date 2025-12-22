import { useState } from 'react'

import { Button } from '../components/ui/button'
import { Card } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Section } from '../components/section'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { staffingCandidates, staffingInterviews, staffingOffers, staffingRoles } from '../data/domains'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog'
import { Skeleton } from '../components/ui/skeleton'
import { Empty, EmptyDescription, EmptyHeader, EmptyTitle } from '../components/ui/empty'

export function StaffingPage() {
    const [candidateView, setCandidateView] = useState<'list' | 'kanban'>('list')
    const [selectedCandidate, setSelectedCandidate] = useState<typeof staffingCandidates[number] | null>(null)

    return (
        <div className="space-y-6">
            <Section
                eyebrow="Staffing"
                title="Staffing"
                description="Applicant funnels, interviews, and assignments that keep talent flowing."
                actions={
                    <>
                        <Button>Post role</Button>
                        <Button variant="outline">Add candidate</Button>
                        <Button variant="ghost">Share intake</Button>
                    </>
                }
            />

            <Section
                eyebrow="Ops"
                title="Today’s focus"
                description="Modeled after leading ATS dashboards: surface the work before coordinators search."
            >
                <div className="grid gap-3 sm:grid-cols-4">
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Interviews</p>
                        <p className="text-2xl font-semibold">3</p>
                        <p className="text-xs text-muted-foreground">Prep packets queued</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Offers drafting</p>
                        <p className="text-2xl font-semibold">2</p>
                        <p className="text-xs text-muted-foreground">Comp + approvals</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">New applicants</p>
                        <p className="text-2xl font-semibold">14</p>
                        <p className="text-xs text-muted-foreground">Need triage</p>
                    </Card>
                    <Card className="rounded-xl border bg-background/70 p-4">
                        <p className="text-sm text-muted-foreground">Feedback overdue</p>
                        <p className="text-2xl font-semibold text-amber-500">5</p>
                        <p className="text-xs text-muted-foreground">SLA nudges interviewers</p>
                    </Card>
                </div>
            </Section>

            <Section eyebrow="Pipeline" title="Open roles" description="Stubbed roles until ATS/API integration is wired.">
                <Tabs defaultValue="active" className="w-full">
                    <TabsList>
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="paused">Paused</TabsTrigger>
                        <TabsTrigger value="filled">Filled</TabsTrigger>
                    </TabsList>
                    <TabsContent value="active" className="mt-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                            {staffingRoles.map((role) => (
                                <Card key={role.title} className="rounded-xl border bg-background/70 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="font-medium">{role.title}</span>
                                        <Badge variant={role.status === 'Open' ? 'success' : role.status === 'Interviewing' ? 'info' : 'warning'}>
                                            {role.status}
                                        </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{role.location}</p>
                                    <p className="text-xs text-muted-foreground">Applicants: {role.applicants}</p>
                                    <p className="text-xs text-muted-foreground">SLA: feedback due in 24h</p>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                    <TabsContent value="paused" className="mt-4">
                        <div className="rounded-xl border bg-background/70 p-4 text-sm text-muted-foreground">
                            Paused roles will appear when synced from ATS.
                        </div>
                    </TabsContent>
                    <TabsContent value="filled" className="mt-4">
                        <div className="rounded-xl border bg-background/70 p-4 text-sm text-muted-foreground">
                            Filled roles archive for reporting.
                        </div>
                    </TabsContent>
                </Tabs>
            </Section>

            <Section eyebrow="Candidates" title="Pipeline board" description="Ready to plug into Greenhouse/Lever webhooks.">
                <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
                    <div className="space-x-2">
                        <Button size="sm" variant={candidateView === 'list' ? 'secondary' : 'outline'} onClick={() => setCandidateView('list')}>
                            List
                        </Button>
                        <Button size="sm" variant={candidateView === 'kanban' ? 'secondary' : 'outline'} onClick={() => setCandidateView('kanban')}>
                            Kanban (stub)
                        </Button>
                    </div>
                    <div className="space-x-2 text-xs">
                        <Badge variant="outline">Bulk select ready</Badge>
                        <Badge variant="outline">Tags</Badge>
                    </div>
                </div>
                {candidateView === 'list' ? (
                    <>
                        <Table aria-label="Candidate list">
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Candidate</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Stage</TableHead>
                                    <TableHead>Last activity</TableHead>
                                    <TableHead>Tags</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {staffingCandidates.map((candidate) => (
                                    <TableRow key={candidate.name}>
                                        <TableCell>{candidate.name}</TableCell>
                                        <TableCell>{candidate.role}</TableCell>
                                        <TableCell>
                                            <Badge variant="info">{candidate.stage}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="secondary">Today</Badge>
                                        </TableCell>
                                        <TableCell className="space-x-1">
                                            <Badge variant="outline">Design</Badge>
                                            <Badge variant="outline">Referral</Badge>
                                        </TableCell>
                                        <TableCell className="text-right space-x-2">
                                            <Button size="sm" variant="outline">
                                                Advance
                                            </Button>
                                            <Button size="sm" variant="ghost">
                                                Email
                                            </Button>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <Button size="sm" variant="ghost" onClick={() => setSelectedCandidate(candidate)}>
                                                        Open
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>Candidate drawer</DialogTitle>
                                                    </DialogHeader>
                                                    <div className="space-y-2 text-sm text-muted-foreground">
                                                        <p>Name: {selectedCandidate?.name}</p>
                                                        <p>Role: {selectedCandidate?.role}</p>
                                                        <p>Stage: {selectedCandidate?.stage}</p>
                                                        <p>Scorecard: yes/no/mixed chips stub</p>
                                                        <p>Timeline: application • phone screen • onsite</p>
                                                        <p>Attachments stub</p>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                            <Button size="sm" variant="ghost">
                                                Reject
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <div className="mt-3 flex gap-3">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-20" />
                        </div>
                    </>
                ) : (
                    <Empty>
                        <EmptyHeader>
                            <EmptyTitle>No kanban data</EmptyTitle>
                            <EmptyDescription>Once enabled, drag candidates between stages.</EmptyDescription>
                        </EmptyHeader>
                    </Empty>
                )}
                <div className="mt-3 flex items-center justify-between rounded-xl border bg-background/70 p-3 text-sm text-muted-foreground">
                    <span>Bulk actions ready for selected candidates.</span>
                    <div className="space-x-2">
                        <Button size="sm" variant="outline">
                            Bulk email
                        </Button>
                        <Button size="sm" variant="outline">
                            Bulk advance
                        </Button>
                        <Button size="sm" variant="ghost">
                            Bulk reject
                        </Button>
                    </div>
                </div>
            </Section>

            <Section eyebrow="Schedule" title="Interviews today" description="Prepped with interviewer + format so coordinators can jump in.">
                <div className="grid gap-3 sm:grid-cols-3">
                    {staffingInterviews.map((slot) => (
                        <Card key={slot.time + slot.candidate} className="rounded-xl border bg-background/70 p-4">
                            <p className="text-sm text-muted-foreground">{slot.time}</p>
                            <p className="font-medium">{slot.candidate}</p>
                            <p className="text-sm text-muted-foreground">{slot.type}</p>
                            <p className="text-xs text-muted-foreground">Interviewer: {slot.interviewer}</p>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline" className="mt-3">
                                        Schedule
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Scheduling wizard</DialogTitle>
                                    </DialogHeader>
                                    <div className="space-y-2 text-sm text-muted-foreground">
                                        <p>Suggested slots: 9:00, 11:00, 2:00</p>
                                        <p>Pick interviewer: stub picker</p>
                                        <p>Awaiting feedback badges inline</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </Card>
                    ))}
                </div>
            </Section>

            <Section eyebrow="Offers" title="Offer packets" description="Drafts ready for comp review and signatures.">
                <div className="grid gap-3 sm:grid-cols-2">
                    {staffingOffers.map((offer) => (
                        <Card key={offer.candidate} className="rounded-xl border bg-background/70 p-4">
                            <div className="flex items-center justify-between">
                                <span className="font-medium">{offer.candidate}</span>
                                <Badge variant={offer.status === 'Drafting' ? 'info' : 'warning'}>{offer.status}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{offer.role}</p>
                            <p className="text-xs text-muted-foreground">{offer.comp}</p>
                            <Button size="sm" variant="outline" className="mt-3">
                                Open packet
                            </Button>
                        </Card>
                    ))}
                </div>
            </Section>
        </div>
    )
}
