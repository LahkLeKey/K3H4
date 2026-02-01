import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';

export const FreightLoadFindUniqueSchema: z.ZodType<Prisma.FreightLoadFindUniqueArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FreightLoadFindUniqueArgs>;

export const FreightLoadFindUniqueZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema }).strict();