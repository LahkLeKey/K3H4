import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { AgricultureSlotOrderByWithRelationInputObjectSchema as AgricultureSlotOrderByWithRelationInputObjectSchema } from './objects/AgricultureSlotOrderByWithRelationInput.schema';
import { AgricultureSlotWhereInputObjectSchema as AgricultureSlotWhereInputObjectSchema } from './objects/AgricultureSlotWhereInput.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './objects/AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotCountAggregateInputObjectSchema as AgricultureSlotCountAggregateInputObjectSchema } from './objects/AgricultureSlotCountAggregateInput.schema';

export const AgricultureSlotCountSchema: z.ZodType<Prisma.AgricultureSlotCountArgs> = z.object({ orderBy: z.union([AgricultureSlotOrderByWithRelationInputObjectSchema, AgricultureSlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureSlotWhereInputObjectSchema.optional(), cursor: AgricultureSlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgricultureSlotCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.AgricultureSlotCountArgs>;

export const AgricultureSlotCountZodSchema = z.object({ orderBy: z.union([AgricultureSlotOrderByWithRelationInputObjectSchema, AgricultureSlotOrderByWithRelationInputObjectSchema.array()]).optional(), where: AgricultureSlotWhereInputObjectSchema.optional(), cursor: AgricultureSlotWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), AgricultureSlotCountAggregateInputObjectSchema ]).optional() }).strict();