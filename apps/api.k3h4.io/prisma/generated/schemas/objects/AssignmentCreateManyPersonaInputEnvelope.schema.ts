import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateManyPersonaInputObjectSchema as AssignmentCreateManyPersonaInputObjectSchema } from './AssignmentCreateManyPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AssignmentCreateManyPersonaInputObjectSchema), z.lazy(() => AssignmentCreateManyPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AssignmentCreateManyPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.AssignmentCreateManyPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateManyPersonaInputEnvelope>;
export const AssignmentCreateManyPersonaInputEnvelopeObjectZodSchema = makeSchema();
