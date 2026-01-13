import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeCreateManyPersonaInputObjectSchema as PersonaAttributeCreateManyPersonaInputObjectSchema } from './PersonaAttributeCreateManyPersonaInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaAttributeCreateManyPersonaInputObjectSchema), z.lazy(() => PersonaAttributeCreateManyPersonaInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaAttributeCreateManyPersonaInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateManyPersonaInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateManyPersonaInputEnvelope>;
export const PersonaAttributeCreateManyPersonaInputEnvelopeObjectZodSchema = makeSchema();
