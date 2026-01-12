import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentArgsObjectSchema as AssignmentArgsObjectSchema } from './AssignmentArgs.schema';
import { PersonaArgsObjectSchema as PersonaArgsObjectSchema } from './PersonaArgs.schema'

const makeSchema = () => z.object({
  assignment: z.union([z.boolean(), z.lazy(() => AssignmentArgsObjectSchema)]).optional(),
  persona: z.union([z.boolean(), z.lazy(() => PersonaArgsObjectSchema)]).optional()
}).strict();
export const AssignmentPayoutIncludeObjectSchema: z.ZodType<Prisma.AssignmentPayoutInclude> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutInclude>;
export const AssignmentPayoutIncludeObjectZodSchema = makeSchema();
