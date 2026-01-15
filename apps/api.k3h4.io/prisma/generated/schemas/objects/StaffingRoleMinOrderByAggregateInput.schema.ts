import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  modality: SortOrderSchema.optional(),
  openings: SortOrderSchema.optional(),
  filled: SortOrderSchema.optional(),
  priority: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  rateMin: SortOrderSchema.optional(),
  rateMax: SortOrderSchema.optional(),
  billRate: SortOrderSchema.optional(),
  payRate: SortOrderSchema.optional(),
  tags: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffingRoleMinOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingRoleMinOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingRoleMinOrderByAggregateInput>;
export const StaffingRoleMinOrderByAggregateInputObjectZodSchema = makeSchema();
