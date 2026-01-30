import * as z from 'zod';
import { EntityKindSchema } from '../../enums/EntityKind.schema';
import { EntityDirectionSchema } from '../../enums/EntityDirection.schema';
// prettier-ignore
export const EntityModelSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: EntityKindSchema,
    direction: EntityDirectionSchema.nullable(),
    name: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityPureType = z.infer<typeof EntityModelSchema>;
