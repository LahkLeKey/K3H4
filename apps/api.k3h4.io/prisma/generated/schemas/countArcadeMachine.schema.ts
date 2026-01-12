import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ArcadeMachineOrderByWithRelationInputObjectSchema as ArcadeMachineOrderByWithRelationInputObjectSchema } from './objects/ArcadeMachineOrderByWithRelationInput.schema';
import { ArcadeMachineWhereInputObjectSchema as ArcadeMachineWhereInputObjectSchema } from './objects/ArcadeMachineWhereInput.schema';
import { ArcadeMachineWhereUniqueInputObjectSchema as ArcadeMachineWhereUniqueInputObjectSchema } from './objects/ArcadeMachineWhereUniqueInput.schema';
import { ArcadeMachineCountAggregateInputObjectSchema as ArcadeMachineCountAggregateInputObjectSchema } from './objects/ArcadeMachineCountAggregateInput.schema';

export const ArcadeMachineCountSchema: z.ZodType<Prisma.ArcadeMachineCountArgs> = z.object({ orderBy: z.union([ArcadeMachineOrderByWithRelationInputObjectSchema, ArcadeMachineOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeMachineWhereInputObjectSchema.optional(), cursor: ArcadeMachineWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeMachineCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.ArcadeMachineCountArgs>;

export const ArcadeMachineCountZodSchema = z.object({ orderBy: z.union([ArcadeMachineOrderByWithRelationInputObjectSchema, ArcadeMachineOrderByWithRelationInputObjectSchema.array()]).optional(), where: ArcadeMachineWhereInputObjectSchema.optional(), cursor: ArcadeMachineWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), ArcadeMachineCountAggregateInputObjectSchema ]).optional() }).strict();