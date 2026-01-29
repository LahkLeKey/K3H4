import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionDirectionSchema } from '../enums/BankTransactionDirection.schema'

const makeSchema = () => z.object({
  set: BankTransactionDirectionSchema.optional()
}).strict();
export const NullableEnumBankTransactionDirectionFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.NullableEnumBankTransactionDirectionFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.NullableEnumBankTransactionDirectionFieldUpdateOperationsInput>;
export const NullableEnumBankTransactionDirectionFieldUpdateOperationsInputObjectZodSchema = makeSchema();
