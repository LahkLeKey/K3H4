import { useEffect, useState } from "react";

import { Select, SelectItem } from "../radix-primitives";
import { Badge, Button, Card, Grid, Input, MetricTile, Pill, SectionHeader, Stack } from "../components/ui";
import { useAuthStore } from "../react-hooks/auth";
import { useStaffingState } from "../react-hooks/staffing";
import { StaffingBoard } from "./StaffingBoard";

const stageOptions = ["sourced", "screening", "interview", "offer", "placed"];
const shiftStatusOptions = ["draft", "open", "scheduled", "closed"];
const placementStatusOptions = ["confirmed", "pending", "cancelled"];
const emptySelectValue = "__empty";
const normalizeEmpty = (value: string) => (value === emptySelectValue ? "" : value);

export function StaffingTabContent() {
    const { session } = useAuthStore();
    const {
        status,
        error,
        engagements,
        roles,
        candidates,
        metrics,
        fetchDashboard,
        createEngagement,
        createRole,
        createCandidate,
        advanceCandidateStage,
        createShift,
        createPlacement,
    } = useStaffingState();

    const [engName, setEngName] = useState("");
    const [engClient, setEngClient] = useState("");

    const [roleTitle, setRoleTitle] = useState("");
    const [roleEngagementId, setRoleEngagementId] = useState("");
    const [roleLocation, setRoleLocation] = useState("");
    const [rolePriority, setRolePriority] = useState("");
    const [roleStatus, setRoleStatus] = useState("");
    const [roleOpenings, setRoleOpenings] = useState("");
    const [roleRateMin, setRoleRateMin] = useState("");
    const [roleRateMax, setRoleRateMax] = useState("");

    const [candName, setCandName] = useState("");
    const [candRoleId, setCandRoleId] = useState("");
    const [candStage, setCandStage] = useState("sourced");
    const [candDesired, setCandDesired] = useState("");

    const [stageCandidateId, setStageCandidateId] = useState("");
    const [stageValue, setStageValue] = useState("screening");

    const [shiftTitle, setShiftTitle] = useState("");
    const [shiftRoleId, setShiftRoleId] = useState("");
    const [shiftLocation, setShiftLocation] = useState("");
    const [shiftStarts, setShiftStarts] = useState("");
    const [shiftEnds, setShiftEnds] = useState("");
    const [shiftStatus, setShiftStatus] = useState("");

    const [placementCandidateId, setPlacementCandidateId] = useState("");
    const [placementRoleId, setPlacementRoleId] = useState("");
    const [placementEngagementId, setPlacementEngagementId] = useState("");
    const [placementBillRate, setPlacementBillRate] = useState("");
    const [placementPayRate, setPlacementPayRate] = useState("");
    const [placementStatus, setPlacementStatus] = useState("confirmed");

    const authed = Boolean(session?.accessToken);
    const busy = status === "loading";

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchDashboard();
    }, [session?.accessToken, status, fetchDashboard]);

    const handleEngagement = async () => {
        if (!engName.trim()) return;
        await createEngagement({ name: engName.trim(), client: engClient.trim() || null });
        setEngName("");
        setEngClient("");
    };

    const handleRole = async () => {
        if (!roleTitle.trim()) return;
        await createRole({
            title: roleTitle.trim(),
            engagementId: roleEngagementId || null,
            location: roleLocation || null,
            priority: rolePriority || null,
            status: roleStatus || null,
            openings: roleOpenings ? Number(roleOpenings) : null,
            rateMin: roleRateMin || null,
            rateMax: roleRateMax || null,
        });
        setRoleTitle("");
        setRoleLocation("");
        setRolePriority("");
        setRoleStatus("");
        setRoleOpenings("");
        setRoleRateMin("");
        setRoleRateMax("");
    };

    const handleCandidate = async () => {
        if (!candName.trim()) return;
        await createCandidate({
            fullName: candName.trim(),
            roleId: candRoleId || null,
            desiredRate: candDesired || null,
            stage: candStage || null,
        });
        setCandName("");
        setCandRoleId("");
        setCandDesired("");
        setCandStage("sourced");
    };

    const handleStage = async () => {
        if (!stageCandidateId.trim() || !stageValue.trim()) return;
        await advanceCandidateStage(stageCandidateId.trim(), stageValue.trim());
    };

    const handleShift = async () => {
        if (!shiftTitle.trim()) return;
        await createShift({
            title: shiftTitle.trim(),
            roleId: shiftRoleId || null,
            startsAt: shiftStarts || null,
            endsAt: shiftEnds || null,
            location: shiftLocation || null,
            status: shiftStatus || null,
        });
        setShiftTitle("");
        setShiftRoleId("");
        setShiftLocation("");
        setShiftStarts("");
        setShiftEnds("");
        setShiftStatus("");
    };

    const handlePlacement = async () => {
        await createPlacement({
            candidateId: placementCandidateId || null,
            roleId: placementRoleId || null,
            engagementId: placementEngagementId || null,
            billRate: placementBillRate || null,
            payRate: placementPayRate || null,
            status: placementStatus || null,
        });
        setPlacementCandidateId("");
        setPlacementRoleId("");
        setPlacementEngagementId("");
        setPlacementBillRate("");
        setPlacementPayRate("");
        setPlacementStatus("confirmed");
    };

    return (
        <Stack gap="md">
            <SectionHeader
                kicker="Staffing"
                title="Staffing and workforce planning"
                description="Plan demand, recruit talent, advance candidates, and finalize placements."
                status={error || (authed ? "Authenticated" : "Sign in required")}
                actions={<Pill tone="slate">Focus: staffing + shifts</Pill>}
            />

            <Grid gap="md" smCols={2} lgCols={4}>
                <MetricTile label="Open roles" value={(metrics?.openRoles ?? 0).toString()} hint="Live" accent="#60a5fa" />
                <MetricTile label="Candidates" value={(metrics?.activeCandidates ?? 0).toString()} hint="Live" accent="#a78bfa" />
                <MetricTile label="Shifts" value={(metrics?.scheduledShifts ?? 0).toString()} hint="Live" accent="#f59e0b" />
                <MetricTile label="Placements" value={(metrics?.activePlacements ?? 0).toString()} hint={`Fill ${metrics?.fillRate ?? 0}%`} accent="#22c55e" />
            </Grid>

            <Stack gap="md">
                <Stack direction="row" justify="between" align="center">
                    <div>
                        <div className="text-sm font-semibold text-white">Controls</div>
                        <div className="text-xs text-slate-400">Direct calls to staffing endpoints.</div>
                    </div>
                    <Pill tone="slate">{authed ? "Authenticated" : "Sign in required"}</Pill>
                </Stack>

                <Grid gap="md" lgCols={2}>
                    <Card title="Engagement" eyebrow="POST /staffing/engagements">
                        <Stack gap="sm">
                            <Input placeholder="Name" value={engName} onChange={(e) => setEngName(e.target.value)} />
                            <Input placeholder="Client" value={engClient} onChange={(e) => setEngClient(e.target.value)} />
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleEngagement}
                                disabled={!authed || busy || !engName.trim()}
                            >
                                {busy ? "Working…" : "Create engagement"}
                            </Button>
                        </Stack>
                    </Card>

                    <Card title="Role" eyebrow="POST /staffing/roles">
                        <Stack gap="sm">
                            <Input placeholder="Title" value={roleTitle} onChange={(e) => setRoleTitle(e.target.value)} />
                            <Select
                                value={roleEngagementId || emptySelectValue}
                                placeholder="Engagement (optional)"
                                onChange={(e) => setRoleEngagementId(normalizeEmpty(e.target.value))}
                            >
                                <SelectItem value={emptySelectValue}>None</SelectItem>
                                {engagements.map((eng) => (
                                    <SelectItem key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Input placeholder="Location" value={roleLocation} onChange={(e) => setRoleLocation(e.target.value)} />
                            <Grid gap="sm" cols={2}>
                                <Select
                                    value={rolePriority || emptySelectValue}
                                    placeholder="Priority"
                                    onChange={(e) => setRolePriority(normalizeEmpty(e.target.value))}
                                >
                                    <SelectItem value={emptySelectValue}>Any</SelectItem>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </Select>
                                <Select
                                    value={roleStatus || emptySelectValue}
                                    placeholder="Status"
                                    onChange={(e) => setRoleStatus(normalizeEmpty(e.target.value))}
                                >
                                    <SelectItem value={emptySelectValue}>Any</SelectItem>
                                    <SelectItem value="draft">Draft</SelectItem>
                                    <SelectItem value="open">Open</SelectItem>
                                    <SelectItem value="paused">Paused</SelectItem>
                                    <SelectItem value="closed">Closed</SelectItem>
                                </Select>
                            </Grid>
                            <Grid gap="sm" cols={3}>
                                <Input type="number" placeholder="Openings" value={roleOpenings} onChange={(e) => setRoleOpenings(e.target.value)} />
                                <Input type="number" placeholder="Rate min" value={roleRateMin} onChange={(e) => setRoleRateMin(e.target.value)} />
                                <Input type="number" placeholder="Rate max" value={roleRateMax} onChange={(e) => setRoleRateMax(e.target.value)} />
                            </Grid>
                            <Button
                                variant="subtle"
                                accent="#38bdf8"
                                className="h-9 justify-center"
                                onClick={handleRole}
                                disabled={!authed || busy || !roleTitle.trim()}
                            >
                                {busy ? "Working…" : "Create role"}
                            </Button>
                        </Stack>
                    </Card>
                </Grid>

                <Grid gap="md" lgCols={2}>
                    <Card title="Candidate" eyebrow="POST /staffing/candidates">
                        <Stack gap="sm">
                            <Input placeholder="Full name" value={candName} onChange={(e) => setCandName(e.target.value)} />
                            <Select
                                value={candRoleId || emptySelectValue}
                                placeholder="Role (optional)"
                                onChange={(e) => setCandRoleId(normalizeEmpty(e.target.value))}
                            >
                                <SelectItem value={emptySelectValue}>None</SelectItem>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Desired rate" value={candDesired} onChange={(e) => setCandDesired(e.target.value)} />
                                <Select value={candStage} onChange={(e) => setCandStage(e.target.value)}>
                                    {stageOptions.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleCandidate}
                                disabled={!authed || busy || !candName.trim()}
                            >
                                {busy ? "Working…" : "Create candidate"}
                            </Button>
                        </Stack>
                    </Card>

                    <Card title="Advance stage" eyebrow="POST /staffing/candidates/{id}/stage">
                        <Stack gap="sm">
                            <Select
                                value={stageCandidateId || emptySelectValue}
                                placeholder="Candidate"
                                onChange={(e) => setStageCandidateId(normalizeEmpty(e.target.value))}
                            >
                                <SelectItem value={emptySelectValue}>Select candidate</SelectItem>
                                {candidates.map((c) => (
                                    <SelectItem key={c.id} value={c.id}>
                                        {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Select value={stageValue} onChange={(e) => setStageValue(e.target.value)}>
                                {stageOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleStage}
                                disabled={!authed || busy || !stageCandidateId.trim()}
                            >
                                {busy ? "Working…" : "Advance stage"}
                            </Button>
                        </Stack>
                    </Card>
                </Grid>

                <Grid gap="md" lgCols={2}>
                    <Card title="Shift" eyebrow="POST /staffing/shifts">
                        <Stack gap="sm">
                            <Input placeholder="Title" value={shiftTitle} onChange={(e) => setShiftTitle(e.target.value)} />
                            <Select
                                value={shiftRoleId || emptySelectValue}
                                placeholder="Role (optional)"
                                onChange={(e) => setShiftRoleId(normalizeEmpty(e.target.value))}
                            >
                                <SelectItem value={emptySelectValue}>None</SelectItem>
                                {roles.map((role) => (
                                    <SelectItem key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input type="datetime-local" placeholder="Starts" value={shiftStarts} onChange={(e) => setShiftStarts(e.target.value)} />
                                <Input type="datetime-local" placeholder="Ends" value={shiftEnds} onChange={(e) => setShiftEnds(e.target.value)} />
                            </Grid>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Location" value={shiftLocation} onChange={(e) => setShiftLocation(e.target.value)} />
                                <Select
                                    value={shiftStatus || emptySelectValue}
                                    placeholder="Status"
                                    onChange={(e) => setShiftStatus(normalizeEmpty(e.target.value))}
                                >
                                    <SelectItem value={emptySelectValue}>Any</SelectItem>
                                    {shiftStatusOptions.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handleShift}
                                disabled={!authed || busy || !shiftTitle.trim()}
                            >
                                {busy ? "Working…" : "Create shift"}
                            </Button>
                        </Stack>
                    </Card>

                    <Card title="Placement" eyebrow="POST /staffing/placements">
                        <Stack gap="sm">
                            <Grid gap="sm" cols={2}>
                                <Select
                                    value={placementCandidateId || emptySelectValue}
                                    placeholder="Candidate"
                                    onChange={(e) => setPlacementCandidateId(normalizeEmpty(e.target.value))}
                                >
                                    <SelectItem value={emptySelectValue}>Select candidate</SelectItem>
                                    {candidates.map((c) => (
                                        <SelectItem key={c.id} value={c.id}>
                                            {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                        </SelectItem>
                                    ))}
                                </Select>
                                <Select
                                    value={placementRoleId || emptySelectValue}
                                    placeholder="Role"
                                    onChange={(e) => setPlacementRoleId(normalizeEmpty(e.target.value))}
                                >
                                    <SelectItem value={emptySelectValue}>Select role</SelectItem>
                                    {roles.map((r) => (
                                        <SelectItem key={r.id} value={r.id}>
                                            {r.title} {r.location ? `· ${r.location}` : ""}
                                        </SelectItem>
                                    ))}
                                </Select>
                            </Grid>
                            <Select
                                value={placementEngagementId || emptySelectValue}
                                placeholder="Engagement"
                                onChange={(e) => setPlacementEngagementId(normalizeEmpty(e.target.value))}
                            >
                                <SelectItem value={emptySelectValue}>Select engagement</SelectItem>
                                {engagements.map((eng) => (
                                    <SelectItem key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Bill rate" value={placementBillRate} onChange={(e) => setPlacementBillRate(e.target.value)} />
                                <Input placeholder="Pay rate" value={placementPayRate} onChange={(e) => setPlacementPayRate(e.target.value)} />
                            </Grid>
                            <Select value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)}>
                                {placementStatusOptions.map((s) => (
                                    <SelectItem key={s} value={s}>
                                        {s}
                                    </SelectItem>
                                ))}
                            </Select>
                            <Button
                                variant="subtle"
                                accent="#22c55e"
                                className="h-9 justify-center"
                                onClick={handlePlacement}
                                disabled={!authed || busy}
                            >
                                {busy ? "Working…" : "Create placement"}
                            </Button>
                        </Stack>
                    </Card>
                </Grid>
            </Stack>

            <Card title="Staffing board" eyebrow="Interactive UI" actions={<Badge accent="#60a5fa">{authed ? "Live" : "Auth required"}</Badge>}>
                <div className="mt-2">
                    <StaffingBoard />
                </div>
            </Card>
        </Stack>
    );
}
