import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringWithAggregatesFilterObjectSchema as StringWithAggregatesFilterObjectSchema } from './StringWithAggregatesFilter.schema';
import { FloatWithAggregatesFilterObjectSchema as FloatWithAggregatesFilterObjectSchema } from './FloatWithAggregatesFilter.schema';
import { DecimalWithAggregatesFilterObjectSchema as DecimalWithAggregatesFilterObjectSchema } from './DecimalWithAggregatesFilter.schema';
import { IntWithAggregatesFilterObjectSchema as IntWithAggregatesFilterObjectSchema } from './IntWithAggregatesFilter.schema';
import { JsonNullableWithAggregatesFilterObjectSchema as JsonNullableWithAggregatesFilterObjectSchema } from './JsonNullableWithAggregatesFilter.schema';
import { DateTimeWithAggregatesFilterObjectSchema as DateTimeWithAggregatesFilterObjectSchema } from './DateTimeWithAggregatesFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const freightloadscalarwherewithaggregatesinputSchema = z.object({
  AND: z.union([z.lazy(() => FreightLoadScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FreightLoadScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FreightLoadScalarWhereWithAggregatesInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FreightLoadScalarWhereWithAggregatesInputObjectSchema), z.lazy(() => FreightLoadScalarWhereWithAggregatesInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  originName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  originLat: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  originLng: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  destinationName: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  destinationLat: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  destinationLng: z.union([z.lazy(() => FloatWithAggregatesFilterObjectSchema), z.number()]).optional(),
  distanceKm: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceKm' must be a Decimal",
})]).optional(),
  durationMinutes: z.union([z.lazy(() => IntWithAggregatesFilterObjectSchema), z.number().int()]).optional(),
  cost: z.union([z.lazy(() => DecimalWithAggregatesFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => StringWithAggregatesFilterObjectSchema), z.string()]).optional(),
  routeGeoJson: z.lazy(() => JsonNullableWithAggregatesFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeWithAggregatesFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FreightLoadScalarWhereWithAggregatesInputObjectSchema: z.ZodType<Prisma.FreightLoadScalarWhereWithAggregatesInput> = freightloadscalarwherewithaggregatesinputSchema as unknown as z.ZodType<Prisma.FreightLoadScalarWhereWithAggregatesInput>;
export const FreightLoadScalarWhereWithAggregatesInputObjectZodSchema = freightloadscalarwherewithaggregatesinputSchema;
