import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BigIntNullableFilterObjectSchema as BigIntNullableFilterObjectSchema } from './BigIntNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const geodirectionstopscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema), z.lazy(() => GeoDirectionStopScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  directionId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  sequence: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
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
  label: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  address: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  source: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  osmId: z.union([z.lazy(() => BigIntNullableFilterObjectSchema), z.bigint()]).optional().nullable(),
  metadata: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const GeoDirectionStopScalarWhereInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopScalarWhereInput> = geodirectionstopscalarwhereinputSchema as unknown as z.ZodType<Prisma.GeoDirectionStopScalarWhereInput>;
export const GeoDirectionStopScalarWhereInputObjectZodSchema = geodirectionstopscalarwhereinputSchema;
