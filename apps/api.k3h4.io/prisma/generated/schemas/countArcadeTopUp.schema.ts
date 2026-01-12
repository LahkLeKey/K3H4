import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeTopUpOrderByWithRelationInputObjectSchema as ArcadeTopUpOrderByWithRelationInputObjectSchema } from './objects/ArcadeTopUpOrderByWithRelationInput.schema';
import { ArcadeTopUpWhereInputObjectSchema as ArcadeTopUpWhereInputObjectSchema } from './objects/ArcadeTopUpWhereInput.schema';
import { ArcadeTopUpWhereUniqueInputObjectSchema as ArcadeTopUpWhereUniqueInputObjectSchema } from './objects/ArcadeTopUpWhereUniqueInput.schema';
import { ArcadeTopUpCountAggregateInputObjectSchema as ArcadeTopUpCountAggregateInputObjectSchema } from './objects/ArcadeTopUpCountAggregateInput.schema';

export const ArcadeTopUpCountSchema: z.ZodType<Prisma.ArcadeTopUpCountArgs> = z.object({ orderBy: z.union([ArcadeTopUpOrderByWithRelationInputObjectSchema, ArcadeTopUpOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeTopUpWhereInputObjectSchema.optional(), cursor: ArcadeTopUpWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeTopUpCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeTopUpCountArgs>;

export const ArcadeTopUpCountZodSchema = z.object({ orderBy: z.union([ArcadeTopUpOrderByWithRelationInputObjectSchema, ArcadeTopUpOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeTopUpWhereInputObjectSchema.optional(), cursor: ArcadeTopUpWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeTopUpCountAggregateInputObjectSchema ]).optional() }).strict();