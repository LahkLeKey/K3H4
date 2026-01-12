import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { PersonaCreateNestedOneWithoutAttributesInputObjectSchema as PersonaCreateNestedOneWithoutAttributesInputObjectSchema } from './PersonaCreateNestedOneWithoutAttributesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  persona: z.lazy(() => PersonaCreateNestedOneWithoutAttributesInputObjectSchema)
}).strict();
export const PersonaAttributeCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateWithoutUserInput>;
export const PersonaAttributeCreateWithoutUserInputObjectZodSchema = makeSchema();
