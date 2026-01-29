import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankActorTypeSchema } from '../enums/BankActorType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBankActorTypeFilterObjectSchema as NestedEnumBankActorTypeFilterObjectSchema } from './NestedEnumBankActorTypeFilter.schema'

const nestedenumbankactortypewithaggregatesfilterSchema = z.object({
  equals: BankActorTypeSchema.optional(),
  in: BankActorTypeSchema.array().optional(),
  notIn: BankActorTypeSchema.array().optional(),
  not: z.union([BankActorTypeSchema, z.lazy(() => NestedEnumBankActorTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumBankActorTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumBankActorTypeWithAggregatesFilter> = nestedenumbankactortypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumBankActorTypeWithAggregatesFilter>;
export const NestedEnumBankActorTypeWithAggregatesFilterObjectZodSchema = nestedenumbankactortypewithaggregatesfilterSchema;
