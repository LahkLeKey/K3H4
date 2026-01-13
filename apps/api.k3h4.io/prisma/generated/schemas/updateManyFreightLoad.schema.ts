import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadUpdateManyMutationInputObjectSchema as FreightLoadUpdateManyMutationInputObjectSchema } from './objects/FreightLoadUpdateManyMutationInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './objects/FreightLoadWhereInput.schema';

export const FreightLoadUpdateManySchema: z.ZodType<Prisma.FreightLoadUpdateManyArgs> = z.object({ data: FreightLoadUpdateManyMutationInputObjectSchema, where: FreightLoadWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadUpdateManyArgs>;

export const FreightLoadUpdateManyZodSchema = z.object({ data: FreightLoadUpdateManyMutationInputObjectSchema, where: FreightLoadWhereInputObjectSchema.optional() }).strict();