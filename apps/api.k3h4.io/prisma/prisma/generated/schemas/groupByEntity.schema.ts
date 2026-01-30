import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { EntityWhereInputObjectSchema as EntityWhereInputObjectSchema } from './objects/EntityWhereInput.schema';
import { EntityOrderByWithAggregationInputObjectSchema as EntityOrderByWithAggregationInputObjectSchema } from './objects/EntityOrderByWithAggregationInput.schema';
import { EntityScalarWhereWithAggregatesInputObjectSchema as EntityScalarWhereWithAggregatesInputObjectSchema } from './objects/EntityScalarWhereWithAggregatesInput.schema';
import { EntityScalarFieldEnumSchema } from './enums/EntityScalarFieldEnum.schema';
import { EntityCountAggregateInputObjectSchema as EntityCountAggregateInputObjectSchema } from './objects/EntityCountAggregateInput.schema';
import { EntityMinAggregateInputObjectSchema as EntityMinAggregateInputObjectSchema } from './objects/EntityMinAggregateInput.schema';
import { EntityMaxAggregateInputObjectSchema as EntityMaxAggregateInputObjectSchema } from './objects/EntityMaxAggregateInput.schema';

export const EntityGroupBySchema: z.ZodType<Prisma.EntityGroupByArgs> = z.object({ where: EntityWhereInputObjectSchema.optional(), orderBy: z.union([EntityOrderByWithAggregationInputObjectSchema, EntityOrderByWithAggregationInputObjectSchema.array()]).optional(), having: EntityScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(EntityScalarFieldEnumSchema), _count: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional(), _min: EntityMinAggregateInputObjectSchema.optional(), _max: EntityMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.EntityGroupByArgs>;

export const EntityGroupByZodSchema = z.object({ where: EntityWhereInputObjectSchema.optional(), orderBy: z.union([EntityOrderByWithAggregationInputObjectSchema, EntityOrderByWithAggregationInputObjectSchema.array()]).optional(), having: EntityScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(EntityScalarFieldEnumSchema), _count: z.union([ z.literal(true), EntityCountAggregateInputObjectSchema ]).optional(), _min: EntityMinAggregateInputObjectSchema.optional(), _max: EntityMaxAggregateInputObjectSchema.optional() }).strict();