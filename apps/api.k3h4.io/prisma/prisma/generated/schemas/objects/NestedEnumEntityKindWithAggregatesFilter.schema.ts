import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { EntityKindSchema } from '../enums/EntityKind.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumEntityKindFilterObjectSchema as NestedEnumEntityKindFilterObjectSchema } from './NestedEnumEntityKindFilter.schema'

const nestedenumentitykindwithaggregatesfilterSchema = z.object({
  equals: EntityKindSchema.optional(),
  in: EntityKindSchema.array().optional(),
  notIn: EntityKindSchema.array().optional(),
  not: z.union([EntityKindSchema, z.lazy(() => NestedEnumEntityKindWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumEntityKindFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumEntityKindFilterObjectSchema).optional()
}).strict();
export const NestedEnumEntityKindWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumEntityKindWithAggregatesFilter> = nestedenumentitykindwithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumEntityKindWithAggregatesFilter>;
export const NestedEnumEntityKindWithAggregatesFilterObjectZodSchema = nestedenumentitykindwithaggregatesfilterSchema;
