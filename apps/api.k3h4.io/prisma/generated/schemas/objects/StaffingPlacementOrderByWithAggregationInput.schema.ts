import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffingPlacementCountOrderByAggregateInputObjectSchema as StaffingPlacementCountOrderByAggregateInputObjectSchema } from './StaffingPlacementCountOrderByAggregateInput.schema';
import { StaffingPlacementAvgOrderByAggregateInputObjectSchema as StaffingPlacementAvgOrderByAggregateInputObjectSchema } from './StaffingPlacementAvgOrderByAggregateInput.schema';
import { StaffingPlacementMaxOrderByAggregateInputObjectSchema as StaffingPlacementMaxOrderByAggregateInputObjectSchema } from './StaffingPlacementMaxOrderByAggregateInput.schema';
import { StaffingPlacementMinOrderByAggregateInputObjectSchema as StaffingPlacementMinOrderByAggregateInputObjectSchema } from './StaffingPlacementMinOrderByAggregateInput.schema';
import { StaffingPlacementSumOrderByAggregateInputObjectSchema as StaffingPlacementSumOrderByAggregateInputObjectSchema } from './StaffingPlacementSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  candidateId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  personaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startDate: SortOrderSchema.optional(),
  endDate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  billRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  margin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffingPlacementCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StaffingPlacementAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffingPlacementMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffingPlacementMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StaffingPlacementSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffingPlacementOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffingPlacementOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementOrderByWithAggregationInput>;
export const StaffingPlacementOrderByWithAggregationInputObjectZodSchema = makeSchema();
