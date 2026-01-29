import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BankActorTypeSchema } from '../enums/BankActorType.schema';
import { NestedEnumBankActorTypeWithAggregatesFilterObjectSchema as NestedEnumBankActorTypeWithAggregatesFilterObjectSchema } from './NestedEnumBankActorTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBankActorTypeFilterObjectSchema as NestedEnumBankActorTypeFilterObjectSchema } from './NestedEnumBankActorTypeFilter.schema'

const makeSchema = () => z.object({
  equals: BankActorTypeSchema.optional(),
  in: BankActorTypeSchema.array().optional(),
  notIn: BankActorTypeSchema.array().optional(),
  not: z.union([BankActorTypeSchema, z.lazy(() => NestedEnumBankActorTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBankActorTypeFilterObjectSchema).optional()
}).strict();
export const EnumBankActorTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBankActorTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBankActorTypeWithAggregatesFilter>;
export const EnumBankActorTypeWithAggregatesFilterObjectZodSchema = makeSchema();
