import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';

export const AiInsightDeleteOneSchema: z.ZodType<Prisma.AiInsightDeleteArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AiInsightDeleteArgs>;

export const AiInsightDeleteOneZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema }).strict();