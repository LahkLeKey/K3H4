import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankActorTypeSchema } from '../enums/BankActorType.schema'

const nestedenumbankactortypefilterSchema = z.object({
  equals: BankActorTypeSchema.optional(),
  in: BankActorTypeSchema.array().optional(),
  notIn: BankActorTypeSchema.array().optional(),
  not: z.union([BankActorTypeSchema, z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumBankActorTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankActorTypeFilter> = nestedenumbankactortypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankActorTypeFilter>;
export const NestedEnumBankActorTypeFilterObjectZodSchema = nestedenumbankactortypefilterSchema;
