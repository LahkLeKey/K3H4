import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutGeoDirectionsInputObjectSchema as UserCreateNestedOneWithoutGeoDirectionsInputObjectSchema } from './UserCreateNestedOneWithoutGeoDirectionsInput.schema';
import { ActorCreateNestedOneWithoutGeoDirectionsInputObjectSchema as ActorCreateNestedOneWithoutGeoDirectionsInputObjectSchema } from './ActorCreateNestedOneWithoutGeoDirectionsInput.schema';
import { GeoDirectionSegmentCreateNestedManyWithoutDirectionInputObjectSchema as GeoDirectionSegmentCreateNestedManyWithoutDirectionInputObjectSchema } from './GeoDirectionSegmentCreateNestedManyWithoutDirectionInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
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
  user: z.lazy(() => UserCreateNestedOneWithoutGeoDirectionsInputObjectSchema).optional(),
  actor: z.lazy(() => ActorCreateNestedOneWithoutGeoDirectionsInputObjectSchema).optional(),
  segments: z.lazy(() => GeoDirectionSegmentCreateNestedManyWithoutDirectionInputObjectSchema).optional()
}).strict();
export const GeoDirectionCreateWithoutStopsInputObjectSchema: z.ZodType<Prisma.GeoDirectionCreateWithoutStopsInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionCreateWithoutStopsInput>;
export const GeoDirectionCreateWithoutStopsInputObjectZodSchema = makeSchema();
