import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilityUpdateManyMutationInputObjectSchema as PersonaCompatibilityUpdateManyMutationInputObjectSchema } from './objects/PersonaCompatibilityUpdateManyMutationInput.schema';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './objects/PersonaCompatibilityWhereInput.schema';

export const PersonaCompatibilityUpdateManySchema: z.ZodType<Prisma.PersonaCompatibilityUpdateManyArgs> = z.object({ data: PersonaCompatibilityUpdateManyMutationInputObjectSchema, where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateManyArgs>;

export const PersonaCompatibilityUpdateManyZodSchema = z.object({ data: PersonaCompatibilityUpdateManyMutationInputObjectSchema, where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict();