import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';

export const FreightLoadFindUniqueOrThrowSchema: z.ZodType<Prisma.FreightLoadFindUniqueOrThrowArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.FreightLoadFindUniqueOrThrowArgs>;

export const FreightLoadFindUniqueOrThrowZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema }).strict();