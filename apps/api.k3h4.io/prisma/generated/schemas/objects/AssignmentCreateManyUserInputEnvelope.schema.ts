import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentCreateManyUserInputObjectSchema as AssignmentCreateManyUserInputObjectSchema } from './AssignmentCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AssignmentCreateManyUserInputObjectSchema), z.lazy(() => AssignmentCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AssignmentCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.AssignmentCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentCreateManyUserInputEnvelope>;
export const AssignmentCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
