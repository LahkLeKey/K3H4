import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffingEngagementCountOrderByAggregateInputObjectSchema as StaffingEngagementCountOrderByAggregateInputObjectSchema } from './StaffingEngagementCountOrderByAggregateInput.schema';
import { StaffingEngagementAvgOrderByAggregateInputObjectSchema as StaffingEngagementAvgOrderByAggregateInputObjectSchema } from './StaffingEngagementAvgOrderByAggregateInput.schema';
import { StaffingEngagementMaxOrderByAggregateInputObjectSchema as StaffingEngagementMaxOrderByAggregateInputObjectSchema } from './StaffingEngagementMaxOrderByAggregateInput.schema';
import { StaffingEngagementMinOrderByAggregateInputObjectSchema as StaffingEngagementMinOrderByAggregateInputObjectSchema } from './StaffingEngagementMinOrderByAggregateInput.schema';
import { StaffingEngagementSumOrderByAggregateInputObjectSchema as StaffingEngagementSumOrderByAggregateInputObjectSchema } from './StaffingEngagementSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  name: SortOrderSchema.optional(),
  client: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  startDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  budget: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  forecast: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffingEngagementCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StaffingEngagementAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffingEngagementMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffingEngagementMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StaffingEngagementSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffingEngagementOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffingEngagementOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingEngagementOrderByWithAggregationInput>;
export const StaffingEngagementOrderByWithAggregationInputObjectZodSchema = makeSchema();
