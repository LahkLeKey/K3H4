import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadUpdateInputObjectSchema as FreightLoadUpdateInputObjectSchema } from './objects/FreightLoadUpdateInput.schema';
import { FreightLoadUncheckedUpdateInputObjectSchema as FreightLoadUncheckedUpdateInputObjectSchema } from './objects/FreightLoadUncheckedUpdateInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';

export const FreightLoadUpdateOneSchema: z.ZodType<Prisma.FreightLoadUpdateArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), data: z.union([FreightLoadUpdateInputObjectSchema, FreightLoadUncheckedUpdateInputObjectSchema]), where: FreightLoadWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FreightLoadUpdateArgs>;

export const FreightLoadUpdateOneZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), data: z.union([FreightLoadUpdateInputObjectSchema, FreightLoadUncheckedUpdateInputObjectSchema]), where: FreightLoadWhereUniqueInputObjectSchema }).strict();