import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityCreateManySourceInputObjectSchema as PersonaCompatibilityCreateManySourceInputObjectSchema } from './PersonaCompatibilityCreateManySourceInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => PersonaCompatibilityCreateManySourceInputObjectSchema), z.lazy(() => PersonaCompatibilityCreateManySourceInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const PersonaCompatibilityCreateManySourceInputEnvelopeObjectSchema: z.ZodType<Prisma.PersonaCompatibilityCreateManySourceInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityCreateManySourceInputEnvelope>;
export const PersonaCompatibilityCreateManySourceInputEnvelopeObjectZodSchema = makeSchema();
