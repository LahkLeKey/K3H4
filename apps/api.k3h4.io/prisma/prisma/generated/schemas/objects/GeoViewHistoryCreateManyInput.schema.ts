import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  signature: z.string(),
  zoomBand: z.number().int(),
  bboxMinLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMinLat' must be a Decimal",
}),
  bboxMinLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMinLng' must be a Decimal",
}),
  bboxMaxLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMaxLat' must be a Decimal",
}),
  bboxMaxLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'bboxMaxLng' must be a Decimal",
}),
  lastPoiIds: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  lastPoiCount: z.number().int().optional().nullable(),
  firstViewedAt: z.coerce.date().optional(),
  lastViewedAt: z.coerce.date().optional(),
  viewCount: z.number().int().optional(),
  staleAfter: z.coerce.date().optional().nullable()
}).strict();
export const GeoViewHistoryCreateManyInputObjectSchema: z.ZodType<Prisma.GeoViewHistoryCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoViewHistoryCreateManyInput>;
export const GeoViewHistoryCreateManyInputObjectZodSchema = makeSchema();
