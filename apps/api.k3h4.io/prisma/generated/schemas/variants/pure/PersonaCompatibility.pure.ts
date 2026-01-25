import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const PersonaCompatibilityModelSchema = z.object({
    id: z.string(),
    userId: z.string(),
    user: z.unknown(),
    sourceId: z.string(),
    source: z.unknown(),
    targetId: z.string(),
    target: z.unknown(),
    jaccardScore: z.number(),
    intersectionCount: z.number().int(),
    unionCount: z.number().int(),
    overlappingTokens: z.unknown().nullable(),
    computedAt: z.date(),
    rationale: z.string().nullable(),
    status: LifecycleStatusSchema
}).strict();

export type PersonaCompatibilityPureType = z.infer<typeof PersonaCompatibilityModelSchema>;
