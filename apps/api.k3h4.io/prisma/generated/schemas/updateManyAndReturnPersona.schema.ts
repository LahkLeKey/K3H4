import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaSelectObjectSchema as PersonaSelectObjectSchema } from './objects/PersonaSelect.schema';
import { PersonaUpdateManyMutationInputObjectSchema as PersonaUpdateManyMutationInputObjectSchema } from './objects/PersonaUpdateManyMutationInput.schema';
import { PersonaWhereInputObjectSchema as PersonaWhereInputObjectSchema } from './objects/PersonaWhereInput.schema';

export const PersonaUpdateManyAndReturnSchema: z.ZodType<Prisma.PersonaUpdateManyAndReturnArgs> = z.object({ select: PersonaSelectObjectSchema.optional(), data: PersonaUpdateManyMutationInputObjectSchema, where: PersonaWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaUpdateManyAndReturnArgs>;

export const PersonaUpdateManyAndReturnZodSchema = z.object({ select: PersonaSelectObjectSchema.optional(), data: PersonaUpdateManyMutationInputObjectSchema, where: PersonaWhereInputObjectSchema.optional() }).strict();