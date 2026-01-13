import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PersonaCompatibilitySelectObjectSchema as PersonaCompatibilitySelectObjectSchema } from './objects/PersonaCompatibilitySelect.schema';
import { PersonaCompatibilityUpdateManyMutationInputObjectSchema as PersonaCompatibilityUpdateManyMutationInputObjectSchema } from './objects/PersonaCompatibilityUpdateManyMutationInput.schema';
import { PersonaCompatibilityWhereInputObjectSchema as PersonaCompatibilityWhereInputObjectSchema } from './objects/PersonaCompatibilityWhereInput.schema';

export const PersonaCompatibilityUpdateManyAndReturnSchema: z.ZodType<Prisma.PersonaCompatibilityUpdateManyAndReturnArgs> = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), data: PersonaCompatibilityUpdateManyMutationInputObjectSchema, where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.PersonaCompatibilityUpdateManyAndReturnArgs>;

export const PersonaCompatibilityUpdateManyAndReturnZodSchema = z.object({ select: PersonaCompatibilitySelectObjectSchema.optional(), data: PersonaCompatibilityUpdateManyMutationInputObjectSchema, where: PersonaCompatibilityWhereInputObjectSchema.optional() }).strict();