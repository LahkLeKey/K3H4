import * as z from 'zod';
import { ActorTypeSchema } from '../../enums/ActorType.schema';
// prettier-ignore
export const ActorModelSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    label: z.string(),
    type: ActorTypeSchema,
    note: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    osmType: z.string().nullable(),
    osmId: z.bigint().nullable(),
    latitude: z.number().nullable(),
    longitude: z.number().nullable(),
    category: z.string().nullable(),
    lastSeenAt: z.date().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown()),
    caches: z.array(z.unknown())
}).strict();

export type ActorPureType = z.infer<typeof ActorModelSchema>;
