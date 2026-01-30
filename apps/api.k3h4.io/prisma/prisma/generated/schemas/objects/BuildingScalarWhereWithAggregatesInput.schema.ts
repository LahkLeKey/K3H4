import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { BigIntNullableWithAggregatesFilterObjectSchema as BigIntNullableWithAggregatesFilterObjectSchema } from './BigIntNullableWithAggregatesFilter.schema';
import { EnumBuildingTypeWithAggregatesFilterObjectSchema as EnumBuildingTypeWithAggregatesFilterObjectSchema } from './EnumBuildingTypeWithAggregatesFilter.schema';
import { BuildingTypeSchema } from '../enums/BuildingType.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema'

const buildingscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => BuildingScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuildingScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => BuildingScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => BuildingScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => BuildingScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  osmId: z.union([z.lazy(() => BigIntNullableWithAggregatesFilterObjectSchema), z.bigint()]).optional().nullable(),
  type: z.union([z.lazy(() => EnumBuildingTypeWithAggregatesFilterObjectSchema), BuildingTypeSchema]).optional(),
  addressHouseNumber: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  addressStreet: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  addressCity: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  addressPostcode: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  addressState: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  addressCountry: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  geometry: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional()
}).strict();
export const BuildingScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.BuildingScalarWhereWithAggregatesInput> = buildingscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.BuildingScalarWhereWithAggregatesInput>;
export const BuildingScalarWhereWithAggregatesInputObjectZodSchema = buildingscalarwherewithaggregatesinputSchema;
