import * as z from 'zod';
import { LifecycleStatusSchema } from '../../enums/LifecycleStatus.schema';
// prettier-ignore
export const PersonaCompatibilityInputSchema = z.object({
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
    overlappingTokens: z.unknown().optional().nullable(),
    computedAt: z.date(),
    rationale: z.string().optional().nullable(),
    status: LifecycleStatusSchema
}).strict();

export type PersonaCompatibilityInputType = z.infer<typeof PersonaCompatibilityInputSchema>;
