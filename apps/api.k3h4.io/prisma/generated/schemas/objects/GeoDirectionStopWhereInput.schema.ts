import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { BigIntNullableFilterObjectSchema as BigIntNullableFilterObjectSchema } from './BigIntNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { GeoDirectionScalarRelationFilterObjectSchema as GeoDirectionScalarRelationFilterObjectSchema } from './GeoDirectionScalarRelationFilter.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './GeoDirectionWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const geodirectionstopwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => GeoDirectionStopWhereInputObjectSchema), z.lazy(() => GeoDirectionStopWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => GeoDirectionStopWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => GeoDirectionStopWhereInputObjectSchema), z.lazy(() => GeoDirectionStopWhereInputObjectSchema).array()]).optional(),
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
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  direction: z.union([z.lazy(() => GeoDirectionScalarRelationFilterObjectSchema), z.lazy(() => GeoDirectionWhereInputObjectSchema)]).optional()
}).strict();
export const GeoDirectionStopWhereInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopWhereInput> = geodirectionstopwhereinputSchema as unknown as z.ZodType<Prisma.GeoDirectionStopWhereInput>;
export const GeoDirectionStopWhereInputObjectZodSchema = geodirectionstopwhereinputSchema;
