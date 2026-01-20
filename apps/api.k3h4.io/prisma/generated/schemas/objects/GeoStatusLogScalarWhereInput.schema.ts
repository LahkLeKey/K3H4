import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const geostatuslogscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema), z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema), z.lazy(() => GeoStatusLogScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  poiStatus: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  centerLat: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLat' must be a Decimal",
})]).optional().nullable(),
  centerLng: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLng' must be a Decimal",
})]).optional().nullable(),
  error: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  userAgent: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoStatusLogScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoStatusLogScalarWhereInput> = geostatuslogscalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoStatusLogScalarWhereInput>;
export const GeoStatusLogScalarWhereInputObjectZodSchema = geostatuslogscalarwhereinputSchema;
