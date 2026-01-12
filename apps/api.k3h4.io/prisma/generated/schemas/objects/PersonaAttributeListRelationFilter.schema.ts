import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributeWhereInputObjectSchema as PersonaAttributeWhereInputObjectSchema } from './PersonaAttributeWhereInput.schema'

const makeSchema = () => z.object({
  every: z.lazy(() => PersonaAttributeWhereInputObjectSchema).optional(),
  some: z.lazy(() => PersonaAttributeWhereInputObjectSchema).optional(),
  none: z.lazy(() => PersonaAttributeWhereInputObjectSchema).optional()
}).strict();
export const PersonaAttributeListRelationFilterObjectSchema: z.ZodType<Prisma.PersonaAttributeListRelationFilter> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeListRelationFilter>;
export const PersonaAttributeListRelationFilterObjectZodSchema = makeSchema();
