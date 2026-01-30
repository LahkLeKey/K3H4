import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { NestedEnumEntityKindWithAggregatesFilterObjectSchema as NestedEnumEntityKindWithAggregatesFilterObjectSchema } from './NestedEnumEntityKindWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumEntityKindFilterObjectSchema as NestedEnumEntityKindFilterObjectSchema } from './NestedEnumEntityKindFilter.schema'

const makeSchema = () => z.object({
  equals: EntityKindSchema.optional(),
  in: EntityKindSchema.array().optional(),
  notIn: EntityKindSchema.array().optional(),
  not: z.union([EntityKindSchema, z.lazy(() => NestedEnumEntityKindWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEntityKindFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEntityKindFilterObjectSchema).optional()
}).strict();
export const EnumEntityKindWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumEntityKindWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumEntityKindWithAggregatesFilter>;
export const EnumEntityKindWithAggregatesFilterObjectZodSchema = makeSchema();
