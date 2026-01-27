import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightOrderByWithRelationInputObjectSchema as AiInsightOrderByWithRelationInputObjectSchema } from './objects/AiInsightOrderByWithRelationInput.schema';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';
import { AiInsightCountAggregateInputObjectSchema as AiInsightCountAggregateInputObjectSchema } from './objects/AiInsightCountAggregateInput.schema';

export const AiInsightCountSchema: z.ZodType<Prisma.AiInsightCountArgs> = z.object({ orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AiInsightCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightCountArgs>;

export const AiInsightCountZodSchema = z.object({ orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AiInsightCountAggregateInputObjectSchema ]).optional() }).strict();