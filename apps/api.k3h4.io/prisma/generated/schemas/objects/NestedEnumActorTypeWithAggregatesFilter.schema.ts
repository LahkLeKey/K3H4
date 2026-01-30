import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ActorTypeSchema } from '../enums/ActorType.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumActorTypeFilterObjectSchema as NestedEnumActorTypeFilterObjectSchema } from './NestedEnumActorTypeFilter.schema'

const nestedenumactortypewithaggregatesfilterSchema = z.object({
  equals: ActorTypeSchema.optional(),
  in: ActorTypeSchema.array().optional(),
  notIn: ActorTypeSchema.array().optional(),
  not: z.union([ActorTypeSchema, z.lazy(() => NestedEnumActorTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumActorTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumActorTypeFilterObjectSchema).optional()
}).strict();
export const NestedEnumActorTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumActorTypeWithAggregatesFilter> = nestedenumactortypewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumActorTypeWithAggregatesFilter>;
export const NestedEnumActorTypeWithAggregatesFilterObjectZodSchema = nestedenumactortypewithaggregatesfilterSchema;
