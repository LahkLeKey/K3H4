import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightIncludeObjectSchema as AiInsightIncludeObjectSchema } from './objects/AiInsightInclude.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';

export const AiInsightFindUniqueOrThrowSchema: z.ZodType<Prisma.AiInsightFindUniqueOrThrowArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.AiInsightFindUniqueOrThrowArgs>;

export const AiInsightFindUniqueOrThrowZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), include: AiInsightIncludeObjectSchema.optional(), where: AiInsightWhereUniqueInputObjectSchema }).strict();