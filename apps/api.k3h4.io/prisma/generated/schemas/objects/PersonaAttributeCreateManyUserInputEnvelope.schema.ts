import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateManyUserInputObjectSchema as PersonaAttributeCreateManyUserInputObjectSchema } from './PersonaAttributeCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaAttributeCreateManyUserInputObjectSchema), z.lazy(() => PersonaAttributeCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaAttributeCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateManyUserInputEnvelope>;
export const PersonaAttributeCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
