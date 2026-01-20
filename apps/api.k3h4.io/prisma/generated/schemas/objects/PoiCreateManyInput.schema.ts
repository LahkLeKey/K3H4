import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  osmType: z.string().optional(),
  osmId: z.bigint(),
  name: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
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
  tags: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  source: z.string().optional(),
  lastSeenAt: z.coerce.date().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  buildingId: z.number().int().optional().nullable()
}).strict();
export const PoiCreateManyInputObjectSchema: z.ZodType<Prisma.PoiCreateManyInput> = makeSchema() as unknown as z.ZodType<Prisma.PoiCreateManyInput>;
export const PoiCreateManyInputObjectZodSchema = makeSchema();
