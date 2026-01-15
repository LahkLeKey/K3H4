import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffingRoleCountOrderByAggregateInputObjectSchema as StaffingRoleCountOrderByAggregateInputObjectSchema } from './StaffingRoleCountOrderByAggregateInput.schema';
import { StaffingRoleAvgOrderByAggregateInputObjectSchema as StaffingRoleAvgOrderByAggregateInputObjectSchema } from './StaffingRoleAvgOrderByAggregateInput.schema';
import { StaffingRoleMaxOrderByAggregateInputObjectSchema as StaffingRoleMaxOrderByAggregateInputObjectSchema } from './StaffingRoleMaxOrderByAggregateInput.schema';
import { StaffingRoleMinOrderByAggregateInputObjectSchema as StaffingRoleMinOrderByAggregateInputObjectSchema } from './StaffingRoleMinOrderByAggregateInput.schema';
import { StaffingRoleSumOrderByAggregateInputObjectSchema as StaffingRoleSumOrderByAggregateInputObjectSchema } from './StaffingRoleSumOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  modality: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  openings: SortOrderSchema.optional(),
  filled: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  rateMin: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  rateMax: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  billRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  payRate: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  tags: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  skills: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffingRoleCountOrderByAggregateInputObjectSchema).optional(),
  _avg: z.lazy(() => StaffingRoleAvgOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffingRoleMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffingRoleMinOrderByAggregateInputObjectSchema).optional(),
  _sum: z.lazy(() => StaffingRoleSumOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffingRoleOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffingRoleOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleOrderByWithAggregationInput>;
export const StaffingRoleOrderByWithAggregationInputObjectZodSchema = makeSchema();
