import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { BigIntNullableFilterObjectSchema as BigIntNullableFilterObjectSchema } from './BigIntNullableFilter.schema';
import { EnumBuildingTypeFilterObjectSchema as EnumBuildingTypeFilterObjectSchema } from './EnumBuildingTypeFilter.schema';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { PoiListRelationFilterObjectSchema as PoiListRelationFilterObjectSchema } from './PoiListRelationFilter.schema'

const buildingwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => BuildingWhereInputObjectSchema), z.lazy(() => BuildingWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuildingWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuildingWhereInputObjectSchema), z.lazy(() => BuildingWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  osmId: z.union([z.lazy(() => BigIntNullableFilterObjectSchema), z.bigint()]).optional().nullable(),
  type: z.union([z.lazy(() => EnumBuildingTypeFilterObjectSchema), BuildingTypeSchema]).optional(),
  addressHouseNumber: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  addressStreet: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  addressCity: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  addressPostcode: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  addressState: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  addressCountry: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  geometry: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  POIs: z.lazy(() => PoiListRelationFilterObjectSchema).optional()
}).strict();
export const BuildingWhereInputObjectSchema: z.ZodType<Prisma.BuildingWhereInput> = buildingwhereinputSchema as unknown as z.ZodType<Prisma.BuildingWhereInput>;
export const BuildingWhereInputObjectZodSchema = buildingwhereinputSchema;
