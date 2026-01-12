import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateManyTargetInputObjectSchema as PersonaCompatibilityCreateManyTargetInputObjectSchema } from './PersonaCompatibilityCreateManyTargetInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaCompatibilityCreateManyTargetInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateManyTargetInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaCompatibilityCreateManyTargetInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateManyTargetInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateManyTargetInputEnvelope>;
export const PersonaCompatibilityCreateManyTargetInputEnvelopeObjectZodSchema = makeSchema();
