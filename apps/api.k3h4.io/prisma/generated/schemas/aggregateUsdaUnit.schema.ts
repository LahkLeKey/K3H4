import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitOrderByWithRelationInputObjectSchema as UsdaUnitOrderByWithRelationInputObjectSchema } from './objects/UsdaUnitOrderByWithRelationInput.schema';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';
import { UsdaUnitCountAggregateInputObjectSchema as UsdaUnitCountAggregateInputObjectSchema } from './objects/UsdaUnitCountAggregateInput.schema';
import { UsdaUnitMinAggregateInputObjectSchema as UsdaUnitMinAggregateInputObjectSchema } from './objects/UsdaUnitMinAggregateInput.schema';
import { UsdaUnitMaxAggregateInputObjectSchema as UsdaUnitMaxAggregateInputObjectSchema } from './objects/UsdaUnitMaxAggregateInput.schema';

export const UsdaUnitAggregateSchema: z.ZodType<Prisma.UsdaUnitAggregateArgs> = z.object({ orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional(), _min: UsdaUnitMinAggregateInputObjectSchema.optional(), _max: UsdaUnitMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitAggregateArgs>;

export const UsdaUnitAggregateZodSchema = z.object({ orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), _count: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional(), _min: UsdaUnitMinAggregateInputObjectSchema.optional(), _max: UsdaUnitMaxAggregateInputObjectSchema.optional() }).strict();