import { useEffect, useMemo } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button, Card, FormField, Input, Stack, Textarea } from "../ui";
import { ActorCreateSchema, EntityCreateSchema, type ActorCreateInput, type EntityCreateInput } from "../../schemas/actor-entity";

const jsonStringSchema = z.string().optional().superRefine((value, ctx) => {
    if (!value || value.trim().length === 0) return;
    try {
        JSON.parse(value);
    } catch {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Invalid JSON" });
    }
});

const ActorFormSchema = z.object({
    label: z.string().min(1, "Label is required"),
    type: z.string().min(1, "Type is required"),
    category: z.string().optional(),
    note: z.string().optional(),
    source: z.string().optional(),
    metadataJson: jsonStringSchema,
});

const EntityFormSchema = z.object({
    actorId: z.string().min(1, "Actor ID is required"),
    kind: z.string().min(1, "Kind is required"),
    direction: z.string().optional(),
    name: z.string().optional(),
    targetType: z.string().optional(),
    targetId: z.string().optional(),
    source: z.string().optional(),
    metadataJson: jsonStringSchema,
});

export type ActorFormValues = z.infer<typeof ActorFormSchema>;
export type EntityFormValues = z.infer<typeof EntityFormSchema>;

const parseMetadata = (value?: string) => {
    if (!value || value.trim().length === 0) return undefined;
    try {
        return JSON.parse(value) as unknown;
    } catch {
        return undefined;
    }
};

export type ActorFormProps = {
    title?: string;
    subtitle?: string;
    defaultValues?: Partial<ActorFormValues>;
    busy?: boolean;
    onSubmit: (payload: ActorCreateInput) => Promise<void> | void;
};

export function ActorCreateForm({ title = "Create Actor", subtitle, defaultValues, busy, onSubmit }: ActorFormProps) {
    const form = useForm<ActorFormValues>({
        resolver: zodResolver(ActorFormSchema),
        defaultValues: {
            label: "",
            type: "",
            category: "",
            note: "",
            source: "",
            metadataJson: "",
            ...defaultValues,
        },
    });

    const errors = form.formState.errors;

    const handleSubmit = form.handleSubmit(async (values) => {
        const metadata = parseMetadata(values.metadataJson);
        const payload = ActorCreateSchema.parse({
            label: values.label,
            type: values.type,
            category: values.category || null,
            note: values.note || null,
            source: values.source || null,
            metadata: metadata ?? null,
        });
        await onSubmit(payload);
        form.reset({ ...values, label: "", type: "", note: "", source: "", category: "", metadataJson: "" });
    });

    return (
        <Card title={title} subtitle={subtitle}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Label" required error={errors.label?.message}>
                        <Input {...form.register("label")} placeholder="Human-friendly label" />
                    </FormField>
                    <FormField label="Type" required error={errors.type?.message}>
                        <Input {...form.register("type")} placeholder="actor type" />
                    </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Category" error={errors.category?.message}>
                        <Input {...form.register("category")} placeholder="Optional" />
                    </FormField>
                    <FormField label="Source" error={errors.source?.message}>
                        <Input {...form.register("source")} placeholder="Optional" />
                    </FormField>
                </div>
                <FormField label="Note" error={errors.note?.message}>
                    <Input {...form.register("note")} placeholder="Optional notes" />
                </FormField>
                <FormField label="Metadata JSON" description="Paste JSON payload for the actor." error={errors.metadataJson?.message}>
                    <Textarea rows={5} {...form.register("metadataJson")} placeholder='{"key":"value"}' />
                </FormField>
                <Stack direction="row" justify="between" align="center">
                    <span className="text-xs text-slate-400">POST /actors</span>
                    <Button type="submit" disabled={busy}>
                        {busy ? "Saving…" : "Create actor"}
                    </Button>
                </Stack>
            </form>
        </Card>
    );
}

export type EntityFormProps = {
    title?: string;
    subtitle?: string;
    defaultValues?: Partial<EntityFormValues>;
    busy?: boolean;
    onSubmit: (payload: EntityCreateInput) => Promise<void> | void;
};

export function EntityCreateForm({ title = "Create Entity", subtitle, defaultValues, busy, onSubmit }: EntityFormProps) {
    const initialValues = useMemo(
        () => ({
            actorId: "",
            kind: "",
            direction: "",
            name: "",
            targetType: "",
            targetId: "",
            source: "",
            metadataJson: "",
            ...defaultValues,
        }),
        [defaultValues],
    );

    const form = useForm<EntityFormValues>({
        resolver: zodResolver(EntityFormSchema),
        defaultValues: initialValues,
    });

    useEffect(() => {
        form.setValue("actorId", initialValues.actorId);
    }, [form, initialValues.actorId]);

    const errors = form.formState.errors;

    const handleSubmit = form.handleSubmit(async (values) => {
        const metadata = parseMetadata(values.metadataJson);
        const payload = EntityCreateSchema.parse({
            actorId: values.actorId,
            kind: values.kind,
            direction: values.direction || null,
            name: values.name || null,
            targetType: values.targetType || null,
            targetId: values.targetId || null,
            source: values.source || null,
            metadata: metadata ?? null,
        });
        await onSubmit(payload);
        form.reset({ ...values, kind: "", direction: "", name: "", targetType: "", targetId: "", source: "", metadataJson: "" });
    });

    return (
        <Card title={title} subtitle={subtitle}>
            <form onSubmit={handleSubmit} className="space-y-4">
                <FormField label="Actor ID" required error={errors.actorId?.message}>
                    <Input {...form.register("actorId")} placeholder="actor id" />
                </FormField>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Kind" required error={errors.kind?.message}>
                        <Input {...form.register("kind")} placeholder="entity kind" />
                    </FormField>
                    <FormField label="Direction" error={errors.direction?.message}>
                        <Input {...form.register("direction")} placeholder="credit/debit" />
                    </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Name" error={errors.name?.message}>
                        <Input {...form.register("name")} placeholder="Optional" />
                    </FormField>
                    <FormField label="Source" error={errors.source?.message}>
                        <Input {...form.register("source")} placeholder="Optional" />
                    </FormField>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                    <FormField label="Target Type" error={errors.targetType?.message}>
                        <Input {...form.register("targetType")} placeholder="Optional" />
                    </FormField>
                    <FormField label="Target ID" error={errors.targetId?.message}>
                        <Input {...form.register("targetId")} placeholder="Optional" />
                    </FormField>
                </div>
                <FormField label="Metadata JSON" description="Paste JSON payload for the entity." error={errors.metadataJson?.message}>
                    <Textarea rows={5} {...form.register("metadataJson")} placeholder='{"key":"value"}' />
                </FormField>
                <Stack direction="row" justify="between" align="center">
                    <span className="text-xs text-slate-400">POST /actors/:actorId/entities</span>
                    <Button type="submit" disabled={busy}>
                        {busy ? "Saving…" : "Create entity"}
                    </Button>
                </Stack>
            </form>
        </Card>
    );
}
