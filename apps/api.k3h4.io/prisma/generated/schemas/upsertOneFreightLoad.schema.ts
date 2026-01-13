import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './objects/FreightLoadWhereUniqueInput.schema';
import { FreightLoadCreateInputObjectSchema as FreightLoadCreateInputObjectSchema } from './objects/FreightLoadCreateInput.schema';
import { FreightLoadUncheckedCreateInputObjectSchema as FreightLoadUncheckedCreateInputObjectSchema } from './objects/FreightLoadUncheckedCreateInput.schema';
import { FreightLoadUpdateInputObjectSchema as FreightLoadUpdateInputObjectSchema } from './objects/FreightLoadUpdateInput.schema';
import { FreightLoadUncheckedUpdateInputObjectSchema as FreightLoadUncheckedUpdateInputObjectSchema } from './objects/FreightLoadUncheckedUpdateInput.schema';

export const FreightLoadUpsertOneSchema: z.ZodType<Prisma.FreightLoadUpsertArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema, create: z.union([ FreightLoadCreateInputObjectSchema, FreightLoadUncheckedCreateInputObjectSchema ]), update: z.union([ FreightLoadUpdateInputObjectSchema, FreightLoadUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.FreightLoadUpsertArgs>;

export const FreightLoadUpsertOneZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), where: FreightLoadWhereUniqueInputObjectSchema, create: z.union([ FreightLoadCreateInputObjectSchema, FreightLoadUncheckedCreateInputObjectSchema ]), update: z.union([ FreightLoadUpdateInputObjectSchema, FreightLoadUncheckedUpdateInputObjectSchema ]) }).strict();