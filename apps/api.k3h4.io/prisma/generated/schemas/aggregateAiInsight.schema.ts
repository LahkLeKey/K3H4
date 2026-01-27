import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AiInsightOrderByWithRelationInputObjectSchema as AiInsightOrderByWithRelationInputObjectSchema } from './objects/AiInsightOrderByWithRelationInput.schema';
import { AiInsightWhereInputObjectSchema as AiInsightWhereInputObjectSchema } from './objects/AiInsightWhereInput.schema';
import { AiInsightWhereUniqueInputObjectSchema as AiInsightWhereUniqueInputObjectSchema } from './objects/AiInsightWhereUniqueInput.schema';
import { AiInsightCountAggregateInputObjectSchema as AiInsightCountAggregateInputObjectSchema } from './objects/AiInsightCountAggregateInput.schema';
import { AiInsightMinAggregateInputObjectSchema as AiInsightMinAggregateInputObjectSchema } from './objects/AiInsightMinAggregateInput.schema';
import { AiInsightMaxAggregateInputObjectSchema as AiInsightMaxAggregateInputObjectSchema } from './objects/AiInsightMaxAggregateInput.schema';

export const AiInsightAggregateSchema: z.ZodType<Prisma.AiInsightAggregateArgs> = z.object({ orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AiInsightCountAggregateInputObjectSchema ]).optional(), _min: AiInsightMinAggregateInputObjectSchema.optional(), _max: AiInsightMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.AiInsightAggregateArgs>;

export const AiInsightAggregateZodSchema = z.object({ orderBy: z.union([AiInsightOrderByWithRelationInputObjectSchema, AiInsightOrderByWithRelationInputObjectSchema.array()]).optional(), where: AiInsightWhereInputObjectSchema.optional(), cursor: AiInsightWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), AiInsightCountAggregateInputObjectSchema ]).optional(), _min: AiInsightMinAggregateInputObjectSchema.optional(), _max: AiInsightMaxAggregateInputObjectSchema.optional() }).strict();