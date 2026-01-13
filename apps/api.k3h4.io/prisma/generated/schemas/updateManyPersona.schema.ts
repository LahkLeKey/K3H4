import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaUpdateManyMutationInputObjectSchema as PersonaUpdateManyMutationInputObjectSchema } from './objects/PersonaUpdateManyMutationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';

export const PersonaUpdateManySchema: z.ZodType<Prisma.PersonaUpdateManyArgs> = z.object({ data: PersonaUpdateManyMutationInputObjectSchema, where: PersonaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaUpdateManyArgs>;

export const PersonaUpdateManyZodSchema = z.object({ data: PersonaUpdateManyMutationInputObjectSchema, where: PersonaWhereInputObjectSchema.optional() }).strict();