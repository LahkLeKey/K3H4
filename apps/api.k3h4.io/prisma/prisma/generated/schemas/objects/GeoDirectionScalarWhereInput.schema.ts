import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const geodirectionscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoDirectionScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoDirectionScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  actorId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  provider: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  profile: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  signature: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  inputPoints: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  originLat: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLat' must be a Decimal",
})]).optional().nullable(),
  originLng: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLng' must be a Decimal",
})]).optional().nullable(),
  destinationLat: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLat' must be a Decimal",
})]).optional().nullable(),
  destinationLng: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLng' must be a Decimal",
})]).optional().nullable(),
  distanceMeters: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceMeters' must be a Decimal",
})]).optional().nullable(),
  durationSeconds: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  geometry: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  instructions: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  payload: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  statusCode: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  statusMessage: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  expiresAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoDirectionScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoDirectionScalarWhereInput> = geodirectionscalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoDirectionScalarWhereInput>;
export const GeoDirectionScalarWhereInputObjectZodSchema = geodirectionscalarwhereinputSchema;
