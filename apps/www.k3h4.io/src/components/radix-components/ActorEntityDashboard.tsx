import { useMemo, useState } from "react";

import { Table } from "../ui";
import type { TableColumn } from "../ui/Table";
import { useActorsQuery, useEntitiesQuery } from "../../react-hooks/actor-entity";
import type { ActorRecord, EntityRecord } from "../../schemas/actor-entity";

const formatDate = (value?: string | null) => {
    if (!value) return "-";
    const ts = Date.parse(value);
    if (Number.isNaN(ts)) return value;
    return new Date(ts).toLocaleString();
};

export function ActorEntityDashboard() {
    const [mode, setMode] = useState<"actors" | "entities" | "entity-details">("actors");
    const [selectedActorId, setSelectedActorId] = useState<string | null>(null);
    const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);

    const actorFilters = useMemo(() => ({ limit: 120 }), []);
    const { data: actorData, isLoading: actorsLoading } = useActorsQuery(actorFilters);

    const actors = actorData?.actors ?? [];

    const selectedActor = useMemo(
        () => (selectedActorId ? actors.find((actor) => actor.id === selectedActorId) ?? null : null),
        [actors, selectedActorId],
    );

    const entityFilters = useMemo(
        () => (selectedActorId ? { actorId: selectedActorId, limit: 240 } : null),
        [selectedActorId],
    );
    const { data: entityData, isLoading: entitiesLoading } = useEntitiesQuery(entityFilters, Boolean(selectedActorId));

    const entities = entityData?.entities ?? [];

    const filteredActors = useMemo(() => actors, [actors]);
    const filteredEntities = useMemo(() => entities, [entities]);

    const actorColumns = useMemo<TableColumn<ActorRecord>[]>(
        () => [
            {
                key: "label",
                label: "Label",
                render: (row) => (
                    <div className="flex flex-col gap-1">
                        <span className="text-sm font-semibold text-white">{row.label}</span>
                        <span className="text-xs text-slate-400">{row.note || "No notes"}</span>
                    </div>
                ),
            },
            { key: "type", label: "Type" },
            { key: "category", label: "Category" },
            {
                key: "updatedAt",
                label: "Updated",
                render: (row) => <span className="text-xs text-slate-300">{formatDate(row.updatedAt)}</span>,
            },
        ],
        [],
    );

    const entityColumns = useMemo<TableColumn<EntityRecord>[]>(
        () => [
            { key: "kind", label: "Kind" },
            { key: "direction", label: "Direction" },
            {
                key: "name",
                label: "Name",
                render: (row) => row.name ?? "-",
            },
            {
                key: "targetType",
                label: "Target",
                render: (row) => {
                    const target = [row.targetType, row.targetId].filter(Boolean).join(" · ");
                    return target.length ? target : "-";
                },
            },
            {
                key: "updatedAt",
                label: "Updated",
                render: (row) => <span className="text-xs text-slate-300">{formatDate(row.updatedAt)}</span>,
            },
        ],
        [],
    );

    const selectedEntity = useMemo(
        () => (selectedEntityId ? entities.find((entity) => entity.id === selectedEntityId) ?? null : null),
        [entities, selectedEntityId],
    );

    const detailRows = useMemo(() => {
        if (!selectedEntity) return [];
        const metadata = selectedEntity.metadata ? JSON.stringify(selectedEntity.metadata, null, 2) : "-";
        return [
            { field: "ID", value: selectedEntity.id },
            { field: "Actor ID", value: selectedEntity.actorId },
            { field: "Kind", value: selectedEntity.kind },
            { field: "Direction", value: selectedEntity.direction ?? "-" },
            { field: "Name", value: selectedEntity.name ?? "-" },
            { field: "Target Type", value: selectedEntity.targetType ?? "-" },
            { field: "Target ID", value: selectedEntity.targetId ?? "-" },
            { field: "Source", value: selectedEntity.source ?? "-" },
            { field: "Metadata", value: metadata },
            { field: "Created", value: formatDate(selectedEntity.createdAt) },
            { field: "Updated", value: formatDate(selectedEntity.updatedAt) },
        ];
    }, [selectedEntity]);

    if (mode === "entities") {
        return (
            <Table
                title={selectedActor ? `Entities for ${selectedActor.label}` : "Entities"}
                columns={entityColumns}
                rows={filteredEntities}
                rowKey={(row) => row.id}
                idAccessor={(row) => row.id}
                ownerAccessor={(row) => row.actorId}
                ownerLabel="Actor"
                noDataMessage={
                    !selectedActor
                        ? "Select an actor to load entities."
                        : entitiesLoading
                          ? "Loading entities…"
                          : "No entities found."
                }
                actions={
                    <button
                        type="button"
                        onClick={() => {
                            setMode("actors");
                            setSelectedEntityId(null);
                        }}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10"
                    >
                        Back to actors
                    </button>
                }
                rowActions={(row) => (
                    <button
                        type="button"
                        onClick={() => {
                            setSelectedEntityId(row.id);
                            setMode("entity-details");
                        }}
                        className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                            row.id === selectedEntityId
                                ? "bg-emerald-300/20 text-emerald-200"
                                : "bg-white/5 text-slate-200 hover:bg-white/10"
                        }`.trim()}
                    >
                        Details
                    </button>
                )}
            />
        );
    }

    if (mode === "entity-details") {
        return (
            <Table
                title={selectedEntity ? `Entity ${selectedEntity.id}` : "Entity details"}
                columns={[
                    { key: "field", label: "Field" },
                    {
                        key: "value",
                        label: "Value",
                        render: (row) => (
                            <pre className="max-w-full whitespace-pre-wrap break-words text-xs text-slate-200">
                                {row.value}
                            </pre>
                        ),
                    },
                ]}
                rows={detailRows}
                rowKey={(row) => row.field}
                noDataMessage={selectedEntity ? "No details available." : "Select an entity."}
                actions={
                    <button
                        type="button"
                        onClick={() => setMode("entities")}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 transition hover:bg-white/10"
                    >
                        Back to entities
                    </button>
                }
            />
        );
    }

    return (
        <Table
            title="Actors"
            columns={actorColumns}
            rows={filteredActors}
            rowKey={(row) => row.id}
            idAccessor={(row) => row.id}
            ownerAccessor={(row) => row.userId ?? "-"}
            ownerLabel="User"
            noDataMessage={actorsLoading ? "Loading actors…" : "No actors found."}
            rowActions={(row) => (
                <button
                    type="button"
                    onClick={() => {
                        setSelectedActorId(row.id);
                        setSelectedEntityId(null);
                        setMode("entities");
                    }}
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] transition ${
                        row.id === selectedActorId
                            ? "bg-emerald-300/20 text-emerald-200"
                            : "bg-white/5 text-slate-200 hover:bg-white/10"
                    }`.trim()}
                >
                    Entities
                </button>
            )}
        />
    );
}
