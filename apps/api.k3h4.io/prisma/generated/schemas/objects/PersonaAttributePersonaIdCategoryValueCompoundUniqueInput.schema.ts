import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  personaId: z.string(),
  category: z.string(),
  value: z.string()
}).strict();
export const PersonaAttributePersonaIdCategoryValueCompoundUniqueInputObjectSchema: z.ZodType<Prisma.PersonaAttributePersonaIdCategoryValueCompoundUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributePersonaIdCategoryValueCompoundUniqueInput>;
export const PersonaAttributePersonaIdCategoryValueCompoundUniqueInputObjectZodSchema = makeSchema();
