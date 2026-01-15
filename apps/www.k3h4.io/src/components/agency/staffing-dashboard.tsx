import { useMemo } from "react";
import type { ReactNode } from "react";
import { Activity, BriefcaseBusiness, CalendarClock, ClipboardCheck, Clock4, MapPin, Target, Users } from "lucide-react";

import { useLocalStore } from "../../lib/store";
import {
    useCreateCandidateMutation,
    useCreateEngagementMutation,
    useCreatePlacementMutation,
    useCreateRoleMutation,
    useCreateShiftMutation,
    useStaffingDashboardQuery,
    useUpdateCandidateStageMutation,
    type StaffingCandidate,
    type StaffingDashboard,
} from "../../hooks/use-staffing-queries";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export type StaffingDashboardProps = {
    apiBase: string;
    personaOptions: Array<{ id: string; alias: string; account: string; handle?: string | null }>;
};

const stageOrder = ["prospect", "screening", "interview", "offer", "placed", "archived"] as const;

const defaultDateInput = (offsetHours: number) => new Date(Date.now() + offsetHours * 3600 * 1000).toISOString().slice(0, 16);

const getBudgetLabel = (dashboard?: StaffingDashboard | undefined) => {
    if (!dashboard?.engagements.length) return "0";
    const budgets = dashboard.engagements
        .map((eng) => Number(eng.budget ?? 0))
        .filter((val) => Number.isFinite(val));
    const total = budgets.reduce((sum, val) => sum + val, 0);
    return total.toLocaleString(undefined, { minimumFractionDigits: 0 });
};

