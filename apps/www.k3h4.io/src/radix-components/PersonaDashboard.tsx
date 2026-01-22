import { useEffect, useMemo, useState } from "react";

import { Badge, Button, Card, Grid, Input, MetricTile, Pill, SectionHeader, Select, Stack, Tabs } from "../radix-primitives";
import { useAuthStore } from "../react-hooks/auth";
import { usePersonaState, type Persona } from "../react-hooks/persona";
import { useStaffingState } from "../react-hooks/staffing";
import { usePersonaDashboardStore } from "../zustand-stores/persona-dashboard";
import { PersonaOverviewTab } from "./persona/PersonaOverviewTab";
import { PersonaRosterTab } from "./persona/PersonaRosterTab";
import { PersonaCompatibilityTab } from "./persona/PersonaCompatibilityTab";
import { PersonaQualityTab } from "./persona/PersonaQualityTab";
import { PersonaAttributesTab } from "./persona/PersonaAttributesTab";
import { PersonaAssignmentsTab } from "./persona/PersonaAssignmentsTab";
import { parseAttributes } from "./persona/parseAttributes";
import { formatNumber } from "./persona/formatNumber";
import { StaffingBoard } from "./StaffingBoard";

const stageOptions = ["sourced", "screening", "interview", "offer", "placed"];
const shiftStatusOptions = ["draft", "open", "scheduled", "closed"];
const placementStatusOptions = ["confirmed", "pending", "cancelled"];

function StaffingTabContent() {
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
                            <Select value={roleEngagementId} onChange={(e) => setRoleEngagementId(e.target.value)}>
                                <option value="">Engagement (optional)</option>
                                {engagements.map((eng) => (
                                    <option key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </option>
                                ))}
                            </Select>
                            <Input placeholder="Location" value={roleLocation} onChange={(e) => setRoleLocation(e.target.value)} />
                            <Grid gap="sm" cols={2}>
                                <Select value={rolePriority} onChange={(e) => setRolePriority(e.target.value)}>
                                    <option value="">Priority</option>
                                    <option value="low">Low</option>
                                    <option value="medium">Medium</option>
                                    <option value="high">High</option>
                                </Select>
                                <Select value={roleStatus} onChange={(e) => setRoleStatus(e.target.value)}>
                                    <option value="">Status</option>
                                    <option value="draft">Draft</option>
                                    <option value="open">Open</option>
                                    <option value="paused">Paused</option>
                                    <option value="closed">Closed</option>
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
                            <Select value={candRoleId} onChange={(e) => setCandRoleId(e.target.value)}>
                                <option value="">Role (optional)</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </option>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Desired rate" value={candDesired} onChange={(e) => setCandDesired(e.target.value)} />
                                <Select value={candStage} onChange={(e) => setCandStage(e.target.value)}>
                                    {stageOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
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
                            <Select value={stageCandidateId} onChange={(e) => setStageCandidateId(e.target.value)}>
                                <option value="">Candidate</option>
                                {candidates.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                    </option>
                                ))}
                            </Select>
                            <Select value={stageValue} onChange={(e) => setStageValue(e.target.value)}>
                                {stageOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
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
                            <Select value={shiftRoleId} onChange={(e) => setShiftRoleId(e.target.value)}>
                                <option value="">Role (optional)</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.id}>
                                        {role.title} {role.location ? `· ${role.location}` : ""}
                                    </option>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input type="datetime-local" placeholder="Starts" value={shiftStarts} onChange={(e) => setShiftStarts(e.target.value)} />
                                <Input type="datetime-local" placeholder="Ends" value={shiftEnds} onChange={(e) => setShiftEnds(e.target.value)} />
                            </Grid>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Location" value={shiftLocation} onChange={(e) => setShiftLocation(e.target.value)} />
                                <Select value={shiftStatus} onChange={(e) => setShiftStatus(e.target.value)}>
                                    <option value="">Status</option>
                                    {shiftStatusOptions.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
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
                                <Select value={placementCandidateId} onChange={(e) => setPlacementCandidateId(e.target.value)}>
                                    <option value="">Candidate</option>
                                    {candidates.map((c) => (
                                        <option key={c.id} value={c.id}>
                                            {c.fullName} {c.stage ? `· ${c.stage}` : ""}
                                        </option>
                                    ))}
                                </Select>
                                <Select value={placementRoleId} onChange={(e) => setPlacementRoleId(e.target.value)}>
                                    <option value="">Role</option>
                                    {roles.map((r) => (
                                        <option key={r.id} value={r.id}>
                                            {r.title} {r.location ? `· ${r.location}` : ""}
                                        </option>
                                    ))}
                                </Select>
                            </Grid>
                            <Select value={placementEngagementId} onChange={(e) => setPlacementEngagementId(e.target.value)}>
                                <option value="">Engagement</option>
                                {engagements.map((eng) => (
                                    <option key={eng.id} value={eng.id}>
                                        {eng.name} {eng.client ? `· ${eng.client}` : ""}
                                    </option>
                                ))}
                            </Select>
                            <Grid gap="sm" cols={2}>
                                <Input placeholder="Bill rate" value={placementBillRate} onChange={(e) => setPlacementBillRate(e.target.value)} />
                                <Input placeholder="Pay rate" value={placementPayRate} onChange={(e) => setPlacementPayRate(e.target.value)} />
                            </Grid>
                            <Select value={placementStatus} onChange={(e) => setPlacementStatus(e.target.value)}>
                                {placementStatusOptions.map((s) => (
                                    <option key={s} value={s}>
                                        {s}
                                    </option>
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

export function PersonaDashboard() {
    const { session } = useAuthStore();
    const {
        personas,
        stats,
        status,
        error,
        compatibilities,
        compatStatus,
        compatError,
        confusion,
        confusionStatus,
        confusionError,
        fetchPersonas,
        generatePersonas,
        createPersona,
        updateAttributes,
        fetchCompatibilities,
        recomputeCompatibilities,
        runConfusion,
    } = usePersonaState();

    const {
        activeTab,
        setActiveTab,
        selectedPersonaId,
        setSelectedPersonaId,
        rosterQuery,
        setRosterQuery,
        selectedTag,
        setSelectedTag,
        sortKey,
        setSortKey,
        newAlias,
        setNewAlias,
        newAccount,
        setNewAccount,
        newHandle,
        setNewHandle,
        newTags,
        setNewTags,
        newNote,
        setNewNote,
        generateCount,
        setGenerateCount,
        creating,
        setCreating,
        seeding,
        setSeeding,
        attributesInput,
        setAttributesInput,
        pairRows,
        threshold,
        setThreshold,
        modelPath,
        setModelPath,
        showGraph,
        setShowGraph,
        resetNewPersona,
        addPairRow,
        updatePairRow,
    } = usePersonaDashboardStore();

    const parsedAttributes = useMemo(() => parseAttributes(attributesInput), [attributesInput]);

    useEffect(() => {
        if (session?.accessToken && status === "idle") void fetchPersonas();
    }, [session?.accessToken, status, fetchPersonas]);

    useEffect(() => {
        if (!selectedPersonaId && personas[0]) setSelectedPersonaId(personas[0].id);
    }, [personas, selectedPersonaId, setSelectedPersonaId]);

    useEffect(() => {
        if (session?.accessToken && compatStatus === "idle") void fetchCompatibilities();
    }, [session?.accessToken, compatStatus, fetchCompatibilities]);

    const authed = Boolean(session?.accessToken);

    const tagCounts = useMemo(() => {
        const counts: Record<string, number> = {};
        personas.forEach((persona) => {
            (persona.tags || []).forEach((tag) => {
                counts[tag] = (counts[tag] || 0) + 1;
            });
        });
        return Object.entries(counts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 6);
    }, [personas]);

    const filteredPersonas = useMemo(() => {
        const query = rosterQuery.trim().toLowerCase();
        let rows = personas;
        if (query) {
            rows = rows.filter((p) => [p.alias, p.account, (p.tags || []).join(" ")].some((field) => field.toLowerCase().includes(query)));
        }
        if (selectedTag) {
            rows = rows.filter((p) => (p.tags || []).includes(selectedTag));
        }
        const sorted = [...rows].sort((a, b) => {
            if (sortKey === "alias") return a.alias.localeCompare(b.alias);
            return b.attributes.length - a.attributes.length;
        });
        return sorted;
    }, [personas, rosterQuery, selectedTag, sortKey]);

    const compatBins = useMemo(() => {
        const buckets = [0, 0, 0, 0, 0];
        compatibilities.forEach((row) => {
            const idx = Math.min(4, Math.floor(row.jaccardScore * 5));
            buckets[idx] += 1;
        });
        return buckets;
    }, [compatibilities]);

    const scoreTrend = useMemo(() => compatibilities.slice(0, 12).map((c) => c.jaccardScore), [compatibilities]);
    const attributeTrend = useMemo(() => personas.slice(0, 12).map((p) => p.attributes.length), [personas]);
    const compatTop = useMemo(() => compatibilities.slice(0, 8), [compatibilities]);
    const personaOptions = personas.map((p) => ({ value: p.id, label: p.alias }));

    const statusText = error || (status === "loading" ? "Loading personas..." : "Live");
    const compatText = compatError || (compatStatus === "loading" ? "Refreshing..." : `${compatibilities.length} pairs`);

    const kpis = [
        { label: "Personas", value: formatNumber(stats.total), hint: "Roster", trend: attributeTrend, accent: "#a78bfa" },
        { label: "Attributes", value: formatNumber(stats.attributes), hint: "Depth", trend: attributeTrend, accent: "#22d3ee" },
        { label: "Compatibility pairs", value: formatNumber(compatibilities.length), hint: compatText, trend: scoreTrend, accent: "#f59e0b" },
        { label: "Confusion runs", value: confusion ? "Latest" : "Pending", hint: confusion ? `${(confusion.metrics.f1 * 100).toFixed(1)}% F1` : "Awaiting pairs", trend: scoreTrend, accent: "#10b981" },
    ];

    const validPairs = useMemo(
        () => pairRows.filter((row) => row.sourceId && row.targetId) as (typeof pairRows[number])[],
        [pairRows],
    );

    const handleCreate = async () => {
        if (!newAlias.trim() || !newAccount.trim()) return;
        setCreating(true);
        await createPersona({
            alias: newAlias.trim(),
            account: newAccount.trim(),
            handle: newHandle.trim() || undefined,
            note: newNote.trim() || undefined,
            tags: newTags
                .split(",")
                .map((tag) => tag.trim())
                .filter(Boolean),
        });
        setCreating(false);
        resetNewPersona();
    };

    const handleGenerate = async () => {
        const count = Number.isFinite(Number(generateCount)) ? Number(generateCount) : 2;
        setSeeding(true);
        await generatePersonas(count);
        setSeeding(false);
    };

    const handleAttributesSave = async () => {
        if (!selectedPersonaId || parsedAttributes.length === 0) return;
        await updateAttributes(selectedPersonaId, parsedAttributes);
        await fetchCompatibilities(selectedPersonaId);
    };

    const handleRunConfusion = async () => {
        if (validPairs.length === 0) return;
        const clamped = Math.min(Math.max(Number(threshold) || 0.5, 0), 1);
        await runConfusion({
            pairs: validPairs.map((row) => ({ sourceId: row.sourceId!, targetId: row.targetId!, label: row.label })),
            threshold: clamped,
            modelPath: modelPath.trim() || undefined,
        });
    };

    const overviewTab = (
        <PersonaOverviewTab
            authed={authed}
            statusText={statusText}
            compatText={compatText}
            kpis={kpis}
            compatBins={compatBins}
            compatTop={compatTop}
            compatibilities={compatibilities}
            generateCount={generateCount}
            seeding={seeding}
            status={status}
            compatStatus={compatStatus}
            onRefresh={() => fetchPersonas()}
            onGenerate={handleGenerate}
            onRecompute={() => recomputeCompatibilities()}
        />
    );

    const rosterTab = (
        <PersonaRosterTab
            authed={authed}
            sessionPresent={Boolean(session)}
            personas={personas as Persona[]}
            filteredPersonas={filteredPersonas as Persona[]}
            tagCounts={tagCounts}
            sortKey={sortKey}
            rosterQuery={rosterQuery}
            selectedTag={selectedTag}
            error={error}
            newAlias={newAlias}
            newAccount={newAccount}
            newHandle={newHandle}
            newTags={newTags}
            newNote={newNote}
            generateCount={generateCount}
            creating={creating}
            seeding={seeding}
            onSortKeyChange={setSortKey}
            onRosterQueryChange={setRosterQuery}
            onSelectedTagChange={setSelectedTag}
            onNewAliasChange={setNewAlias}
            onNewAccountChange={setNewAccount}
            onNewHandleChange={setNewHandle}
            onNewTagsChange={setNewTags}
            onNewNoteChange={setNewNote}
            onGenerateCountChange={setGenerateCount}
            onCreatePersona={handleCreate}
            onGeneratePersonas={handleGenerate}
            onEditAttributes={(id) => {
                setSelectedPersonaId(id);
                setActiveTab("attributes");
            }}
            onViewCompat={(id) => {
                setSelectedPersonaId(id);
                setActiveTab("compatibility");
            }}
        />
    );

    const compatibilityTab = (
        <PersonaCompatibilityTab
            compatBins={compatBins}
            compatibilities={compatibilities}
            compatTop={compatTop}
            compatText={compatText}
            compatError={compatError}
            compatStatus={compatStatus}
            showGraph={showGraph}
            onToggleGraph={() => setShowGraph(!showGraph)}
            onFetch={() => fetchCompatibilities(selectedPersonaId)}
            onRecompute={() => recomputeCompatibilities()}
        />
    );

    const attributesTab = (
        <PersonaAttributesTab
            personaOptions={personaOptions}
            selectedPersonaId={selectedPersonaId}
            attributesInput={attributesInput}
            parsedAttributes={parsedAttributes}
            onSelectPersona={setSelectedPersonaId}
            onAttributesChange={setAttributesInput}
            onSave={handleAttributesSave}
        />
    );

    const qualityTab = (
        <PersonaQualityTab
            threshold={threshold}
            modelPath={modelPath}
            pairRows={pairRows}
            personaOptions={personaOptions}
            confusion={confusion}
            confusionStatus={confusionStatus}
            confusionError={confusionError}
            validPairs={validPairs}
            onThresholdChange={setThreshold}
            onModelPathChange={setModelPath}
            onRunConfusion={handleRunConfusion}
            onAddPair={addPairRow}
            onUpdatePairRow={updatePairRow}
        />
    );

    return (
        <Stack gap="md">
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                tabs={[
                    { key: "overview", label: "Overview", content: overviewTab },
                    { key: "roster", label: "Roster", content: rosterTab },
                    { key: "compatibility", label: "Compatibility", content: compatibilityTab },
                    { key: "quality", label: "Quality", content: qualityTab },
                    { key: "attributes", label: "Attributes", content: attributesTab },
                    { key: "assignments", label: "Assignments", content: <PersonaAssignmentsTab /> },
                    { key: "staffing", label: "Staffing", content: <StaffingTabContent /> },
                ]}
            />
        </Stack>
    );
}