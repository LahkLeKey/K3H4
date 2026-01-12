import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { UsdaUnitWhereInputObjectSchema as UsdaUnitWhereInputObjectSchema } from './objects/UsdaUnitWhereInput.schema';
import { UsdaUnitOrderByWithAggregationInputObjectSchema as UsdaUnitOrderByWithAggregationInputObjectSchema } from './objects/UsdaUnitOrderByWithAggregationInput.schema';
import { UsdaUnitScalarWhereWithAggregatesInputObjectSchema as UsdaUnitScalarWhereWithAggregatesInputObjectSchema } from './objects/UsdaUnitScalarWhereWithAggregatesInput.schema';
import { UsdaUnitScalarFieldEnumSchema } from './enums/UsdaUnitScalarFieldEnum.schema';
import { UsdaUnitCountAggregateInputObjectSchema as UsdaUnitCountAggregateInputObjectSchema } from './objects/UsdaUnitCountAggregateInput.schema';
import { UsdaUnitMinAggregateInputObjectSchema as UsdaUnitMinAggregateInputObjectSchema } from './objects/UsdaUnitMinAggregateInput.schema';
import { UsdaUnitMaxAggregateInputObjectSchema as UsdaUnitMaxAggregateInputObjectSchema } from './objects/UsdaUnitMaxAggregateInput.schema';

export const UsdaUnitGroupBySchema: z.ZodType<Prisma.UsdaUnitGroupByArgs> = z.object({ where: UsdaUnitWhereInputObjectSchema.optional(), orderBy: z.union([UsdaUnitOrderByWithAggregationInputObjectSchema, UsdaUnitOrderByWithAggregationInputObjectSchema.array()]).optional(), having: UsdaUnitScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(UsdaUnitScalarFieldEnumSchema), _count: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional(), _min: UsdaUnitMinAggregateInputObjectSchema.optional(), _max: UsdaUnitMaxAggregateInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.UsdaUnitGroupByArgs>;

export const UsdaUnitGroupByZodSchema = z.object({ where: UsdaUnitWhereInputObjectSchema.optional(), orderBy: z.union([UsdaUnitOrderByWithAggregationInputObjectSchema, UsdaUnitOrderByWithAggregationInputObjectSchema.array()]).optional(), having: UsdaUnitScalarWhereWithAggregatesInputObjectSchema.optional(), take: z.number().optional(), skip: z.number().optional(), by: z.array(UsdaUnitScalarFieldEnumSchema), _count: z.union([ z.literal(true), UsdaUnitCountAggregateInputObjectSchema ]).optional(), _min: UsdaUnitMinAggregateInputObjectSchema.optional(), _max: UsdaUnitMaxAggregateInputObjectSchema.optional() }).strict();