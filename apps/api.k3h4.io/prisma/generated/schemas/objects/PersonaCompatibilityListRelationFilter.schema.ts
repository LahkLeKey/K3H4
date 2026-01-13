import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './PersonaCompatibilityWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).optional(),
  some: z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).optional(),
  none: z.lazy(() => PersonaCompatibilityWhereInputObjectSchema).optional()
}).strict();
export const PersonaCompatibilityListRelationFilterObjectSchema: z.ZodType<Prisma.PersonaCompatibilityListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PersonaCompatibilityListRelationFilter>;
export const PersonaCompatibilityListRelationFilterObjectZodSchema = makeSchema();
