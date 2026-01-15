import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  candidateId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  startDate: SortOrderSchema.optional(),
  endDate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  billRate: SortOrderSchema.optional(),
  payRate: SortOrderSchema.optional(),
  margin: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffingPlacementMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingPlacementMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingPlacementMinOrderByAggregateInput>;
export const StaffingPlacementMinOrderByAggregateInputObjectZodSchema = makeSchema();
