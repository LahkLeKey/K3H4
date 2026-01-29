import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankTransactionKindSchema } from '../enums/BankTransactionKind.schema'

const makeSchema = () => z.object({
  set: BankTransactionKindSchema.optional()
}).strict();
export const EnumBankTransactionKindFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumBankTransactionKindFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankTransactionKindFieldUpdateOperationsInput>;
export const EnumBankTransactionKindFieldUpdateOperationsInputObjectZodSchema = makeSchema();
