import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategoryCreateManyInputObjectSchema as AgricultureResourceCategoryCreateManyInputObjectSchema } from './objects/AgricultureResourceCategoryCreateManyInput.schema';

export const AgricultureResourceCategoryCreateManySchema: z.ZodType<Prisma.AgricultureResourceCategoryCreateManyArgs> = z.object({ data: z.union([ AgricultureResourceCategoryCreateManyInputObjectSchema, z.array(AgricultureResourceCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryCreateManyArgs>;

export const AgricultureResourceCategoryCreateManyZodSchema = z.object({ data: z.union([ AgricultureResourceCategoryCreateManyInputObjectSchema, z.array(AgricultureResourceCategoryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();