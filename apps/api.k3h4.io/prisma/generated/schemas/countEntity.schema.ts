import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityOrderByWithRelationInputObjectSchema as EntityOrderByWithRelationInputObjectSchema } from './objects/EntityOrderByWithRelationInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';
import { EntityCountAggregateInputObjectSchema as EntityCountAggregateInputObjectSchema } from './objects/EntityCountAggregateInput.schema';

export const EntityCountSchema: z.ZodType<Prisma.EntityCountArgs> = z.object({ orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.EntityCountArgs>;

export const EntityCountZodSchema = z.object({ orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional() }).strict();