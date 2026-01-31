import * as z from 'zod';
import { ActorTypeSchema } from '../../enums/ActorType.schema';
// prettier-ignore
export const ActorResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    label: z.string(),
    type: ActorTypeSchema,
    note: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown()),
    caches: z.array(z.unknown()),
    geoDirections: z.array(z.unknown()),
    maptilerQueries: z.array(z.unknown()),
    maptilerCacheEntries: z.array(z.unknown()),
    osrmCacheEntries: z.array(z.unknown())
}).strict();

export type ActorResultType = z.infer<typeof ActorResultSchema>;
