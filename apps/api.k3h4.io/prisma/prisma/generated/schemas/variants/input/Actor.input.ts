import * as z from 'zod';
import { ActorTypeSchema } from '../../enums/ActorType.schema';
// prettier-ignore
export const ActorInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    label: z.string(),
    type: ActorTypeSchema,
    note: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    osmType: z.string().optional().nullable(),
    osmId: z.bigint().optional().nullable(),
    latitude: z.number().optional().nullable(),
    longitude: z.number().optional().nullable(),
    category: z.string().optional().nullable(),
    lastSeenAt: z.date().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown()),
    caches: z.array(z.unknown())
}).strict();

export type ActorInputType = z.infer<typeof ActorInputSchema>;
