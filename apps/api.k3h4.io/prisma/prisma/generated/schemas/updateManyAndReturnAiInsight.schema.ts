import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightSelectObjectSchema as AiInsightSelectObjectSchema } from './objects/AiInsightSelect.schema';
import { AiInsightUpdateManyMutationInputObjectSchema as AiInsightUpdateManyMutationInputObjectSchema } from './objects/AiInsightUpdateManyMutationInput.schema';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';

export const AiInsightUpdateManyAndReturnSchema: z.ZodType<Prisma.AiInsightUpdateManyAndReturnArgs> = z.object({ select: AiInsightSelectObjectSchema.optional(), data: AiInsightUpdateManyMutationInputObjectSchema, where: AiInsightWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightUpdateManyAndReturnArgs>;

export const AiInsightUpdateManyAndReturnZodSchema = z.object({ select: AiInsightSelectObjectSchema.optional(), data: AiInsightUpdateManyMutationInputObjectSchema, where: AiInsightWhereInputObjectSchema.optional() }).strict();