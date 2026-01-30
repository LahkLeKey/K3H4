import * as z from 'zod';
import { EntityKindSchema } from '../../enums/EntityKind.schema';
import { EntityDirectionSchema } from '../../enums/EntityDirection.schema';
// prettier-ignore
export const EntityInputSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: EntityKindSchema,
    direction: EntityDirectionSchema.optional().nullable(),
    name: z.string().optional().nullable(),
    targetType: z.string().optional().nullable(),
    targetId: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityInputType = z.infer<typeof EntityInputSchema>;
