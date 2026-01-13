import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeSessionOrderByWithRelationInputObjectSchema as ArcadeSessionOrderByWithRelationInputObjectSchema } from './objects/ArcadeSessionOrderByWithRelationInput.schema';
import { ArcadeSessionWhereInputObjectSchema as ArcadeSessionWhereInputObjectSchema } from './objects/ArcadeSessionWhereInput.schema';
import { ArcadeSessionWhereUniqueInputObjectSchema as ArcadeSessionWhereUniqueInputObjectSchema } from './objects/ArcadeSessionWhereUniqueInput.schema';
import { ArcadeSessionCountAggregateInputObjectSchema as ArcadeSessionCountAggregateInputObjectSchema } from './objects/ArcadeSessionCountAggregateInput.schema';

export const ArcadeSessionCountSchema: z.ZodType<Prisma.ArcadeSessionCountArgs> = z.object({ orderBy: z.union([ArcadeSessionOrderByWithRelationInputObjectSchema, ArcadeSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeSessionWhereInputObjectSchema.optional(), cursor: ArcadeSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeSessionCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeSessionCountArgs>;

export const ArcadeSessionCountZodSchema = z.object({ orderBy: z.union([ArcadeSessionOrderByWithRelationInputObjectSchema, ArcadeSessionOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeSessionWhereInputObjectSchema.optional(), cursor: ArcadeSessionWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeSessionCountAggregateInputObjectSchema ]).optional() }).strict();