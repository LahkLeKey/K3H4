import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutPersonaAttributesInputObjectSchema as UserCreateNestedOneWithoutPersonaAttributesInputObjectSchema } from './UserCreateNestedOneWithoutPersonaAttributesInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  category: z.string(),
  value: z.string(),
  weight: z.number().int().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutPersonaAttributesInputObjectSchema)
}).strict();
export const PersonaAttributeCreateWithoutPersonaInputObjectSchema: z.ZodType<Prisma.PersonaAttributeCreateWithoutPersonaInput> = makeSchema() as unknown as z.ZodType<Prisma.PersonaAttributeCreateWithoutPersonaInput>;
export const PersonaAttributeCreateWithoutPersonaInputObjectZodSchema = makeSchema();
