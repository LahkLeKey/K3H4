import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OllamaOperationOrderByWithRelationInputObjectSchema as OllamaOperationOrderByWithRelationInputObjectSchema } from './objects/OllamaOperationOrderByWithRelationInput.schema';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './objects/OllamaOperationWhereInput.schema';
import { OllamaOperationWhereUniqueInputObjectSchema as OllamaOperationWhereUniqueInputObjectSchema } from './objects/OllamaOperationWhereUniqueInput.schema';
import { OllamaOperationCountAggregateInputObjectSchema as OllamaOperationCountAggregateInputObjectSchema } from './objects/OllamaOperationCountAggregateInput.schema';

export const OllamaOperationCountSchema: z.ZodType<Prisma.OllamaOperationCountArgs> = z.object({ orderBy: z.union([OllamaOperationOrderByWithRelationInputObjectSchema, OllamaOperationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OllamaOperationWhereInputObjectSchema.optional(), cursor: OllamaOperationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OllamaOperationCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.OllamaOperationCountArgs>;

export const OllamaOperationCountZodSchema = z.object({ orderBy: z.union([OllamaOperationOrderByWithRelationInputObjectSchema, OllamaOperationOrderByWithRelationInputObjectSchema.array()]).optional(), where: OllamaOperationWhereInputObjectSchema.optional(), cursor: OllamaOperationWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), OllamaOperationCountAggregateInputObjectSchema ]).optional() }).strict();