export function StaffingDashboard({ apiBase, personaOptions }: StaffingDashboardProps) {
    const staffing = useStaffingDashboardQuery(apiBase);
    const createEngagement = useCreateEngagementMutation(apiBase);
    const createRole = useCreateRoleMutation(apiBase);
    const createCandidate = useCreateCandidateMutation(apiBase);
    const updateCandidateStage = useUpdateCandidateStageMutation(apiBase);
    const createShift = useCreateShiftMutation(apiBase);
    const createPlacement = useCreatePlacementMutation(apiBase);

    const uiStore = useLocalStore(() => ({
        engagementForm: { name: "Peak ops pod", client: "ACME Logistics", priority: "high", budget: "45000", startDate: "" },
        roleForm: { title: "Weekend Shift Lead", engagementId: "", openings: "2", rateMin: "90", rateMax: "140", modality: "Hybrid", location: "Seattle" },
        candidateForm: { fullName: "", roleId: "", stage: "prospect", desiredRate: "120", score: "0.85", personaId: "", availability: "Immediately" },
        shiftForm: { roleId: "", title: "Friday swing shift", location: "Warehouse A", startsAt: defaultDateInput(2), endsAt: defaultDateInput(6), assignedPersonaId: "", notes: "Cover inbound unload" },
        placementForm: { roleId: "", candidateId: "", personaId: "", startDate: defaultDateInput(24), billRate: "145", payRate: "112", status: "active" },
        inlineError: "",
    }));

    const { engagementForm, roleForm, candidateForm, shiftForm, placementForm, inlineError } = uiStore.useShallow((state) => state);
    const setInlineError = (value: string) => uiStore.setState({ inlineError: value });
    const setEngagementForm = (updater: (prev: typeof engagementForm) => typeof engagementForm) => uiStore.setState((prev) => ({ engagementForm: updater(prev.engagementForm) }));
    const setRoleForm = (updater: (prev: typeof roleForm) => typeof roleForm) => uiStore.setState((prev) => ({ roleForm: updater(prev.roleForm) }));
    const setCandidateForm = (updater: (prev: typeof candidateForm) => typeof candidateForm) => uiStore.setState((prev) => ({ candidateForm: updater(prev.candidateForm) }));
    const setShiftForm = (updater: (prev: typeof shiftForm) => typeof shiftForm) => uiStore.setState((prev) => ({ shiftForm: updater(prev.shiftForm) }));
    const setPlacementForm = (updater: (prev: typeof placementForm) => typeof placementForm) => uiStore.setState((prev) => ({ placementForm: updater(prev.placementForm) }));

    const handleCreateEngagement = async () => {
        if (!engagementForm.name.trim()) {
            setInlineError("Engagement name is required");
            return;
        }
        try {
            await createEngagement.mutateAsync({
                name: engagementForm.name.trim(),
                client: engagementForm.client?.trim(),
                priority: engagementForm.priority,
                budget: engagementForm.budget,
                startDate: engagementForm.startDate,
            });
            setEngagementForm((prev) => ({ ...prev, name: "", client: prev.client, budget: prev.budget }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to create engagement");
        }
    };

    const handleCreateRole = async () => {
        if (!roleForm.title.trim()) {
            setInlineError("Role title is required");
            return;
        }
        try {
            await createRole.mutateAsync({
                engagementId: roleForm.engagementId || undefined,
                title: roleForm.title.trim(),
                location: roleForm.location,
                modality: roleForm.modality,
                openings: Number(roleForm.openings || 1),
                rateMin: roleForm.rateMin,
                rateMax: roleForm.rateMax,
                priority: "normal",
                tags: roleForm.modality,
            });
            setRoleForm((prev) => ({ ...prev, title: "", openings: prev.openings, rateMin: prev.rateMin, rateMax: prev.rateMax }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to create role");
        }
    };

    const handleCreateCandidate = async () => {
        if (!candidateForm.fullName.trim()) {
            setInlineError("Candidate name is required");
            return;
        }
        try {
            await createCandidate.mutateAsync({
                fullName: candidateForm.fullName.trim(),
                roleId: candidateForm.roleId || undefined,
                stage: candidateForm.stage,
                desiredRate: candidateForm.desiredRate,
                score: candidateForm.score,
                personaId: candidateForm.personaId || undefined,
                availability: candidateForm.availability,
            });
            setCandidateForm((prev) => ({ ...prev, fullName: "", personaId: prev.personaId }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to add candidate");
        }
    };

    const handleCreateShift = async () => {
        if (!shiftForm.title.trim()) {
            setInlineError("Shift title is required");
            return;
        }
        try {
            await createShift.mutateAsync({
                roleId: shiftForm.roleId || undefined,
                title: shiftForm.title.trim(),
                location: shiftForm.location,
                startsAt: shiftForm.startsAt,
                endsAt: shiftForm.endsAt,
                coverageStatus: shiftForm.assignedPersonaId ? "covered" : "unfilled",
                assignedPersonaId: shiftForm.assignedPersonaId || undefined,
                notes: shiftForm.notes,
            });
            setShiftForm((prev) => ({ ...prev, title: "", assignedPersonaId: "", notes: "" }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to schedule shift");
        }
    };

    const handleCreatePlacement = async () => {
        if (!placementForm.startDate) {
            setInlineError("Placement start date is required");
            return;
        }
        const roleEngagementId = placementForm.roleId
            ? staffing.data?.roles.find((role) => role.id === placementForm.roleId)?.engagementId
            : undefined;
        try {
            await createPlacement.mutateAsync({
                engagementId: roleEngagementId || undefined,
                roleId: placementForm.roleId || undefined,
                candidateId: placementForm.candidateId || undefined,
                personaId: placementForm.personaId || undefined,
                startDate: placementForm.startDate,
                billRate: placementForm.billRate,
                payRate: placementForm.payRate,
                status: placementForm.status,
            });
            setPlacementForm((prev) => ({ ...prev, candidateId: "", personaId: prev.personaId }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to book placement");
        }
    };

    const buckets = useMemo(() => {
        const grouped: Record<string, StaffingCandidate[]> = {};
        stageOrder.forEach((stage) => { grouped[stage] = []; });
        if (staffing.data?.candidates) {
            staffing.data.candidates.forEach((candidate) => {
                const stage = stageOrder.includes(candidate.stage as typeof stageOrder[number]) ? candidate.stage : "prospect";
                grouped[stage].push(candidate);
            });
        }
        return grouped;
    }, [staffing.data?.candidates]);

    return (
        <Card className="border bg-background/80">
            <CardHeader className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
                <div className="space-y-1">
                    <CardTitle className="text-lg">Staffing dashboard</CardTitle>
                    <p className="text-sm text-muted-foreground">Pipeline, shift coverage, and bookings alongside payroll flows.</p>
                </div>
                <div className="flex flex-wrap gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    <Badge variant="secondary" className="inline-flex items-center gap-1"><BriefcaseBusiness className="h-4 w-4" /> Active {staffing.data?.metrics.openRoles ?? 0} roles</Badge>
                    <Badge variant="secondary" className="inline-flex items-center gap-1"><Users className="h-4 w-4" /> {staffing.data?.metrics.activeCandidates ?? 0} candidates</Badge>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
                {staffing.error ? <p className="text-sm text-destructive">{(staffing.error as Error).message}</p> : null}

                <div className="grid gap-3 md:grid-cols-4">
                    <MetricCard label="Open roles" value={staffing.data?.metrics.openRoles ?? 0} icon={<BriefcaseBusiness className="h-4 w-4" />} />
                    <MetricCard label="Pipeline" value={staffing.data?.metrics.activeCandidates ?? 0} secondary="active candidates" icon={<Users className="h-4 w-4" />} />
                    <MetricCard label="Coverage" value={`${staffing.data?.metrics.fillRate ?? 0}%`} secondary="fill rate" icon={<Target className="h-4 w-4" />} />
                    <MetricCard label="Budgeted" value={`₭${getBudgetLabel(staffing.data)}`} secondary="across engagements" icon={<Clock4 className="h-4 w-4" />} />
                </div>

                <div className="grid gap-4 lg:grid-cols-2">
                    <Card className="border bg-card/70">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Engagement + role intake</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-[1.4fr,1fr,0.8fr,auto]">
                                <div className="space-y-1">
                                    <Label htmlFor="engagement-name">Engagement name</Label>
                                    <Input id="engagement-name" value={engagementForm.name} onChange={(e) => setEngagementForm((prev) => ({ ...prev, name: e.target.value }))} placeholder="Night shift ramp" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="engagement-client">Client / site</Label>
                                    <Input id="engagement-client" value={engagementForm.client ?? ""} onChange={(e) => setEngagementForm((prev) => ({ ...prev, client: e.target.value }))} placeholder="ACME DC-04" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="engagement-budget">Budget (k3h4c)</Label>
                                    <Input id="engagement-budget" value={engagementForm.budget} onChange={(e) => setEngagementForm((prev) => ({ ...prev, budget: e.target.value }))} inputMode="decimal" />
                                </div>
                                <div className="flex items-end">
                                    <Button type="button" className="w-full" onClick={handleCreateEngagement} disabled={createEngagement.isPending}>
                                        <ClipboardCheck className="mr-2 h-4 w-4" /> Save engagement
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1.3fr,1fr,1fr,auto]">
                                <div className="space-y-1">
                                    <Label htmlFor="role-title">Role / posting</Label>
                                    <Input id="role-title" value={roleForm.title} onChange={(e) => setRoleForm((prev) => ({ ...prev, title: e.target.value }))} placeholder="Line supervisor" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="role-engagement">Attach to engagement</Label>
                                    <select id="role-engagement" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={roleForm.engagementId} onChange={(e) => setRoleForm((prev) => ({ ...prev, engagementId: e.target.value }))}>
                                        <option value="">Optional</option>
                                        {staffing.data?.engagements.map((eng) => (
                                            <option key={eng.id} value={eng.id}>{eng.name}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="role-rate-min">Rate min</Label>
                                        <Input id="role-rate-min" value={roleForm.rateMin} onChange={(e) => setRoleForm((prev) => ({ ...prev, rateMin: e.target.value }))} inputMode="decimal" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="role-rate-max">Rate max</Label>
                                        <Input id="role-rate-max" value={roleForm.rateMax} onChange={(e) => setRoleForm((prev) => ({ ...prev, rateMax: e.target.value }))} inputMode="decimal" />
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <Button type="button" variant="secondary" className="w-full" onClick={handleCreateRole} disabled={createRole.isPending}>
                                        <Target className="mr-2 h-4 w-4" /> Publish role
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border bg-card/70">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Candidate + shift intake</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid gap-3 md:grid-cols-[1.2fr,1fr,1fr,auto]">
                                <div className="space-y-1">
                                    <Label htmlFor="candidate-name">Candidate</Label>
                                    <Input id="candidate-name" value={candidateForm.fullName} onChange={(e) => setCandidateForm((prev) => ({ ...prev, fullName: e.target.value }))} placeholder="Jordan Rivers" />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="candidate-role">Role</Label>
                                    <select id="candidate-role" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={candidateForm.roleId} onChange={(e) => setCandidateForm((prev) => ({ ...prev, roleId: e.target.value }))}>
                                        <option value="">Unassigned</option>
                                        {staffing.data?.roles.map((role) => (
                                            <option key={role.id} value={role.id}>{role.title}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="space-y-1">
                                        <Label htmlFor="candidate-rate">Desired rate</Label>
                                        <Input id="candidate-rate" value={candidateForm.desiredRate} onChange={(e) => setCandidateForm((prev) => ({ ...prev, desiredRate: e.target.value }))} inputMode="decimal" />
                                    </div>
                                    <div className="space-y-1">
                                        <Label htmlFor="candidate-stage">Stage</Label>
                                        <select id="candidate-stage" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={candidateForm.stage} onChange={(e) => setCandidateForm((prev) => ({ ...prev, stage: e.target.value }))}>
                                            {stageOrder.map((stage) => <option key={stage} value={stage}>{stage}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-end">
                                    <Button type="button" className="w-full" onClick={handleCreateCandidate} disabled={createCandidate.isPending}>
                                        <Users className="mr-2 h-4 w-4" /> Add candidate
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1fr,1fr,auto]">
                                <div className="space-y-1">
                                    <Label htmlFor="shift-title">Shift window</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Input type="datetime-local" value={shiftForm.startsAt} onChange={(e) => setShiftForm((prev) => ({ ...prev, startsAt: e.target.value }))} />
                                        <Input type="datetime-local" value={shiftForm.endsAt} onChange={(e) => setShiftForm((prev) => ({ ...prev, endsAt: e.target.value }))} />
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="shift-persona">Assign persona</Label>
                                    <select id="shift-persona" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={shiftForm.assignedPersonaId} onChange={(e) => setShiftForm((prev) => ({ ...prev, assignedPersonaId: e.target.value }))}>
                                        <option value="">Unassigned</option>
                                        {personaOptions.map((p) => (
                                            <option key={p.id} value={p.id}>{p.alias}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <Button type="button" variant="outline" className="w-full" onClick={handleCreateShift} disabled={createShift.isPending}>
                                        <CalendarClock className="mr-2 h-4 w-4" /> Schedule shift
                                    </Button>
                                </div>
                            </div>

                            <div className="grid gap-3 md:grid-cols-[1.2fr,1fr,auto]">
                                <div className="space-y-1">
                                    <Label htmlFor="placement-role">Placement</Label>
                                    <div className="grid grid-cols-2 gap-2">
                                        <select id="placement-role" className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={placementForm.roleId} onChange={(e) => setPlacementForm((prev) => ({ ...prev, roleId: e.target.value }))}>
                                            <option value="">Role</option>
                                            {staffing.data?.roles.map((role) => <option key={role.id} value={role.id}>{role.title}</option>)}
                                        </select>
                                        <select className="w-full rounded-md border bg-background px-3 py-2 text-sm" value={placementForm.candidateId} onChange={(e) => setPlacementForm((prev) => ({ ...prev, candidateId: e.target.value }))}>
                                            <option value="">Candidate</option>
                                            {staffing.data?.candidates.map((candidate) => <option key={candidate.id} value={candidate.id}>{candidate.fullName}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="placement-start">Start</Label>
                                    <Input id="placement-start" type="datetime-local" value={placementForm.startDate} onChange={(e) => setPlacementForm((prev) => ({ ...prev, startDate: e.target.value }))} />
                                </div>
                                <div className="flex items-end">
                                    <Button type="button" variant="secondary" className="w-full" onClick={handleCreatePlacement} disabled={createPlacement.isPending}>
                                        <Activity className="mr-2 h-4 w-4" /> Confirm placement
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 xl:grid-cols-[2fr,1fr]">
                    <Card className="border bg-card/70">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Pipeline radar</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                            {stageOrder.map((stage) => (
                                <div key={stage} className="rounded-lg border bg-background/60 p-3">
                                    <div className="flex items-center justify-between pb-2">
                                        <span className="text-sm font-semibold capitalize">{stage}</span>
                                        <Badge variant="secondary" className="text-xs">{buckets[stage]?.length ?? 0}</Badge>
                                    </div>
                                    <div className="space-y-2">
                                        {(buckets[stage] ?? []).map((candidate) => (
                                            <div key={candidate.id} className="rounded-md border bg-card px-3 py-2 shadow-sm">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="text-sm font-semibold leading-tight">{candidate.fullName}</div>
                                                        <div className="text-xs text-muted-foreground">{candidate.persona?.alias ?? "Unassigned"}</div>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        className="text-xs text-primary hover:underline"
                                                        onClick={() => updateCandidateStage.mutate({ candidateId: candidate.id, stage: stage === "placed" ? "archived" : "placed" })}
                                                    >
                                                        {stage === "placed" ? "Archive" : "Mark placed"}
                                                    </button>
                                                </div>
                                                <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                                                    <MapPin className="h-3 w-3" /> {candidate.location || "Hybrid"}
                                                    <span className="ml-auto font-semibold text-foreground">{candidate.desiredRate ? `${candidate.desiredRate} k3h4c` : ""}</span>
                                                </div>
                                            </div>
                                        ))}
                                        {(buckets[stage] ?? []).length === 0 ? (
                                            <p className="text-xs text-muted-foreground">No candidates here yet.</p>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="border bg-card/70">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-base">Shift coverage</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Window</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {(staffing.data?.shifts ?? []).slice(0, 6).map((shift) => (
                                        <TableRow key={shift.id}>
                                            <TableCell className="text-xs text-muted-foreground">{new Date(shift.startsAt).toLocaleString()} → {new Date(shift.endsAt).toLocaleTimeString()}</TableCell>
                                            <TableCell>
                                                <div className="text-sm font-semibold leading-tight">{shift.title}</div>
                                                <div className="text-xs text-muted-foreground">{shift.assignedPersona?.alias ?? "Unassigned"}</div>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant={shift.coverageStatus === "covered" ? "default" : "outline"}>{shift.coverageStatus}</Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                    {!(staffing.data?.shifts ?? []).length ? (
                                        <TableRow>
                                            <TableCell colSpan={3} className="text-xs text-muted-foreground">No shifts scheduled yet.</TableCell>
                                        </TableRow>
                                    ) : null}
                                </TableBody>
                            </Table>

                            <Separator />

                            <div className="space-y-2">
                                <div className="flex items-center justify-between text-sm font-semibold">
                                    <span>Placements</span>
                                    <Badge variant="secondary">{staffing.data?.placements.length ?? 0}</Badge>
                                </div>
                                <div className="space-y-2">
                                    {(staffing.data?.placements ?? []).slice(0, 4).map((placement) => (
                                        <div key={placement.id} className="rounded-md border bg-background/60 px-3 py-2 text-sm">
                                            <div className="flex items-center justify-between">
                                                <div className="font-semibold">{placement.persona?.alias ?? "Unassigned"}</div>
                                                <Badge variant="outline" className="text-xs">{placement.status}</Badge>
                                            </div>
                                            <div className="text-xs text-muted-foreground">{new Date(placement.startDate).toLocaleDateString()}</div>
                                        </div>
                                    ))}
                                    {!(staffing.data?.placements ?? []).length ? <p className="text-xs text-muted-foreground">No placements yet.</p> : null}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>
    );
}

function MetricCard({ label, value, secondary, icon }: { label: string; value: string | number; secondary?: string; icon?: ReactNode }) {
    return (
        <div className="flex items-center justify-between rounded-lg border bg-card/70 px-4 py-3 shadow-sm">
            <div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground">{label}</div>
                <div className="text-lg font-bold leading-tight">{value}</div>
                {secondary ? <div className="text-xs text-muted-foreground">{secondary}</div> : null}
            </div>
            {icon}
        </div>
    );
}
