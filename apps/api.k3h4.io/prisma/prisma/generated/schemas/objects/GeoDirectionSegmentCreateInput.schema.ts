import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { GeoDirectionCreateNestedOneWithoutSegmentsInputObjectSchema as GeoDirectionCreateNestedOneWithoutSegmentsInputObjectSchema } from './GeoDirectionCreateNestedOneWithoutSegmentsInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  sequence: z.number().int(),
  instruction: z.string().optional().nullable(),
  maneuverType: z.string().optional().nullable(),
  maneuverModifier: z.string().optional().nullable(),
  distanceMeters: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceMeters' must be a Decimal",
}),
  durationSeconds: z.number().int().optional().nullable(),
  startLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'startLat' must be a Decimal",
}),
  startLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'startLng' must be a Decimal",
}),
  endLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'endLat' must be a Decimal",
}),
  endLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'endLng' must be a Decimal",
}),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  direction: z.lazy(() => GeoDirectionCreateNestedOneWithoutSegmentsInputObjectSchema)
}).strict();
export const GeoDirectionSegmentCreateInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateInput>;
export const GeoDirectionSegmentCreateInputObjectZodSchema = makeSchema();
