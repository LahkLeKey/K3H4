import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightUpdateInputObjectSchema as AiInsightUpdateInputObjectSchema } from './objects/AiInsightUpdateInput.schema';
import { AiInsightUncheckedUpdateInputObjectSchema as AiInsightUncheckedUpdateInputObjectSchema } from './objects/AiInsightUncheckedUpdateInput.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';

export const AiInsightUpdateOneSchema: z.ZodType<Prisma.AiInsightUpdateArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), data: z.union([AiInsightUpdateInputObjectSchema, AiInsightUncheckedUpdateInputObjectSchema]), where: AiInsightWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AiInsightUpdateArgs>;

export const AiInsightUpdateOneZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), data: z.union([AiInsightUpdateInputObjectSchema, AiInsightUncheckedUpdateInputObjectSchema]), where: AiInsightWhereUniqueInputObjectSchema }).strict();