import { useEffect, useMemo } from "react";

import { Tabs } from "../radix-primitives";
import { Stack } from "../ui";
import { useAuthStore } from "../../react-hooks/auth";
import { usePersonaState, type Persona } from "../../react-hooks/persona";
import { usePersonaDashboardStore } from "../../zustand-stores/persona-dashboard";
import { PersonaOverviewTab } from "./persona/PersonaOverviewTab";
import { PersonaRosterTab } from "./persona/PersonaRosterTab";
import { PersonaCompatibilityTab } from "./persona/PersonaCompatibilityTab";
import { PersonaQualityTab } from "./persona/PersonaQualityTab";
import { PersonaAttributesTab } from "./persona/PersonaAttributesTab";
import { PersonaAssignmentsTab } from "./persona/PersonaAssignmentsTab";
import { parseAttributes } from "./persona/parseAttributes";
import { formatNumber } from "./persona/formatNumber";
import { StaffingTabContent } from "./StaffingTabContent";

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