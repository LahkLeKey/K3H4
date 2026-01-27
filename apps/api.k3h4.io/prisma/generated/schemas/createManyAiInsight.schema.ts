import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightCreateManyInputObjectSchema as AiInsightCreateManyInputObjectSchema } from './objects/AiInsightCreateManyInput.schema';

export const AiInsightCreateManySchema: z.ZodType<Prisma.AiInsightCreateManyArgs> = z.object({ data: z.union([ AiInsightCreateManyInputObjectSchema, z.array(AiInsightCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightCreateManyArgs>;

export const AiInsightCreateManyZodSchema = z.object({ data: z.union([ AiInsightCreateManyInputObjectSchema, z.array(AiInsightCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();