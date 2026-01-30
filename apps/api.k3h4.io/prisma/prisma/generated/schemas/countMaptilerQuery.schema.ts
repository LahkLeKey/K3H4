import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { MaptilerQueryOrderByWithRelationInputObjectSchema as MaptilerQueryOrderByWithRelationInputObjectSchema } from './objects/MaptilerQueryOrderByWithRelationInput.schema';
import { MaptilerQueryWhereInputObjectSchema as MaptilerQueryWhereInputObjectSchema } from './objects/MaptilerQueryWhereInput.schema';
import { MaptilerQueryWhereUniqueInputObjectSchema as MaptilerQueryWhereUniqueInputObjectSchema } from './objects/MaptilerQueryWhereUniqueInput.schema';
import { MaptilerQueryCountAggregateInputObjectSchema as MaptilerQueryCountAggregateInputObjectSchema } from './objects/MaptilerQueryCountAggregateInput.schema';

export const MaptilerQueryCountSchema: z.ZodType<Prisma.MaptilerQueryCountArgs> = z.object({ orderBy: z.union([MaptilerQueryOrderByWithRelationInputObjectSchema, MaptilerQueryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerQueryWhereInputObjectSchema.optional(), cursor: MaptilerQueryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MaptilerQueryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.MaptilerQueryCountArgs>;

export const MaptilerQueryCountZodSchema = z.object({ orderBy: z.union([MaptilerQueryOrderByWithRelationInputObjectSchema, MaptilerQueryOrderByWithRelationInputObjectSchema.array()]).optional(), where: MaptilerQueryWhereInputObjectSchema.optional(), cursor: MaptilerQueryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), MaptilerQueryCountAggregateInputObjectSchema ]).optional() }).strict();