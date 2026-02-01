import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './objects/FreightLoadWhereInput.schema';

export const FreightLoadDeleteManySchema: z.ZodType<Prisma.FreightLoadDeleteManyArgs> = z.object({ where: FreightLoadWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.FreightLoadDeleteManyArgs>;

export const FreightLoadDeleteManyZodSchema = z.object({ where: FreightLoadWhereInputObjectSchema.optional() }).strict();