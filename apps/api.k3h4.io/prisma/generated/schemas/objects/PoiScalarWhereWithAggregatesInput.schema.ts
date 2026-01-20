import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { BigIntWithAggregatesFilterObjectSchema as BigIntWithAggregatesFilterObjectSchema } from './BigIntWithAggregatesFilter.schema';
import { StringNullableWithAggregatesFilterObjectSchema as StringNullableWithAggregatesFilterObjectSchema } from './StringNullableWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema';
import { IntNullableWithAggregatesFilterObjectSchema as IntNullableWithAggregatesFilterObjectSchema } from './IntNullableWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const poiscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => PoiScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PoiScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => PoiScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => PoiScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => PoiScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  osmType: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  osmId: z.union([z.lazy(() => BigIntWithAggregatesFilterObjectSchema), z.bigint()]).optional(),
  name: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  category: z.union([z.lazy(() => StringNullableWithAggregatesFilterObjectSchema), z.string()]).optional().nullable(),
  latitude: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'latitude' must be a Decimal",
})]).optional(),
  longitude: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'longitude' must be a Decimal",
})]).optional(),
  tags: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  source: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  lastSeenAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  buildingId: z.union([z.lazy(() => IntNullableWithAggregatesFilterObjectSchema), z.number().int()]).optional().nullable()
}).strict();
export const PoiScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.PoiScalarWhereWithAggregatesInput> = poiscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.PoiScalarWhereWithAggregatesInput>;
export const PoiScalarWhereWithAggregatesInputObjectZodSchema = poiscalarwherewithaggregatesinputSchema;
