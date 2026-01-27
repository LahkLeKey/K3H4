import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';

export const AiInsightDeleteManySchema: z.ZodType<Prisma.AiInsightDeleteManyArgs> = z.object({ where: AiInsightWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightDeleteManyArgs>;

export const AiInsightDeleteManyZodSchema = z.object({ where: AiInsightWhereInputObjectSchema.optional() }).strict();