import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AssignmentPayoutCreateManyPersonaInputObjectSchema as AssignmentPayoutCreateManyPersonaInputObjectSchema } from './AssignmentPayoutCreateManyPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => AssignmentPayoutCreateManyPersonaInputObjectSchema), z.lazy(() => AssignmentPayoutCreateManyPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const AssignmentPayoutCreateManyPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.AssignmentPayoutCreateManyPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.AssignmentPayoutCreateManyPersonaInputEnvelope>;
export const AssignmentPayoutCreateManyPersonaInputEnvelopeObjectZodSchema = makeSchema();
