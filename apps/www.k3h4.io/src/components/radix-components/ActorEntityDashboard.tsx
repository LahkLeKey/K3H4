import { useMemo, useState } from "react";

import { Table } from "../ui";
import type { TableColumn } from "../ui/Table";
import { useActorCachesQuery, useActorsQuery, useEntityCachesQuery, useEntitiesQuery } from "../../react-hooks/actor-entity";
import type { ActorRecord, CacheRecord, EntityRecord } from "../../schemas/actor-entity";

const formatDate = (value?: string | null) => {
    if (!value) return "-";
    const ts = Date.parse(value);
    if (Number.isNaN(ts)) return value;
    return new Date(ts).toLocaleString();
};

const formatPayload = (value: unknown) => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "string") return value;
    try {
        return JSON.stringify(value, null, 2);
    } catch (error) {
        return String(error);
    }
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

    const { data: actorCachesData, isLoading: actorCachesLoading } = useActorCachesQuery(
        selectedActorId,
        Boolean(selectedActorId),
    );

    const actorCaches = actorCachesData?.caches ?? [];

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

    const cacheColumns = useMemo<TableColumn<CacheRecord>>(
        () => [
            { key: "key", label: "Key" },
            {
                key: "createdAt",
                label: "Created",
                render: (row) => <span className="text-xs text-slate-300">{formatDate(row.createdAt)}</span>,
            },
            {
                key: "expiresAt",
                label: "Expires",
                render: (row) => (
                    <span className="text-xs text-slate-300">
                        {row.expiresAt ? formatDate(row.expiresAt) : "never"}
                    </span>
                ),
            },
            {
                key: "payload",
                label: "Payload",
                render: (row) => (
                    <pre className="max-w-full whitespace-pre-wrap break-words text-xs text-slate-200">
                        {formatPayload(row.payload)}
                    </pre>
                ),
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
            <div className="space-y-4">
                <Table
                    title={`Entities for ${actor.label}`}
                    columns={entityColumns}
                    rows={rows}
                    rowKey={(row) => row.id}
                    idAccessor={(row) => row.id}
                    ownerAccessor={(row) => row.actorId}
                    ownerLabel="Actor"
                    noDataMessage={noData}
                    scrollClassName="max-h-[70vh] overflow-auto"
                    rowExpansionLabel="Details"
                    rowExpansion={(entity) => {
                        const metadataObject = entity.metadata as Record<string, unknown> | undefined;
                        const tileBase64 = typeof metadataObject?.tileBase64 === "string"
                            ? metadataObject.tileBase64
                            : undefined;
                        const previewSrc = tileBase64 ? `data:image/png;base64,${tileBase64}` : undefined;
                        return (
                            <div className="space-y-4">
                                {previewSrc && (
                                    <div>
                                        <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                            Tile preview
                                        </div>
                                        <div className="mt-2 rounded-xl border border-slate-700 bg-slate-900/60 p-2 shadow-md">
                                            <img
                                                src={previewSrc}
                                                alt={`Tile preview for ${entity.targetId ?? entity.id}`}
                                                className="h-64 w-full object-contain"
                                            />
                                        </div>
                                    </div>
                                )}
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
                                    scrollClassName="max-h-80 overflow-auto"
                                />
                                <EntityCacheSection entity={entity} cacheColumns={cacheColumns} />
                            </div>
                        );
                    }}
                />
                {actor.id === selectedActorId && (
                    <Table
                        title={`Caches for ${actor.label}`}
                        columns={cacheColumns}
                        rows={actorCaches}
                        rowKey={(row) => row.id}
                        noDataMessage={actorCachesLoading ? "Loading caches…" : "No caches found for this actor."}
                        scrollClassName="max-h-72 overflow-auto"
                    />
                )}
            </div>
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

function EntityCacheSection({
    entity,
    cacheColumns,
}: {
    entity: EntityRecord;
    cacheColumns: TableColumn<CacheRecord>[];
}) {
    const { data, isLoading } = useEntityCachesQuery(entity.id, true);
    const caches = data?.caches ?? [];

    return (
        <Table
            title={`Caches for ${entity.id}`}
            columns={cacheColumns}
            rows={caches}
            rowKey={(row) => row.id}
            noDataMessage={isLoading ? "Loading caches…" : "No caches found for this entity."}
            scrollClassName="max-h-64 overflow-auto"
        />
    );
}
