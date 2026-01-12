import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  is: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  isNot: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaScalarRelationFilterObjectSchema: z.ZodType<Prisma.PersonaScalarRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PersonaScalarRelationFilter>;
export const PersonaScalarRelationFilterObjectZodSchema = makeSchema();
