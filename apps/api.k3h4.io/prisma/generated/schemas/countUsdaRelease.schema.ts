import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaReleaseOrderByWithRelationInputObjectSchema as UsdaReleaseOrderByWithRelationInputObjectSchema } from './objects/UsdaReleaseOrderByWithRelationInput.schema';
import { UsdaReleaseWhereInputObjectSchema as UsdaReleaseWhereInputObjectSchema } from './objects/UsdaReleaseWhereInput.schema';
import { UsdaReleaseWhereUniqueInputObjectSchema as UsdaReleaseWhereUniqueInputObjectSchema } from './objects/UsdaReleaseWhereUniqueInput.schema';
import { UsdaReleaseCountAggregateInputObjectSchema as UsdaReleaseCountAggregateInputObjectSchema } from './objects/UsdaReleaseCountAggregateInput.schema';

export const UsdaReleaseCountSchema: z.ZodType<Prisma.UsdaReleaseCountArgs> = z.object({ orderBy: z.union([UsdaReleaseOrderByWithRelationInputObjectSchema, UsdaReleaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaReleaseWhereInputObjectSchema.optional(), cursor: UsdaReleaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaReleaseCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaReleaseCountArgs>;

export const UsdaReleaseCountZodSchema = z.object({ orderBy: z.union([UsdaReleaseOrderByWithRelationInputObjectSchema, UsdaReleaseOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaReleaseWhereInputObjectSchema.optional(), cursor: UsdaReleaseWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaReleaseCountAggregateInputObjectSchema ]).optional() }).strict();