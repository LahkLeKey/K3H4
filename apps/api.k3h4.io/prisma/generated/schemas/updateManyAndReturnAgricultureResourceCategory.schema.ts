import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceCategorySelectObjectSchema as AgricultureResourceCategorySelectObjectSchema } from './objects/AgricultureResourceCategorySelect.schema';
import { AgricultureResourceCategoryUpdateManyMutationInputObjectSchema as AgricultureResourceCategoryUpdateManyMutationInputObjectSchema } from './objects/AgricultureResourceCategoryUpdateManyMutationInput.schema';
import { AgricultureResourceCategoryWhereInputObjectSchema as AgricultureResourceCategoryWhereInputObjectSchema } from './objects/AgricultureResourceCategoryWhereInput.schema';

export const AgricultureResourceCategoryUpdateManyAndReturnSchema: z.ZodType<Prisma.AgricultureResourceCategoryUpdateManyAndReturnArgs> = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), data: AgricultureResourceCategoryUpdateManyMutationInputObjectSchema, where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceCategoryUpdateManyAndReturnArgs>;

export const AgricultureResourceCategoryUpdateManyAndReturnZodSchema = z.object({ select: AgricultureResourceCategorySelectObjectSchema.optional(), data: AgricultureResourceCategoryUpdateManyMutationInputObjectSchema, where: AgricultureResourceCategoryWhereInputObjectSchema.optional() }).strict();