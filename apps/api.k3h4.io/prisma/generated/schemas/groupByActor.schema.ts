import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { ActorWhereInputObjectSchema as ActorWhereInputObjectSchema } from './objects/ActorWhereInput.schema';
import { ActorOrderByWithAggregationInputObjectSchema as ActorOrderByWithAggregationInputObjectSchema } from './objects/ActorOrderByWithAggregationInput.schema';
import { ActorScalarWhereWithAggregatesInputObjectSchema as ActorScalarWhereWithAggregatesInputObjectSchema } from './objects/ActorScalarWhereWithAggregatesInput.schema';
import { ActorScalarFieldEnumSchema } from './enums/ActorScalarFieldEnum.schema';
import { ActorCountAggregateInputObjectSchema as ActorCountAggregateInputObjectSchema } from './objects/ActorCountAggregateInput.schema';
import { ActorMinAggregateInputObjectSchema as ActorMinAggregateInputObjectSchema } from './objects/ActorMinAggregateInput.schema';
import { ActorMaxAggregateInputObjectSchema as ActorMaxAggregateInputObjectSchema } from './objects/ActorMaxAggregateInput.schema';

export const ActorGroupBySchema: z.ZodType<Prisma.ActorGroupByArgs> = z.object({ where: ActorWhereInputObjectSchema.optional(), orderBy: z.union([ActorOrderByWithAggregationInputObjectSchema, ActorOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ActorScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ActorScalarFieldEnumSchema), _count: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional(), _min: ActorMinAggregateInputObjectSchema.optional(), _max: ActorMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.ActorGroupByArgs>;

export const ActorGroupByZodSchema = z.object({ where: ActorWhereInputObjectSchema.optional(), orderBy: z.union([ActorOrderByWithAggregationInputObjectSchema, ActorOrderByWithAggregationInputObjectSchema.array()]).optional(), having: ActorScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(ActorScalarFieldEnumSchema), _count: z.union([ z.literal(true), ActorCountAggregateInputObjectSchema ]).optional(), _min: ActorMinAggregateInputObjectSchema.optional(), _max: ActorMaxAggregateInputObjectSchema.optional() }).strict();