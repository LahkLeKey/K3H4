import { useMemo } from "react";
import { CheckCircle2, FileText, HandCoins, Plus, Sparkles, Timer } from "lucide-react";

import { usePersonaListQuery } from "../../hooks/use-persona-queries";
import {
    useAssignmentsQuery,
    useCreateAssignmentMutation,
    useCreateTimecardMutation,
    usePayTimecardMutation,
    type Assignment,
} from "../../hooks/use-assignment-queries";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { InvoiceDialog } from "./invoice-dialog";
import { useLocalStore } from "../../lib/store";
import { StaffingDashboard } from "./staffing-dashboard";

export type AssignmentAgencyProps = {
    apiBase: string;
    userEmail: string | null;
};

export function AssignmentAgency({ apiBase, userEmail }: AssignmentAgencyProps) {
    const personas = usePersonaListQuery(apiBase);
    const assignments = useAssignmentsQuery(apiBase);
    const createAssignment = useCreateAssignmentMutation(apiBase);
    const createTimecard = useCreateTimecardMutation(apiBase);
    const payTimecard = usePayTimecardMutation(apiBase);
    const uiStore = useLocalStore(() => ({
        form: { title: "", personaId: "", hourlyRate: "120" },
        note: "",
        inlineError: "",
        hoursByAssignment: {} as Record<string, string>,
        noteByAssignment: {} as Record<string, string>,
    }));

    const { form, note, inlineError, hoursByAssignment, noteByAssignment } = uiStore.useShallow((state) => state);
    const setForm = (updater: (prev: typeof form) => typeof form) => uiStore.setState((prev) => ({ form: updater(prev.form) }));
    const setNote = (value: string) => uiStore.setState({ note: value });
    const setInlineError = (value: string) => uiStore.setState({ inlineError: value });
    const setHoursByAssignment = (updater: (prev: Record<string, string>) => Record<string, string>) => uiStore.setState((prev) => ({ hoursByAssignment: updater(prev.hoursByAssignment) }));
    const setNoteByAssignment = (updater: (prev: Record<string, string>) => Record<string, string>) => uiStore.setState((prev) => ({ noteByAssignment: updater(prev.noteByAssignment) }));

    const personaOptions = useMemo(() => personas.data ?? [], [personas.data]);

    const handleCreateAssignment = async () => {
        if (!form.title.trim() || !form.personaId.trim()) {
            setInlineError("Assignment title and persona are required");
            return;
        }
        const hourly = Number(form.hourlyRate);
        if (!Number.isFinite(hourly) || hourly <= 0) {
            setInlineError("Enter a valid hourly rate");
            return;
        }
        try {
            await createAssignment.mutateAsync({
                title: form.title.trim(),
                personaId: form.personaId,
                hourlyRate: hourly,
            });
            setForm(prev => ({ ...prev, title: "", personaId: "", hourlyRate: form.hourlyRate }));
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to create assignment");
        }
    };

    const handleCreateTimecard = async (assignment: Assignment) => {
        const hoursStr = hoursByAssignment[assignment.id] ?? "8";
        const hours = Number(hoursStr);
        if (!Number.isFinite(hours) || hours <= 0) {
            setInlineError("Enter valid hours for the timecard");
            return;
        }
        try {
            await createTimecard.mutateAsync({ assignmentId: assignment.id, hours, note: noteByAssignment[assignment.id] });
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to create timecard");
        }
    };

    const handlePayTimecard = async (assignmentId: string, timecardId: string) => {
        try {
            await payTimecard.mutateAsync({ assignmentId, timecardId });
            setInlineError("");
        } catch (err) {
            setInlineError(err instanceof Error ? err.message : "Unable to pay timecard");
        }
    };

    return (
        <div className="space-y-6">
            <StaffingDashboard apiBase={apiBase} personaOptions={personaOptions} />
            <Card className="border bg-background/80">
                <CardHeader className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle className="text-lg">Payroll + timecards</CardTitle>
                        <p className="text-sm text-muted-foreground">
                            Route k3h4-coin paychecks and pay stubs to your personas for approved timecards.
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm">
                        <Badge variant="secondary">Signed in as {userEmail || "guest"}</Badge>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => personas.refetch()}
                            disabled={personas.isFetching}
                        >
                            <Sparkles className="mr-2 h-4 w-4" /> Refresh personas
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-3 sm:grid-cols-[2fr,2fr,1fr,auto]">
                        <div className="space-y-1">
                            <Label htmlFor="assignment-title">Assignment title</Label>
                            <Input
                                id="assignment-title"
                                value={form.title}
                                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                                placeholder="e.g. Mobile QA sprint"
                            />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="assignment-persona">Worker persona</Label>
                            <select
                                id="assignment-persona"
                                className="w-full rounded-md border bg-background px-3 py-2 text-sm"
                                value={form.personaId}
                                onChange={(e) => setForm((prev) => ({ ...prev, personaId: e.target.value }))}
                            >
                                <option value="">Select persona</option>
                                {personaOptions.map((p) => (
                                    <option key={p.id} value={p.id}>{p.alias} ({p.account})</option>
                                ))}
                            </select>
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor="assignment-rate">Hourly rate</Label>
                            <Input
                                id="assignment-rate"
                                value={form.hourlyRate}
                                onChange={(e) => setForm((prev) => ({ ...prev, hourlyRate: e.target.value }))}
                                inputMode="decimal"
                                placeholder="120"
                            />
                        </div>
                        <div className="flex items-end">
                            <Button
                                className="w-full"
                                onClick={handleCreateAssignment}
                                disabled={createAssignment.isPending || personas.isLoading}
                            >
                                <Plus className="mr-2 h-4 w-4" /> Create assignment
                            </Button>
                        </div>
                        <div className="sm:col-span-4">
                            <Input
                                value={note}
                                onChange={(e) => setNote(e.target.value)}
                                placeholder="Global note for new timecards (optional)"
                            />
                        </div>
                    </div>

                    {inlineError ? <p className="text-sm text-destructive">{inlineError}</p> : null}
                    {assignments.isLoading ? <p className="text-sm text-muted-foreground">Loading assignments...</p> : null}
                    {assignments.error ? <p className="text-sm text-destructive">{(assignments.error as Error).message}</p> : null}

                    {assignments.data?.length ? (
                        <div className="space-y-4">
                            {assignments.data.map((assignment) => {
                                const payable = assignment.timecards.filter((tc) => tc.status === "approved");
                                const totalApproved = payable.reduce((sum, tc) => sum + Number(tc.amount), 0);
                                return (
                                    <div key={assignment.id} className="rounded-lg border bg-card p-4 shadow-sm">
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-2">
                                                    <Badge variant="outline">{assignment.status}</Badge>
                                                    <Badge variant="secondary">{assignment.persona.alias}</Badge>
                                                    {assignment.persona.handle ? <Badge variant="secondary">{assignment.persona.handle}</Badge> : null}
                                                </div>
                                                <div className="text-lg font-semibold leading-tight">{assignment.title}</div>
                                                <div className="text-sm text-muted-foreground">Rate: {assignment.hourlyRate} k3h4c / hr</div>
                                            </div>
                                            <div className="flex flex-wrap gap-2 text-sm">
                                                <Badge variant="secondary">Approved balance: {totalApproved.toFixed(2)} k3h4c</Badge>
                                                <Button
                                                    size="sm"
                                                    variant="outline"
                                                    onClick={() => personas.refetch()}
                                                    disabled={personas.isFetching}
                                                >
                                                    <FileText className="mr-2 h-4 w-4" /> Refresh personas
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="mt-4 grid gap-3 sm:grid-cols-[1fr,1fr,auto]">
                                            <Input
                                                value={hoursByAssignment[assignment.id] ?? "8"}
                                                onChange={(e) => setHoursByAssignment((prev) => ({ ...prev, [assignment.id]: e.target.value }))}
                                                inputMode="decimal"
                                                placeholder="Hours worked"
                                            />
                                            <Input
                                                value={noteByAssignment[assignment.id] ?? note}
                                                onChange={(e) => setNoteByAssignment((prev) => ({ ...prev, [assignment.id]: e.target.value }))}
                                                placeholder="Timecard note"
                                            />
                                            <Button
                                                variant="secondary"
                                                onClick={() => handleCreateTimecard(assignment)}
                                                disabled={createTimecard.isPending}
                                            >
                                                <Timer className="mr-2 h-4 w-4" /> Add timecard
                                            </Button>
                                        </div>

                                        <Separator className="my-4" />

                                        <div className="grid gap-3 lg:grid-cols-[2fr,1fr]">
                                            <div>
                                                <div className="flex items-center gap-2 pb-2 text-sm font-semibold">
                                                    <Timer className="h-4 w-4" /> Timecards
                                                </div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>When</TableHead>
                                                            <TableHead>Note</TableHead>
                                                            <TableHead className="text-right">Hours</TableHead>
                                                            <TableHead className="text-right">Amount</TableHead>
                                                            <TableHead className="text-right">Action</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {assignment.timecards.map((tc) => (
                                                            <TableRow key={tc.id}>
                                                                <TableCell className="text-xs text-muted-foreground">{tc.createdAt ? new Date(tc.createdAt).toLocaleString() : ""}</TableCell>
                                                                <TableCell>{tc.note}</TableCell>
                                                                <TableCell className="text-right font-mono">{tc.hours}</TableCell>
                                                                <TableCell className="text-right font-mono">{tc.amount}</TableCell>
                                                                <TableCell className="text-right">
                                                                    {tc.status === "approved" ? (
                                                                        <Button
                                                                            size="sm"
                                                                            onClick={() => handlePayTimecard(assignment.id, tc.id)}
                                                                            disabled={payTimecard.isPending}
                                                                        >
                                                                            <HandCoins className="mr-2 h-4 w-4" /> Pay
                                                                        </Button>
                                                                    ) : (
                                                                        <Badge variant="outline" className="inline-flex items-center gap-1">
                                                                            <CheckCircle2 className="h-3 w-3" /> {tc.status}
                                                                        </Badge>
                                                                    )}
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {assignment.timecards.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={5} className="text-sm text-muted-foreground">
                                                                    No timecards yet.
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : null}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2 pb-2 text-sm font-semibold">
                                                    <FileText className="h-4 w-4" /> Pay stubs
                                                </div>
                                                <Table>
                                                    <TableHeader>
                                                        <TableRow>
                                                            <TableHead>When</TableHead>
                                                            <TableHead>Amount</TableHead>
                                                            <TableHead className="text-right">Invoice</TableHead>
                                                        </TableRow>
                                                    </TableHeader>
                                                    <TableBody>
                                                        {assignment.payouts.map((payout) => (
                                                            <TableRow key={payout.id}>
                                                                <TableCell className="text-xs text-muted-foreground">{payout.createdAt ? new Date(payout.createdAt).toLocaleString() : ""}</TableCell>
                                                                <TableCell className="font-mono">{payout.amount}</TableCell>
                                                                <TableCell className="text-right">
                                                                    <InvoiceDialog
                                                                        payout={payout}
                                                                        assignment={assignment}
                                                                        persona={assignment.persona}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
                                                        {assignment.payouts.length === 0 ? (
                                                            <TableRow>
                                                                <TableCell colSpan={3} className="text-sm text-muted-foreground">
                                                                    No pay stubs yet.
                                                                </TableCell>
                                                            </TableRow>
                                                        ) : null}
                                                    </TableBody>
                                                </Table>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <p className="text-sm text-muted-foreground">No assignments yet. Create one above to start managing timecards.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
