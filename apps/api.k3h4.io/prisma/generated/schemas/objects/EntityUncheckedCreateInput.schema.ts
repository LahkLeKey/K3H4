import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

const makeSchema = () => z.object({
  id: z.string().optional(),
  actorId: z.string(),
  kind: BankTransactionKindSchema,
  direction: BankTransactionDirectionSchema.optional().nullable(),
  name: z.string().optional().nullable(),
  targetType: z.string().optional().nullable(),
  targetId: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const EntityUncheckedCreateInputObjectSchema: z.ZodType<Prisma.EntityUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.EntityUncheckedCreateInput>;
export const EntityUncheckedCreateInputObjectZodSchema = makeSchema();
