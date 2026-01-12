import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureResourceSelectObjectSchema as AgricultureResourceSelectObjectSchema } from './objects/AgricultureResourceSelect.schema';
import { AgricultureResourceIncludeObjectSchema as AgricultureResourceIncludeObjectSchema } from './objects/AgricultureResourceInclude.schema';
import { AgricultureResourceUpdateInputObjectSchema as AgricultureResourceUpdateInputObjectSchema } from './objects/AgricultureResourceUpdateInput.schema';
import { AgricultureResourceUncheckedUpdateInputObjectSchema as AgricultureResourceUncheckedUpdateInputObjectSchema } from './objects/AgricultureResourceUncheckedUpdateInput.schema';
import { AgricultureResourceWhereUniqueInputObjectSchema as AgricultureResourceWhereUniqueInputObjectSchema } from './objects/AgricultureResourceWhereUniqueInput.schema';

export const AgricultureResourceUpdateOneSchema: z.ZodType<Prisma.AgricultureResourceUpdateArgs> = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), data: z.union([AgricultureResourceUpdateInputObjectSchema, AgricultureResourceUncheckedUpdateInputObjectSchema]), where: AgricultureResourceWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AgricultureResourceUpdateArgs>;

export const AgricultureResourceUpdateOneZodSchema = z.object({ select: AgricultureResourceSelectObjectSchema.optional(), include: AgricultureResourceIncludeObjectSchema.optional(), data: z.union([AgricultureResourceUpdateInputObjectSchema, AgricultureResourceUncheckedUpdateInputObjectSchema]), where: AgricultureResourceWhereUniqueInputObjectSchema }).strict();