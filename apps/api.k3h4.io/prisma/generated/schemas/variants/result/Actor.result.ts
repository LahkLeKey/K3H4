import * as z from 'zod';
import { BankActorTypeSchema } from '../../enums/BankActorType.schema';
// prettier-ignore
export const ActorResultSchema = z.object({
    id: z.string(),
    userId: z.string().nullable(),
    user: z.unknown().nullable(),
    label: z.string(),
    type: BankActorTypeSchema,
    note: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date(),
    entities: z.array(z.unknown())
}).strict();

export type ActorResultType = z.infer<typeof ActorResultSchema>;
