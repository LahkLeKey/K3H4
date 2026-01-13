import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategoryUpdateManyMutationInputObjectSchema as AgricultureResourceCategoryUpdateManyMutationInputObjectSchema } from './objects/AgricultureResourceCategoryUpdateManyMutationInput.schema';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './objects/AgricultureResourceCategoryWhereInput.schema';

export const AgricultureResourceCategoryUpdateManySchema: z.ZodType<Prisma.AgricultureResourceCategoryUpdateManyArgs> = z.object({ data: AgricultureResourceCategoryUpdateManyMutationInputObjectSchema, where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpdateManyArgs>;

export const AgricultureResourceCategoryUpdateManyZodSchema = z.object({ data: AgricultureResourceCategoryUpdateManyMutationInputObjectSchema, where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict();