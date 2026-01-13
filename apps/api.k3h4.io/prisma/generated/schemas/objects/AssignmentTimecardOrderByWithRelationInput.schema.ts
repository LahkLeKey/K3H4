import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AssignmentOrderByWithRelationInputObjectSchema as AssignmentOrderByWithRelationInputObjectSchema } from './AssignmentOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  hours: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  assignment: z.lazy(() => AssignmentOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AssignmentTimecardOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AssignmentTimecardOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentTimecardOrderByWithRelationInput>;
export const AssignmentTimecardOrderByWithRelationInputObjectZodSchema = makeSchema();
