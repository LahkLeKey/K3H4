import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankActorTypeSchema } from '../enums/BankActorType.schema'

const makeSchema = () => z.object({
  set: BankActorTypeSchema.optional()
}).strict();
export const EnumBankActorTypeFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumBankActorTypeFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankActorTypeFieldUpdateOperationsInput>;
export const EnumBankActorTypeFieldUpdateOperationsInputObjectZodSchema = makeSchema();
