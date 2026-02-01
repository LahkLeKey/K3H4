import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  title: z.string(),
  originName: z.string(),
  originLat: z.number(),
  originLng: z.number(),
  destinationName: z.string(),
  destinationLat: z.number(),
  destinationLng: z.number(),
  distanceKm: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceKm' must be a Decimal",
}),
  durationMinutes: z.number().int(),
  cost: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
}),
  status: z.string().optional(),
  routeGeoJson: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const FreightLoadCreateManyUserInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateManyUserInput>;
export const FreightLoadCreateManyUserInputObjectZodSchema = makeSchema();
