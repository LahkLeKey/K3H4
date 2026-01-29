import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankActorTypeSchema } from '../enums/BankActorType.schema';
import { NestedEnumBankActorTypeFilterObjectSchema as NestedEnumBankActorTypeFilterObjectSchema } from './NestedEnumBankActorTypeFilter.schema'

const makeSchema = () => z.object({
  equals: BankActorTypeSchema.optional(),
  in: BankActorTypeSchema.array().optional(),
  notIn: BankActorTypeSchema.array().optional(),
  not: z.union([BankActorTypeSchema, z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumBankActorTypeFilterObjectSchema: z.ZodType<Prisma.EnumBankActorTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankActorTypeFilter>;
export const EnumBankActorTypeFilterObjectZodSchema = makeSchema();
