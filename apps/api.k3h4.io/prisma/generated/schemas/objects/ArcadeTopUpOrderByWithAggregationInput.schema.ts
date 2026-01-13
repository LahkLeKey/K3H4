import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { ArcadeTopUpCountOrderByAggregateInputObjectSchema as ArcadeTopUpCountOrderByAggregateInputObjectSchema } from './ArcadeTopUpCountOrderByAggregateInput.schema';
import { ArcadeTopUpAvgOrderByAggregateInputObjectSchema as ArcadeTopUpAvgOrderByAggregateInputObjectSchema } from './ArcadeTopUpAvgOrderByAggregateInput.schema';
import { ArcadeTopUpMaxOrderByAggregateInputObjectSchema as ArcadeTopUpMaxOrderByAggregateInputObjectSchema } from './ArcadeTopUpMaxOrderByAggregateInput.schema';
import { ArcadeTopUpMinOrderByAggregateInputObjectSchema as ArcadeTopUpMinOrderByAggregateInputObjectSchema } from './ArcadeTopUpMinOrderByAggregateInput.schema';
import { ArcadeTopUpSumOrderByAggregateInputObjectSchema as ArcadeTopUpSumOrderByAggregateInputObjectSchema } from './ArcadeTopUpSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  cardId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ArcadeTopUpCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => ArcadeTopUpAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadeTopUpMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadeTopUpMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => ArcadeTopUpSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeTopUpOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadeTopUpOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeTopUpOrderByWithAggregationInput>;
export const ArcadeTopUpOrderByWithAggregationInputObjectZodSchema = makeSchema();
