import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { JsonNullValueInputSchema } from '../enums/JsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string(),
  centerLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLat' must be a Decimal",
}),
  centerLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLng' must be a Decimal",
}),
  radiusM: z.number().int(),
  kinds: z.string(),
  pois: z.union([JsonNullValueInputSchema, jsonSchema]),
  count: z.number().int(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoPoiCacheCreateManyUserInputObjectSchema: z.ZodType<Prisma.GeoPoiCacheCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoPoiCacheCreateManyUserInput>;
export const GeoPoiCacheCreateManyUserInputObjectZodSchema = makeSchema();
