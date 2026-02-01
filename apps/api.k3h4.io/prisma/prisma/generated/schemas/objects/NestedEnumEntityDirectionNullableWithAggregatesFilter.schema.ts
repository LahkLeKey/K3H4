import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumEntityDirectionNullableFilterObjectSchema as NestedEnumEntityDirectionNullableFilterObjectSchema } from './NestedEnumEntityDirectionNullableFilter.schema'

const nestedenumentitydirectionnullablewithaggregatesfilterSchema = z.object({
  equals: EntityDirectionSchema.optional().nullable(),
  in: EntityDirectionSchema.array().optional().nullable(),
  notIn: EntityDirectionSchema.array().optional().nullable(),
  not: z.union([EntityDirectionSchema, z.lazy(() => NestedEnumEntityDirectionNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema).optional()
}).strict();
export const NestedEnumEntityDirectionNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumEntityDirectionNullableWithAggregatesFilter> = nestedenumentitydirectionnullablewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEntityDirectionNullableWithAggregatesFilter>;
export const NestedEnumEntityDirectionNullableWithAggregatesFilterObjectZodSchema = nestedenumentitydirectionnullablewithaggregatesfilterSchema;
