import * as z from 'zod';
import { BankTransactionKindSchema } from '../../enums/BankTransactionKind.schema';
import { BankTransactionDirectionSchema } from '../../enums/BankTransactionDirection.schema';
// prettier-ignore
export const EntityModelSchema = z.object({
    id: z.string(),
    actorId: z.string(),
    actor: z.unknown(),
    kind: BankTransactionKindSchema,
    direction: BankTransactionDirectionSchema.nullable(),
    name: z.string().nullable(),
    targetType: z.string().nullable(),
    targetId: z.string().nullable(),
    source: z.string().nullable(),
    metadata: z.unknown().nullable(),
    createdAt: z.date(),
    updatedAt: z.date()
}).strict();

export type EntityPureType = z.infer<typeof EntityModelSchema>;
