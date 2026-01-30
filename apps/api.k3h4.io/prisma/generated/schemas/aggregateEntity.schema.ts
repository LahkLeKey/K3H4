import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityOrderByWithRelationInputObjectSchema as EntityOrderByWithRelationInputObjectSchema } from './objects/EntityOrderByWithRelationInput.schema';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';
import { EntityWhereUniqueInputObjectSchema as EntityWhereUniqueInputObjectSchema } from './objects/EntityWhereUniqueInput.schema';
import { EntityCountAggregateInputObjectSchema as EntityCountAggregateInputObjectSchema } from './objects/EntityCountAggregateInput.schema';
import { EntityMinAggregateInputObjectSchema as EntityMinAggregateInputObjectSchema } from './objects/EntityMinAggregateInput.schema';
import { EntityMaxAggregateInputObjectSchema as EntityMaxAggregateInputObjectSchema } from './objects/EntityMaxAggregateInput.schema';

export const EntityAggregateSchema: z.ZodType<Prisma.EntityAggregateArgs> = z.object({ orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional(), _min: EntityMinAggregateInputObjectSchema.optional(), _max: EntityMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityAggregateArgs>;

export const EntityAggregateZodSchema = z.object({ orderBy: z.union([EntityOrderByWithRelationInputObjectSchema, EntityOrderByWithRelationInputObjectSchema.array()]).optional(), where: EntityWhereInputObjectSchema.optional(), cursor: EntityWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional(), _min: EntityMinAggregateInputObjectSchema.optional(), _max: EntityMaxAggregateInputObjectSchema.optional() }).strict();