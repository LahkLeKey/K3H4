import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  startsAt: SortOrderSchema.optional(),
  endsAt: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  coverageStatus: SortOrderSchema.optional(),
  assignedPersonaId: SortOrderSchema.optional(),
  assignedCandidateId: SortOrderSchema.optional(),
  notes: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffingShiftMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingShiftMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingShiftMaxOrderByAggregateInput>;
export const StaffingShiftMaxOrderByAggregateInputObjectZodSchema = makeSchema();
