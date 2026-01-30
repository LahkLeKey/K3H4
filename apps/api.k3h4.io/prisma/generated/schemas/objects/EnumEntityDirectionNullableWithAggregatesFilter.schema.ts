import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityDirectionSchema } from '../enums/EntityDirection.schema';
import { NestedEnumEntityDirectionNullableWithAggregatesFilterObjectSchema as NestedEnumEntityDirectionNullableWithAggregatesFilterObjectSchema } from './NestedEnumEntityDirectionNullableWithAggregatesFilter.schema';
import { NestedIntNullableFilterObjectSchema as NestedIntNullableFilterObjectSchema } from './NestedIntNullableFilter.schema';
import { NestedEnumEntityDirectionNullableFilterObjectSchema as NestedEnumEntityDirectionNullableFilterObjectSchema } from './NestedEnumEntityDirectionNullableFilter.schema'

const makeSchema = () => z.object({
  equals: EntityDirectionSchema.optional().nullable(),
  in: EntityDirectionSchema.array().optional().nullable(),
  notIn: EntityDirectionSchema.array().optional().nullable(),
  not: z.union([EntityDirectionSchema, z.lazy(() => NestedEnumEntityDirectionNullableWithAggregatesFilterObjectSchema)]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEntityDirectionNullableFilterObjectSchema).optional()
}).strict();
export const EnumEntityDirectionNullableWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumEntityDirectionNullableWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEntityDirectionNullableWithAggregatesFilter>;
export const EnumEntityDirectionNullableWithAggregatesFilterObjectZodSchema = makeSchema();
