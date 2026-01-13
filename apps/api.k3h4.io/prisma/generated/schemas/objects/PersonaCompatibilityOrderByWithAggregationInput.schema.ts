import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { PersonaCompatibilityCountOrderByAggregateInputObjectSchema as PersonaCompatibilityCountOrderByAggregateInputObjectSchema } from './PersonaCompatibilityCountOrderByAggregateInput.schema';
import { PersonaCompatibilityAvgOrderByAggregateInputObjectSchema as PersonaCompatibilityAvgOrderByAggregateInputObjectSchema } from './PersonaCompatibilityAvgOrderByAggregateInput.schema';
import { PersonaCompatibilityMaxOrderByAggregateInputObjectSchema as PersonaCompatibilityMaxOrderByAggregateInputObjectSchema } from './PersonaCompatibilityMaxOrderByAggregateInput.schema';
import { PersonaCompatibilityMinOrderByAggregateInputObjectSchema as PersonaCompatibilityMinOrderByAggregateInputObjectSchema } from './PersonaCompatibilityMinOrderByAggregateInput.schema';
import { PersonaCompatibilitySumOrderByAggregateInputObjectSchema as PersonaCompatibilitySumOrderByAggregateInputObjectSchema } from './PersonaCompatibilitySumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  sourceId: SortOrderSchema.optional(),
  targetId: SortOrderSchema.optional(),
  jaccardScore: SortOrderSchema.optional(),
  intersectionCount: SortOrderSchema.optional(),
  unionCount: SortOrderSchema.optional(),
  overlappingTokens: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  computedAt: SortOrderSchema.optional(),
  rationale: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  _count: z.lazy(() => PersonaCompatibilityCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PersonaCompatibilityAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PersonaCompatibilityMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PersonaCompatibilityMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PersonaCompatibilitySumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PersonaCompatibilityOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PersonaCompatibilityOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityOrderByWithAggregationInput>;
export const PersonaCompatibilityOrderByWithAggregationInputObjectZodSchema = makeSchema();
