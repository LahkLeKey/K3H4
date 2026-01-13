import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './objects/AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryIncludeObjectSchema as AgricultureResourceCategoryIncludeObjectSchema } from './objects/AgricultureResourceCategoryInclude.schema';
import { AgricultureResourceCategoryWhereUniqueInputObjectSchema as AgricultureResourceCategoryWhereUniqueInputObjectSchema } from './objects/AgricultureResourceCategoryWhereUniqueInput.schema';

export const AgricultureResourceCategoryFindUniqueSchema: z.ZodType<Prisma.AgricultureResourceCategoryFindUniqueArgs> = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), where: AgricultureResourceCategoryWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryFindUniqueArgs>;

export const AgricultureResourceCategoryFindUniqueZodSchema = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), include: AgricultureResourceCategoryIncludeObjectSchema.optional(), where: AgricultureResourceCategoryWhereUniqueInputObjectSchema }).strict();