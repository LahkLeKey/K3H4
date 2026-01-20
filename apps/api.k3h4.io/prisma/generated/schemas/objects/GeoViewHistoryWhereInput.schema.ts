import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const geoviewhistorywhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoViewHistoryWhereInputObjectSchema), z.lazy(() => GeoViewHistoryWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoViewHistoryWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoViewHistoryWhereInputObjectSchema), z.lazy(() => GeoViewHistoryWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  zoomBand: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  bboxMinLat: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMinLat' must be a Decimal",
})]).optional(),
  bboxMinLng: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMinLng' must be a Decimal",
})]).optional(),
  bboxMaxLat: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMaxLat' must be a Decimal",
})]).optional(),
  bboxMaxLng: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMaxLng' must be a Decimal",
})]).optional(),
  lastPoiIds: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  lastPoiCount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  firstViewedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  lastViewedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  viewCount: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  staleAfter: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const GeoViewHistoryWhereInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryWhereInput> = geoviewhistorywhereinputSchema as unknown as z.ZodType<Prisma.GeoViewHistoryWhereInput>;
export const GeoViewHistoryWhereInputObjectZodSchema = geoviewhistorywhereinputSchema;
