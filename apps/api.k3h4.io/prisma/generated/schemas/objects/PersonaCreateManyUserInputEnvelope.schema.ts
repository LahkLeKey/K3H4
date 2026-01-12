import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateManyUserInputObjectSchema as PersonaCreateManyUserInputObjectSchema } from './PersonaCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaCreateManyUserInputObjectSchema), z.lazy(() => PersonaCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCreateManyUserInputEnvelope>;
export const PersonaCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
