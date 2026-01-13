import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './objects/AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryIncludeObjectSchema as AgricultureResourceCategoryIncludeObjectSchema } from './objects/AgricultureResourceCategoryInclude.schema';
import { AgricultureResourceCategoryUpdateInputObjectSchema as AgricultureResourceCategoryUpdateInputObjectSchema } from './objects/AgricultureResourceCategoryUpdateInput.schema';
import { AgricultureResourceCategoryUncheckedUpdateInputObjectSchema as AgricultureResourceCategoryUncheckedUpdateInputObjectSchema } from './objects/AgricultureResourceCategoryUncheckedUpdateInput.schema';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './objects/AgricultureResourceCategoryWhereUniqueInput.schema';

export const AgricultureResourceCategoryUpdateOneSchema: z.ZodType<Prisma.AgricultureResourceCategoryUpdateArgs> = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCategoryUpdateInputObjectSchema, AgricultureResourceCategoryUncheckedUpdateInputObjectSchema]), where: AgricultureResourceCategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpdateArgs>;

export const AgricultureResourceCategoryUpdateOneZodSchema = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), data: z.union([AgricultureResourceCategoryUpdateInputObjectSchema, AgricultureResourceCategoryUncheckedUpdateInputObjectSchema]), where: AgricultureResourceCategoryWhereUniqueInputObjectSchema }).strict();