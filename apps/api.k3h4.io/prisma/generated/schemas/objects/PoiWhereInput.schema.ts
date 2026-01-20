import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BigIntFilterObjectSchema as BigIntFilterObjectSchema } from './BigIntFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { BuildingNullableScalarRelationFilterObjectSchema as BuildingNullableScalarRelationFilterObjectSchema } from './BuildingNullableScalarRelationFilter.schema';
import { BuildingWhereInputObjectSchema as BuildingWhereInputObjectSchema } from './BuildingWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const poiwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => PoiWhereInputObjectSchema), z.lazy(() => PoiWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PoiWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PoiWhereInputObjectSchema), z.lazy(() => PoiWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  osmType: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  osmId: z.union([z.lazy(() => BigIntFilterObjectSchema), z.bigint()]).optional(),
  name: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  category: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  latitude: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'latitude' must be a Decimal",
})]).optional(),
  longitude: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'longitude' must be a Decimal",
})]).optional(),
  tags: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  source: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  lastSeenAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  buildingId: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  building: z.union([z.lazy(() => BuildingNullableScalarRelationFilterObjectSchema), z.lazy(() => BuildingWhereInputObjectSchema)]).optional()
}).strict();
export const PoiWhereInputObjectSchema: z.ZodType<Prisma.PoiWhereInput> = poiwhereinputSchema as unknown as z.ZodType<Prisma.PoiWhereInput>;
export const PoiWhereInputObjectZodSchema = poiwhereinputSchema;
