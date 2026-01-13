import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  title: SortOrderSchema.optional(),
  hourlyRate: SortOrderSchema.optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional()
}).strict();
export const AssignmentCountOrderByAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentCountOrderByAggregateInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCountOrderByAggregateInput>;
export const AssignmentCountOrderByAggregateInputObjectZodSchema = makeSchema();
