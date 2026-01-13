import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.literal(true).optional(),
  assignmentId: z.literal(true).optional(),
  personaId: z.literal(true).optional(),
  amount: z.literal(true).optional(),
  note: z.literal(true).optional(),
  invoiceUrl: z.literal(true).optional(),
  status: z.literal(true).optional(),
  createdAt: z.literal(true).optional()
}).strict();
export const AssignmentPayoutMaxAggregateInputObjectSchema: z.ZodType<Prisma.AssignmentPayoutMaxAggregateInputType> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutMaxAggregateInputType>;
export const AssignmentPayoutMaxAggregateInputObjectZodSchema = makeSchema();
