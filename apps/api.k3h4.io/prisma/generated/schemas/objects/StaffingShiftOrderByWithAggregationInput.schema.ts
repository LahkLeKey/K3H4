import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { StaffingShiftCountOrderByAggregateInputObjectSchema as StaffingShiftCountOrderByAggregateInputObjectSchema } from './StaffingShiftCountOrderByAggregateInput.schema';
import { StaffingShiftMaxOrderByAggregateInputObjectSchema as StaffingShiftMaxOrderByAggregateInputObjectSchema } from './StaffingShiftMaxOrderByAggregateInput.schema';
import { StaffingShiftMinOrderByAggregateInputObjectSchema as StaffingShiftMinOrderByAggregateInputObjectSchema } from './StaffingShiftMinOrderByAggregateInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  roleId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  title: SortOrderSchema.optional(),
  location: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  startsAt: SortOrderSchema.optional(),
  endsAt: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  coverageStatus: SortOrderSchema.optional(),
  assignedPersonaId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  assignedCandidateId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  notes: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  _count: z.lazy(() => StaffingShiftCountOrderByAggregateInputObjectSchema).optional(),
  _max: z.lazy(() => StaffingShiftMaxOrderByAggregateInputObjectSchema).optional(),
  _min: z.lazy(() => StaffingShiftMinOrderByAggregateInputObjectSchema).optional()
}).strict();
export const StaffingShiftOrderByWithAggregationInputObjectSchema: z.ZodType<Prisma.StaffingShiftOrderByWithAggregationInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftOrderByWithAggregationInput>;
export const StaffingShiftOrderByWithAggregationInputObjectZodSchema = makeSchema();
