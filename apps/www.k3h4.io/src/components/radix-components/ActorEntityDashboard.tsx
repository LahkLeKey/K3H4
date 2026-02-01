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
    const [selectedActorId, setSelectedActorId] = useState<string | null>(null);

    const actorFilters = useMemo(() => ({ limit: 120 }), []);
    const { data: actorData, isLoading: actorsLoading } = useActorsQuery(actorFilters);

    const actors = actorData?.actors ?? [];

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

    const buildEntityDetailRows = (entity: EntityRecord) => {
        const metadata = entity.metadata ? JSON.stringify(entity.metadata, null, 2) : "-";
        return [
            { field: "ID", value: entity.id },
            { field: "Actor ID", value: entity.actorId },
            { field: "Kind", value: entity.kind },
            { field: "Direction", value: entity.direction ?? "-" },
            { field: "Name", value: entity.name ?? "-" },
            { field: "Target Type", value: entity.targetType ?? "-" },
            { field: "Target ID", value: entity.targetId ?? "-" },
            { field: "Source", value: entity.source ?? "-" },
            { field: "Metadata", value: metadata },
            { field: "Created", value: formatDate(entity.createdAt) },
            { field: "Updated", value: formatDate(entity.updatedAt) },
        ];
    };

    const renderEntityTable = (actor: ActorRecord) => {
        const rows = actor.id === selectedActorId ? filteredEntities : [];
        const isLoading = actor.id === selectedActorId && entitiesLoading;
        const noData = isLoading
            ? "Loading entities…"
            : actor.id === selectedActorId
                ? "No entities found."
                : "Select to load entities.";

        return (
            <Table
                title={`Entities for ${actor.label}`}
                columns={entityColumns}
                rows={rows}
                rowKey={(row) => row.id}
                idAccessor={(row) => row.id}
                ownerAccessor={(row) => row.actorId}
                ownerLabel="Actor"
                noDataMessage={noData}
                rowExpansionLabel="Details"
                rowExpansion={(entity) => (
                    <Table
                        title={`Entity ${entity.id}`}
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
                        rows={buildEntityDetailRows(entity)}
                        rowKey={(row) => row.field}
                        noDataMessage="No details available."
                    />
                )}
            />
        );
    };

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
            rowExpansionLabel="Entities"
            onRowExpand={(row, expanded) => {
                if (expanded) {
                    setSelectedActorId(row.id);
                }
            }}
            rowExpansion={(row) => renderEntityTable(row)}
        />
    );
}
