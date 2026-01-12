import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './PersonaWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  some: z.lazy(() => PersonaWhereInputObjectSchema).optional(),
  none: z.lazy(() => PersonaWhereInputObjectSchema).optional()
}).strict();
export const PersonaListRelationFilterObjectSchema: z.ZodType<Prisma.PersonaListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PersonaListRelationFilter>;
export const PersonaListRelationFilterObjectZodSchema = makeSchema();
