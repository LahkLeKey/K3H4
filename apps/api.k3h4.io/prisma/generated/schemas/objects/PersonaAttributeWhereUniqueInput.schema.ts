import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaAttributePersonaIdCategoryValueCompoundUniqueInputObjectSchema as PersonaAttributePersonaIdCategoryValueCompoundUniqueInputObjectSchema } from './PersonaAttributePersonaIdCategoryValueCompoundUniqueInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  personaId_category_value: z.lazy(() => PersonaAttributePersonaIdCategoryValueCompoundUniqueInputObjectSchema).optional()
}).strict();
export const PersonaAttributeWhereUniqueInputObjectSchema: z.ZodType<Prisma.PersonaAttributeWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeWhereUniqueInput>;
export const PersonaAttributeWhereUniqueInputObjectZodSchema = makeSchema();
