import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { ArcadeMachineCountOrderByAggregateInputObjectSchema as ArcadeMachineCountOrderByAggregateInputObjectSchema } from './ArcadeMachineCountOrderByAggregateInput.schema';
import { ArcadeMachineMaxOrderByAggregateInputObjectSchema as ArcadeMachineMaxOrderByAggregateInputObjectSchema } from './ArcadeMachineMaxOrderByAggregateInput.schema';
import { ArcadeMachineMinOrderByAggregateInputObjectSchema as ArcadeMachineMinOrderByAggregateInputObjectSchema } from './ArcadeMachineMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  gameTitle: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => ArcadeMachineCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => ArcadeMachineMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => ArcadeMachineMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const ArcadeMachineOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.ArcadeMachineOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.ArcadeMachineOrderByWithAggregationInput>;
export const ArcadeMachineOrderByWithAggregationInputObjectZodSchema = makeSchema();
