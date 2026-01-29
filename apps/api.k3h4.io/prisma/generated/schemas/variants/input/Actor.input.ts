import * as z from 'zod';
import { BankActorTypeSchema } from '../../enums/BankActorType.schema';
// prettier-ignore
export const ActorInputSchema = z.object({
    id: z.string(),
    userId: z.string().optional().nullable(),
    user: z.unknown().optional().nullable(),
    label: z.string(),
    type: BankActorTypeSchema,
    note: z.string().optional().nullable(),
    source: z.string().optional().nullable(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown())
}).strict();

export type ActorInputType = z.infer<typeof ActorInputSchema>;
