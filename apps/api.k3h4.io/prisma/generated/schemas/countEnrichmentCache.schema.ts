import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EnrichmentCacheOrderByWithRelationInputObjectSchema as EnrichmentCacheOrderByWithRelationInputObjectSchema } from './objects/EnrichmentCacheOrderByWithRelationInput.schema';
import { EnrichmentCacheWhereInputObjectSchema as EnrichmentCacheWhereInputObjectSchema } from './objects/EnrichmentCacheWhereInput.schema';
import { EnrichmentCacheWhereUniqueInputObjectSchema as EnrichmentCacheWhereUniqueInputObjectSchema } from './objects/EnrichmentCacheWhereUniqueInput.schema';
import { EnrichmentCacheCountAggregateInputObjectSchema as EnrichmentCacheCountAggregateInputObjectSchema } from './objects/EnrichmentCacheCountAggregateInput.schema';

export const EnrichmentCacheCountSchema: z.ZodType<Prisma.EnrichmentCacheCountArgs> = z.object({ orderBy: z.union([EnrichmentCacheOrderByWithRelationInputObjectSchema, EnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EnrichmentCacheWhereInputObjectSchema.optional(), cursor: EnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EnrichmentCacheCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.EnrichmentCacheCountArgs>;

export const EnrichmentCacheCountZodSchema = z.object({ orderBy: z.union([EnrichmentCacheOrderByWithRelationInputObjectSchema, EnrichmentCacheOrderByWithRelationInputObjectSchema.array()]).optional(), where: EnrichmentCacheWhereInputObjectSchema.optional(), cursor: EnrichmentCacheWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EnrichmentCacheCountAggregateInputObjectSchema ]).optional() }).strict();