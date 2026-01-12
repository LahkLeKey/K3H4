import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { AssignmentOrderByWithRelationInputObjectSchema as AssignmentOrderByWithRelationInputObjectSchema } from './AssignmentOrderByWithRelationInput.schema';
import { PersonaOrderByWithRelationInputObjectSchema as PersonaOrderByWithRelationInputObjectSchema } from './PersonaOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  assignmentId: SortOrderSchema.optional(),
  personaId: SortOrderSchema.optional(),
  amount: SortOrderSchema.optional(),
  note: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  invoiceUrl: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  status: SortOrderSchema.optional(),
  createdAt: SortOrderSchema.optional(),
  assignment: z.lazy(() => AssignmentOrderByWithRelationInputObjectSchema).optional(),
  persona: z.lazy(() => PersonaOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const AssignmentPayoutOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutOrderByWithRelationInput>;
export const AssignmentPayoutOrderByWithRelationInputObjectZodSchema = makeSchema();
