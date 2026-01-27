import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightUpdateManyMutationInputObjectSchema as AiInsightUpdateManyMutationInputObjectSchema } from './objects/AiInsightUpdateManyMutationInput.schema';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';

export const AiInsightUpdateManySchema: z.ZodType<Prisma.AiInsightUpdateManyArgs> = z.object({ data: AiInsightUpdateManyMutationInputObjectSchema, where: AiInsightWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightUpdateManyArgs>;

export const AiInsightUpdateManyZodSchema = z.object({ data: AiInsightUpdateManyMutationInputObjectSchema, where: AiInsightWhereInputObjectSchema.optional() }).strict();