import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInputObjectSchema as GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInputObjectSchema } from './GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInput.schema';
import { GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInputObjectSchema as GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string().optional().nullable(),
  provider: z.string(),
  profile: z.string().optional().nullable(),
  signature: z.string(),
  inputPoints: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  originLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLat' must be a Decimal",
}).optional().nullable(),
  originLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'originLng' must be a Decimal",
}).optional().nullable(),
  destinationLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLat' must be a Decimal",
}).optional().nullable(),
  destinationLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'destinationLng' must be a Decimal",
}).optional().nullable(),
  distanceMeters: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceMeters' must be a Decimal",
}).optional().nullable(),
  durationSeconds: z.number().int().optional().nullable(),
  geometry: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  instructions: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  payload: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  statusCode: z.number().int().optional().nullable(),
  statusMessage: z.string().optional().nullable(),
  expiresAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  stops: z.lazy(() => GeoDirectionStopUncheckedCreateNestedManyWithoutDirectionInputObjectSchema).optional(),
  segments: z.lazy(() => GeoDirectionSegmentUncheckedCreateNestedManyWithoutDirectionInputObjectSchema).optional()
}).strict();
export const GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectSchema: z.ZodType<Prisma.GeoDirectionUncheckedCreateWithoutRouteCacheInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionUncheckedCreateWithoutRouteCacheInput>;
export const GeoDirectionUncheckedCreateWithoutRouteCacheInputObjectZodSchema = makeSchema();
