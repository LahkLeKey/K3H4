import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonFilterObjectSchema as JsonFilterObjectSchema } from './JsonFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const geopoicachescalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema), z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema), z.lazy(() => GeoPoiCacheScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  centerLat: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLat' must be a Decimal",
})]).optional(),
  centerLng: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLng' must be a Decimal",
})]).optional(),
  radiusM: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  kinds: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  pois: z.lazy(() => JsonFilterObjectSchema).optional(),
  count: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  expiresAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoPoiCacheScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheScalarWhereInput> = geopoicachescalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoPoiCacheScalarWhereInput>;
export const GeoPoiCacheScalarWhereInputObjectZodSchema = geopoicachescalarwhereinputSchema;
