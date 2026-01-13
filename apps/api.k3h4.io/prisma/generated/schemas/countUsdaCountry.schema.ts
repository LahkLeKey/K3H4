import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaCountryOrderByWithRelationInputObjectSchema as UsdaCountryOrderByWithRelationInputObjectSchema } from './objects/UsdaCountryOrderByWithRelationInput.schema';
import { UsdaCountryWhereInputObjectSchema as UsdaCountryWhereInputObjectSchema } from './objects/UsdaCountryWhereInput.schema';
import { UsdaCountryWhereUniqueInputObjectSchema as UsdaCountryWhereUniqueInputObjectSchema } from './objects/UsdaCountryWhereUniqueInput.schema';
import { UsdaCountryCountAggregateInputObjectSchema as UsdaCountryCountAggregateInputObjectSchema } from './objects/UsdaCountryCountAggregateInput.schema';

export const UsdaCountryCountSchema: z.ZodType<Prisma.UsdaCountryCountArgs> = z.object({ orderBy: z.union([UsdaCountryOrderByWithRelationInputObjectSchema, UsdaCountryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCountryWhereInputObjectSchema.optional(), cursor: UsdaCountryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCountryCountAggregateInputObjectSchema ]).optional() }).strict() as unknown as z.ZodType<Prisma.UsdaCountryCountArgs>;

export const UsdaCountryCountZodSchema = z.object({ orderBy: z.union([UsdaCountryOrderByWithRelationInputObjectSchema, UsdaCountryOrderByWithRelationInputObjectSchema.array()]).optional(), where: UsdaCountryWhereInputObjectSchema.optional(), cursor: UsdaCountryWhereUniqueInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), select: z.union([ z.literal(true), UsdaCountryCountAggregateInputObjectSchema ]).optional() }).strict();