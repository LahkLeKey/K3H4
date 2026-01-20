import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { NestedEnumBuildingTypeWithAggregatesFilterObjectSchema as NestedEnumBuildingTypeWithAggregatesFilterObjectSchema } from './NestedEnumBuildingTypeWithAggregatesFilter.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumBuildingTypeFilterObjectSchema as NestedEnumBuildingTypeFilterObjectSchema } from './NestedEnumBuildingTypeFilter.schema'

const makeSchema = () => z.object({
  equals: BuildingTypeSchema.optional(),
  in: BuildingTypeSchema.array().optional(),
  notIn: BuildingTypeSchema.array().optional(),
  not: z.union([BuildingTypeSchema, z.lazy(() => NestedEnumBuildingTypeWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumBuildingTypeFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumBuildingTypeFilterObjectSchema).optional()
}).strict();
export const EnumBuildingTypeWithAggregatesFilterObjectSchema: z.ZodType<Prisma.EnumBuildingTypeWithAggregatesFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBuildingTypeWithAggregatesFilter>;
export const EnumBuildingTypeWithAggregatesFilterObjectZodSchema = makeSchema();
