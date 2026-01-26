import { Select, SelectItem } from "../../radix-primitives";
import type { TableColumn } from "../../ui";
import type { Persona } from "../../../zustand-stores/persona";
import { Badge, Button, Card, Grid, Input, Pill, SectionHeader, Stack, Surface, Table, Textarea } from "../../ui";

export type TagCount = [string, number];

export type PersonaRosterTabProps = {
    authed: boolean;
    sessionPresent: boolean;
    personas: Persona[];
    filteredPersonas: Persona[];
    tagCounts: TagCount[];
    sortKey: "alias" | "attributes";
    rosterQuery: string;
    selectedTag: string | null;
    error: string | null;
    newAlias: string;
    newAccount: string;
    newHandle: string;
    newTags: string;
    newNote: string;
    generateCount: number;
    creating: boolean;
    seeding: boolean;
    onSortKeyChange: (key: "alias" | "attributes") => void;
    onRosterQueryChange: (value: string) => void;
    onSelectedTagChange: (value: string | null) => void;
    onNewAliasChange: (value: string) => void;
    onNewAccountChange: (value: string) => void;
    onNewHandleChange: (value: string) => void;
    onNewTagsChange: (value: string) => void;
    onNewNoteChange: (value: string) => void;
    onGenerateCountChange: (value: number) => void;
    onCreatePersona: () => Promise<void> | void;
    onGeneratePersonas: () => Promise<void> | void;
    onEditAttributes: (id: string) => void;
    onViewCompat: (id: string) => void;
};

export function PersonaRosterTab({
    authed,
    sessionPresent,
    personas,
    filteredPersonas,
    tagCounts,
    sortKey,
    rosterQuery,
    selectedTag,
    error,
    newAlias,
    newAccount,
    newHandle,
    newTags,
    newNote,
    generateCount,
    creating,
    seeding,
    onSortKeyChange,
    onRosterQueryChange,
    onSelectedTagChange,
    onNewAliasChange,
    onNewAccountChange,
    onNewHandleChange,
    onNewTagsChange,
    onNewNoteChange,
    onGenerateCountChange,
    onCreatePersona,
    onGeneratePersonas,
    onEditAttributes,
    onViewCompat,
}: PersonaRosterTabProps) {
    return (
        <Stack gap="md">
            <SectionHeader
                kicker="Roster"
                title="Persona workspace"
                description="Search, tag, and create personas."
                status={`${filteredPersonas.length} shown / ${personas.length} total`}
                actions={<Badge accent="#22d3ee">Live roster</Badge>}
            />

            <Stack direction="row" align="center" gap="sm" className="text-[11px] text-slate-300">
                <Input
                    placeholder="Search alias, account, tag"
                    value={rosterQuery}
                    onChange={(e) => onRosterQueryChange(e.target.value)}
                    className="min-w-[220px]"
                />
                <Select value={sortKey} onChange={(e) => onSortKeyChange(e.target.value as "alias" | "attributes")}>
                    <SelectItem value="attributes">Sort by attributes</SelectItem>
                    <SelectItem value="alias">Sort by alias</SelectItem>
                </Select>
                {error ? <span className="text-amber-300">{error}</span> : null}
            </Stack>
            <Stack direction="row" align="center" gap="sm" className="text-[11px] text-slate-300">
                <Pill tone="slate">{filteredPersonas.length} shown</Pill>
                <Pill tone="slate">{personas.length} total</Pill>
                {tagCounts.map(([tag, count]) => (
                    <Button
                        key={tag}
                        type="button"
                        variant={selectedTag === tag ? "solid" : "subtle"}
                        accent={selectedTag === tag ? "#22c55e" : "#94a3b8"}
                        className="px-3 py-1 text-[11px]"
                        onClick={() => onSelectedTagChange(selectedTag === tag ? null : tag)}
                    >
                        {tag} · {count}
                    </Button>
                ))}
                {selectedTag ? (
                    <Button
                        type="button"
                        variant="ghost"
                        accent="#94a3b8"
                        className="px-3 py-1 text-[11px]"
                        onClick={() => onSelectedTagChange(null)}
                    >
                        Clear tag
                    </Button>
                ) : null}
            </Stack>

            <Grid gap="md" lgCols={2}>
                <Card eyebrow="Create" title="New persona" actions={<Badge accent="#22d3ee">Write</Badge>}>
                    <Stack gap="sm">
                        <Stack direction="row" gap="sm" align="center">
                            <Input placeholder="Alias" value={newAlias} onChange={(e) => onNewAliasChange(e.target.value)} />
                            <Input placeholder="Account" value={newAccount} onChange={(e) => onNewAccountChange(e.target.value)} />
                        </Stack>
                        <Input placeholder="Handle (optional)" value={newHandle} onChange={(e) => onNewHandleChange(e.target.value)} />
                        <Input placeholder="Tags comma separated" value={newTags} onChange={(e) => onNewTagsChange(e.target.value)} />
                        <Textarea rows={3} placeholder="Note" value={newNote} onChange={(e) => onNewNoteChange(e.target.value)} />
                        <Stack direction="row" align="center" gap="sm">
                            <Button accent="#22c55e" variant="solid" onClick={onCreatePersona} disabled={creating || !newAlias.trim() || !newAccount.trim()}>
                                {creating ? "Saving..." : "Create"}
                            </Button>
                            <Input
                                type="number"
                                min={1}
                                max={10}
                                value={generateCount}
                                onChange={(e) => onGenerateCountChange(Number(e.target.value))}
                                className="w-20"
                            />
                            <Button accent="#a78bfa" variant="outline" onClick={onGeneratePersonas} disabled={seeding}>
                                {seeding ? "Seeding..." : "Generate"}
                            </Button>
                        </Stack>
                    </Stack>
                </Card>

                <Card title="Roster" subtitle={authed ? "Live" : "Auth required"} actions={<Badge accent="#22d3ee">Live roster</Badge>}>
                    {filteredPersonas.length === 0 ? (
                        <Surface radius="2xl" padding="md" className="text-sm text-slate-200">
                            {sessionPresent ? "No personas match filters. Adjust search or tag." : "Sign in to view personas."}
                        </Surface>
                    ) : (
                        (() => {
                            type PersonaRow = Persona & { actions?: string };
                            const columns: TableColumn<PersonaRow>[] = [
                                { key: "alias", label: "Alias" },
                                { key: "account", label: "Account" },
                                { key: "tags", label: "Tags", render: (row) => (row.tags || []).join(", ") || "--" },
                                { key: "attributes", label: "Attributes", render: (row) => row.attributes.length },
                                {
                                    key: "actions",
                                    label: "Actions",
                                    render: (row) => (
                                        <Stack direction="row" gap="xs" align="center" className="text-[11px]">
                                            <Button
                                                variant="subtle"
                                                accent="#22c55e"
                                                className="px-3 py-1"
                                                onClick={() => onEditAttributes(row.id)}
                                            >
                                                Edit attributes
                                            </Button>
                                            <Button
                                                variant="subtle"
                                                accent="#38bdf8"
                                                className="px-3 py-1"
                                                onClick={() => onViewCompat(row.id)}
                                            >
                                                View compat
                                            </Button>
                                        </Stack>
                                    ),
                                },
                            ];

                            return <Table columns={columns} rows={filteredPersonas as PersonaRow[]} rowKey={(row) => row.id} />;
                        })()
                    )}
                </Card>
            </Grid>
        </Stack>
    );
}
