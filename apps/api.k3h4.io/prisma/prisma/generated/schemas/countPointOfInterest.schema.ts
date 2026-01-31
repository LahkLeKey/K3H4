import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { PointOfInterestOrderByWithRelationInputObjectSchema as PointOfInterestOrderByWithRelationInputObjectSchema } from './objects/PointOfInterestOrderByWithRelationInput.schema';
import { PointOfInterestWhereInputObjectSchema as PointOfInterestWhereInputObjectSchema } from './objects/PointOfInterestWhereInput.schema';
import { PointOfInterestWhereUniqueInputObjectSchema as PointOfInterestWhereUniqueInputObjectSchema } from './objects/PointOfInterestWhereUniqueInput.schema';
import { PointOfInterestCountAggregateInputObjectSchema as PointOfInterestCountAggregateInputObjectSchema } from './objects/PointOfInterestCountAggregateInput.schema';

export const PointOfInterestCountSchema: z.ZodType<Prisma.PointOfInterestCountArgs> = z.object({ orderBy: z.union([PointOfInterestOrderByWithRelationInputObjectSchema, PointOfInterestOrderByWithRelationInputObjectSchema.array()]).optional(), where: PointOfInterestWhereInputObjectSchema.optional(), cursor: PointOfInterestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PointOfInterestCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.PointOfInterestCountArgs>;

export const PointOfInterestCountZodSchema = z.object({ orderBy: z.union([PointOfInterestOrderByWithRelationInputObjectSchema, PointOfInterestOrderByWithRelationInputObjectSchema.array()]).optional(), where: PointOfInterestWhereInputObjectSchema.optional(), cursor: PointOfInterestWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), PointOfInterestCountAggregateInputObjectSchema ]).optional() }).strict();