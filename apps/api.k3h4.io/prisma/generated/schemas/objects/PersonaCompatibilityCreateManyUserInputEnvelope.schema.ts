import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateManyUserInputObjectSchema as PersonaCompatibilityCreateManyUserInputObjectSchema } from './PersonaCompatibilityCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaCompatibilityCreateManyUserInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaCompatibilityCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateManyUserInputEnvelope>;
export const PersonaCompatibilityCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
