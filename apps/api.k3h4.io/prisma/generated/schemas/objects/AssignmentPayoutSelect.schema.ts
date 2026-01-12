import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentArgsObjectSchema as AssignmentArgsObjectSchema } from './AssignmentArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  assignmentId: z.boolean().optional(),
  assignment: z.union([z.boolean(), z.lazy(() => AssignmentArgsObjectSchema)]).optional(),
  personaId: z.boolean().optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional(),
  amount: z.boolean().optional(),
  note: z.boolean().optional(),
  invoiceUrl: z.boolean().optional(),
  status: z.boolean().optional(),
  createdAt: z.boolean().optional()
}).strict();
export const AssignmentPayoutSelectObjectSchema: z.ZodType<Prisma.AssignmentPayoutSelect> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutSelect>;
export const AssignmentPayoutSelectObjectZodSchema = makeSchema();
