import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { PosTicketCountOrderByAggregateInputObjectSchema as PosTicketCountOrderByAggregateInputObjectSchema } from './PosTicketCountOrderByAggregateInput.schema';
import { PosTicketAvgOrderByAggregateInputObjectSchema as PosTicketAvgOrderByAggregateInputObjectSchema } from './PosTicketAvgOrderByAggregateInput.schema';
import { PosTicketMaxOrderByAggregateInputObjectSchema as PosTicketMaxOrderByAggregateInputObjectSchema } from './PosTicketMaxOrderByAggregateInput.schema';
import { PosTicketMinOrderByAggregateInputObjectSchema as PosTicketMinOrderByAggregateInputObjectSchema } from './PosTicketMinOrderByAggregateInput.schema';
import { PosTicketSumOrderByAggregateInputObjectSchema as PosTicketSumOrderByAggregateInputObjectSchema } from './PosTicketSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  storeId: SortOrderSchema.optional(),
  total: SortOrderSchema.optional(),
  itemsCount: SortOrderSchema.optional(),
  channel: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => PosTicketCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => PosTicketAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => PosTicketMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => PosTicketMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => PosTicketSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const PosTicketOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.PosTicketOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.PosTicketOrderByWithAggregationInput>;
export const PosTicketOrderByWithAggregationInputObjectZodSchema = makeSchema();
