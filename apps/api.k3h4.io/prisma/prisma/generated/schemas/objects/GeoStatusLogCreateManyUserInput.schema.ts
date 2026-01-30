import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  status: z.string(),
  poiStatus: z.string().optional().nullable(),
  centerLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLat' must be a Decimal",
}).optional().nullable(),
  centerLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'centerLng' must be a Decimal",
}).optional().nullable(),
  error: z.string().optional().nullable(),
  userAgent: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional()
}).strict();
export const GeoStatusLogCreateManyUserInputObjectSchema: z.ZodType<Prisma.GeoStatusLogCreateManyUserInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogCreateManyUserInput>;
export const GeoStatusLogCreateManyUserInputObjectZodSchema = makeSchema();
