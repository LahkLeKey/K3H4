import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  directionId: z.string(),
  sequence: z.number().int(),
  latitude: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'latitude' must be a Decimal",
}),
  longitude: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'longitude' must be a Decimal",
}),
  label: z.string().optional().nullable(),
  address: z.string().optional().nullable(),
  source: z.string().optional().nullable(),
  osmId: z.bigint().optional().nullable(),
  metadata: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoDirectionStopUncheckedCreateInputObjectSchema: z.ZodType<Prisma.GeoDirectionStopUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoDirectionStopUncheckedCreateInput>;
export const GeoDirectionStopUncheckedCreateInputObjectZodSchema = makeSchema();
