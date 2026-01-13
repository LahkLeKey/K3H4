import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { FreightLoadSelectObjectSchema as FreightLoadSelectObjectSchema } from './objects/FreightLoadSelect.schema';
import { FreightLoadIncludeObjectSchema as FreightLoadIncludeObjectSchema } from './objects/FreightLoadInclude.schema';
import { FreightLoadCreateInputObjectSchema as FreightLoadCreateInputObjectSchema } from './objects/FreightLoadCreateInput.schema';
import { FreightLoadUncheckedCreateInputObjectSchema as FreightLoadUncheckedCreateInputObjectSchema } from './objects/FreightLoadUncheckedCreateInput.schema';

export const FreightLoadCreateOneSchema: z.ZodType<Prisma.FreightLoadCreateArgs> = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), data: z.union([FreightLoadCreateInputObjectSchema, FreightLoadUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.FreightLoadCreateArgs>;

export const FreightLoadCreateOneZodSchema = z.object({ select: FreightLoadSelectObjectSchema.optional(), include: FreightLoadIncludeObjectSchema.optional(), data: z.union([FreightLoadCreateInputObjectSchema, FreightLoadUncheckedCreateInputObjectSchema]) }).strict();