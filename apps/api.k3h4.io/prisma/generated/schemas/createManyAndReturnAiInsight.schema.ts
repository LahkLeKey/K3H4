import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightCreateManyInputObjectSchema as AiInsightCreateManyInputObjectSchema } from './objects/AiInsightCreateManyInput.schema';

export const AiInsightCreateManyAndReturnSchema: z.ZodType<Prisma.AiInsightCreateManyAndReturnArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), data: z.union([ AiInsightCreateManyInputObjectSchema, z.array(AiInsightCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightCreateManyAndReturnArgs>;

export const AiInsightCreateManyAndReturnZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), data: z.union([ AiInsightCreateManyInputObjectSchema, z.array(AiInsightCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();