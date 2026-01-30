import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { NullableJsonNullValueInputSchema } from '../enums/NullableJsonNullValueInput.schema'

import { JsonValueSchema as jsonSchema } from '../helpers/json-helpers';

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  theme: z.string().optional(),
  locale: z.string().optional(),
  timezone: z.string().optional(),
  marketingOptIn: z.boolean().optional(),
  note: z.string().optional().nullable(),
  lastCenterLat: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lastCenterLat' must be a Decimal",
}).optional().nullable(),
  lastCenterLng: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lastCenterLng' must be a Decimal",
}).optional().nullable(),
  lastZoom: z.number().optional().nullable(),
  lastBearing: z.number().optional().nullable(),
  lastPitch: z.number().optional().nullable(),
  lastPoiSignature: z.string().optional().nullable(),
  lastPoiKinds: z.string().optional().nullable(),
  lastPoiRadiusM: z.number().int().optional().nullable(),
  lastPoiCount: z.number().int().optional().nullable(),
  lastPoiFetchedAt: z.coerce.date().optional().nullable(),
  maptilerStyle: z.string().optional(),
  maptilerLanguage: z.string().optional(),
  maptilerLastPath: z.string().optional().nullable(),
  maptilerLastParams: z.union([NullableJsonNullValueInputSchema, jsonSchema]).optional(),
  maptilerLastKind: z.string().optional().nullable(),
  maptilerLastSignature: z.string().optional().nullable(),
  maptilerLastFetchedAt: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();
export const UserPreferenceUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.UserPreferenceUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceUncheckedCreateWithoutUserInput>;
export const UserPreferenceUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
