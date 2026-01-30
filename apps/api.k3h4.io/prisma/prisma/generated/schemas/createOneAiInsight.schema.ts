import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightCreateInputObjectSchema as AiInsightCreateInputObjectSchema } from './objects/AiInsightCreateInput.schema';
import { AiInsightUncheckedCreateInputObjectSchema as AiInsightUncheckedCreateInputObjectSchema } from './objects/AiInsightUncheckedCreateInput.schema';

export const AiInsightCreateOneSchema: z.ZodType<Prisma.AiInsightCreateArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), data: z.union([AiInsightCreateInputObjectSchema, AiInsightUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.AiInsightCreateArgs>;

export const AiInsightCreateOneZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), data: z.union([AiInsightCreateInputObjectSchema, AiInsightUncheckedCreateInputObjectSchema]) }).strict();