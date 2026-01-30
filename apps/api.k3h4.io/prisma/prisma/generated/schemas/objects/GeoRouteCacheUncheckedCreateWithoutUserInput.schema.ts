import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInputObjectSchema as GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInputObjectSchema } from './GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  provider: z.string().optional(),
  signature: z.string(),
  originLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLat' must be a Decimal",
}),
  originLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLng' must be a Decimal",
}),
  destinationLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLat' must be a Decimal",
}),
  destinationLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLng' must be a Decimal",
}),
  distanceKm: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceKm' must be a Decimal",
}),
  durationMinutes: z.number().int().optional().nullable(),
  geojson: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  directions: z.lazy(() => GeoDirectionUncheckedCreateNestedManyWithoutRouteCacheInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheUncheckedCreateWithoutUserInput>;
export const GeoRouteCacheUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
