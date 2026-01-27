import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema';
import { UserCreateNestedOneWithoutGeoRouteCachesInputObjectSchema as UserCreateNestedOneWithoutGeoRouteCachesInputObjectSchema } from './UserCreateNestedOneWithoutGeoRouteCachesInput.schema';
import { GeoDirectionCreateNestedManyWithoutRouteCacheInputObjectSchema as GeoDirectionCreateNestedManyWithoutRouteCacheInputObjectSchema } from './GeoDirectionCreateNestedManyWithoutRouteCacheInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
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
  user: z.lazy(() => UserCreateNestedOneWithoutGeoRouteCachesInputObjectSchema).optional(),
  directions: z.lazy(() => GeoDirectionCreateNestedManyWithoutRouteCacheInputObjectSchema).optional()
}).strict();
export const GeoRouteCacheCreateInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateInput>;
export const GeoRouteCacheCreateInputObjectZodSchema = makeSchema();
