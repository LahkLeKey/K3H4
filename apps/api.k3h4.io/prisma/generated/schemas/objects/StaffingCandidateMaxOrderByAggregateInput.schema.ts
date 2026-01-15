import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  engagementId: SortOrderSchema.optional(),
  roleId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  fullName: SortOrderSchema.optional(),
  email: SortOrderSchema.optional(),
  phone: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  stage: SortOrderSchema.optional(),
  score: SortOrderSchema.optional(),
  desiredRate: SortOrderSchema.optional(),
  availability: SortOrderSchema.optional(),
  location: SortOrderSchema.optional(),
  note: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const StaffingCandidateMaxOrderByAggregateInputObjectSchema: z.ZodType<Prisma.StaffingCandidateMaxOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.StaffingCandidateMaxOrderByAggregateInput>;
export const StaffingCandidateMaxOrderByAggregateInputObjectZodSchema = makeSchema();
