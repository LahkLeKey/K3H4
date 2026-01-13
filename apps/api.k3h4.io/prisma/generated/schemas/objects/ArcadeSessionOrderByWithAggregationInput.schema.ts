import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ArcadeSessionCountOrderByAggregateInputObjectSchema as ArcadeSessionCountOrderByAggregateInputObjectSchema } from './ArcadeSessionCountOrderByAggregateInput.schema';
import { ArcadeSessionAvgOrderByAggregateInputObjectSchema as ArcadeSessionAvgOrderByAggregateInputObjectSchema } from './ArcadeSessionAvgOrderByAggregateInput.schema';
import { ArcadeSessionMaxOrderByAggregateInputObjectSchema as ArcadeSessionMaxOrderByAggregateInputObjectSchema } from './ArcadeSessionMaxOrderByAggregateInput.schema';
import { ArcadeSessionMinOrderByAggregateInputObjectSchema as ArcadeSessionMinOrderByAggregateInputObjectSchema } from './ArcadeSessionMinOrderByAggregateInput.schema';
import { ArcadeSessionSumOrderByAggregateInputObjectSchema as ArcadeSessionSumOrderByAggregateInputObjectSchema } from './ArcadeSessionSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  machineId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  creditsSpent: SortOrderSchema.optional(),
  score: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rewardRedemptionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startedAt: SortOrderSchema.optional(),
  endedAt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  _count: z.lazy(() => ArcadeSessionCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ArcadeSessionAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadeSessionMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadeSessionMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ArcadeSessionSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeSessionOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadeSessionOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeSessionOrderByWithAggregationInput>;
export const ArcadeSessionOrderByWithAggregationInputObjectZodSchema = makeSchema();
