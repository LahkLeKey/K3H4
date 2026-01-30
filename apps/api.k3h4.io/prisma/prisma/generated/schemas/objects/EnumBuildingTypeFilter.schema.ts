import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { NestedEnumBuildingTypeFilterObjectSchema as NestedEnumBuildingTypeFilterObjectSchema } from './NestedEnumBuildingTypeFilter.schema'

const makeSchema = () => z.object({
  equals: BuildingTypeSchema.optional(),
  in: BuildingTypeSchema.array().optional(),
  notIn: BuildingTypeSchema.array().optional(),
  not: z.union([BuildingTypeSchema, z.lazy(() => NestedEnumBuildingTypeFilterObjectSchema)]).optional()
}).strict();
export const EnumBuildingTypeFilterObjectSchema: z.ZodType<Prisma.EnumBuildingTypeFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumBuildingTypeFilter>;
export const EnumBuildingTypeFilterObjectZodSchema = makeSchema();
