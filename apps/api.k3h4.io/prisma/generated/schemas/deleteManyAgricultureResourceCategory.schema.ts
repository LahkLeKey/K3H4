import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './objects/AgricultureResourceCategoryWhereInput.schema';

export const AgricultureResourceCategoryDeleteManySchema: z.ZodType<Prisma.AgricultureResourceCategoryDeleteManyArgs> = z.object({ where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryDeleteManyArgs>;

export const AgricultureResourceCategoryDeleteManyZodSchema = z.object({ where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict();