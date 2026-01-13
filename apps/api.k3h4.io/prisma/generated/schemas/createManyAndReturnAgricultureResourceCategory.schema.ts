import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './objects/AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryCreateManyInputObjectSchema as AgricultureResourceCategoryCreateManyInputObjectSchema } from './objects/AgricultureResourceCategoryCreateManyInput.schema';

export const AgricultureResourceCategoryCreateManyAndReturnSchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateManyAndReturnArgs> = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), data: z.union([ AgricultureResourceCategoryCreateManyInputObjectSchema, z.array(AgricultureResourceCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateManyAndReturnArgs>;

export const AgricultureResourceCategoryCreateManyAndReturnZodSchema = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), data: z.union([ AgricultureResourceCategoryCreateManyInputObjectSchema, z.array(AgricultureResourceCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();