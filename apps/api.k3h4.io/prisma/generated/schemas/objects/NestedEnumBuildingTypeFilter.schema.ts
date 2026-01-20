import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { BuildingTypeSchema } from '../enums/BuildingType.schema'

const nestedenumbuildingtypefilterSchema = z.object({
  equals: BuildingTypeSchema.optional(),
  in: BuildingTypeSchema.array().optional(),
  notIn: BuildingTypeSchema.array().optional(),
  not: z.union([BuildingTypeSchema, z.lazy(() => NestedEnumBuildingTypeFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumBuildingTypeFilterObjectSchema: z.ZodType<Prisma.NestedEnumBuildingTypeFilter> = nestedenumbuildingtypefilterSchema as unknown as z.ZodType<Prisma.NestedEnumBuildingTypeFilter>;
export const NestedEnumBuildingTypeFilterObjectZodSchema = nestedenumbuildingtypefilterSchema;
