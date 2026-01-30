import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

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
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoDirectionSegmentCreateManyDirectionInputObjectSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateManyDirectionInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateManyDirectionInput>;
export const GeoDirectionSegmentCreateManyDirectionInputObjectZodSchema = makeSchema();
