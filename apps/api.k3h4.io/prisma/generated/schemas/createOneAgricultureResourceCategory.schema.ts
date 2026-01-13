import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './objects/AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryIncludeObjectSchema as AgricultureResourceCategoryIncludeObjectSchema } from './objects/AgricultureResourceCategoryInclude.schema';
import { AgricultureResourceCategoryCreateInputObjectSchema as AgricultureResourceCategoryCreateInputObjectSchema } from './objects/AgricultureResourceCategoryCreateInput.schema';
import { AgricultureResourceCategoryUncheckedCreateInputObjectSchema as AgricultureResourceCategoryUncheckedCreateInputObjectSchema } from './objects/AgricultureResourceCategoryUncheckedCreateInput.schema';

export const AgricultureResourceCategoryCreateOneSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateArgs> = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCategoryCreateInputObjectSchema, AgricultureResourceCategoryUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateArgs>;

export const AgricultureResourceCategoryCreateOneZodSchema = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCategoryCreateInputObjectSchema, AgricultureResourceCategoryUncheckedCreateInputObjectSchema]) }).strict();