import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitOrderByWithRelationInputObjectSchema as UsdaUnitOrderByWithRelationInputObjectSchema } from './objects/UsdaUnitOrderByWithRelationInput.schema';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';
import { UsdaUnitWhereUniqueInputObjectSchema as UsdaUnitWhereUniqueInputObjectSchema } from './objects/UsdaUnitWhereUniqueInput.schema';
import { UsdaUnitCountAggregateInputObjectSchema as UsdaUnitCountAggregateInputObjectSchema } from './objects/UsdaUnitCountAggregateInput.schema';

export const UsdaUnitCountSchema: z.ZodType<Prisma.UsdaUnitCountArgs> = z.object({ orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitCountArgs>;

export const UsdaUnitCountZodSchema = z.object({ orderBy: z.union([UsdaUnitOrderByWithRelationInputObjectSchema, UsdaUnitOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaUnitWhereInputObjectSchema.optional(), cursor: UsdaUnitWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional() }).strict();