import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { BoolFilterObjectSchema as BoolFilterObjectSchema } from './BoolFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalNullableFilterObjectSchema as DecimalNullableFilterObjectSchema } from './DecimalNullableFilter.schema';
import { FloatNullableFilterObjectSchema as FloatNullableFilterObjectSchema } from './FloatNullableFilter.schema';
import { IntNullableFilterObjectSchema as IntNullableFilterObjectSchema } from './IntNullableFilter.schema';
import { DateTimeNullableFilterObjectSchema as DateTimeNullableFilterObjectSchema } from './DateTimeNullableFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const userpreferencewhereinputSchema = z.object({
  AND: z.union([z.lazy(() => UserPreferenceWhereInputObjectSchema), z.lazy(() => UserPreferenceWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => UserPreferenceWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => UserPreferenceWhereInputObjectSchema), z.lazy(() => UserPreferenceWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  theme: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  locale: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  timezone: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  marketingOptIn: z.union([z.lazy(() => BoolFilterObjectSchema), z.boolean()]).optional(),
  note: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastCenterLat: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lastCenterLat' must be a Decimal",
})]).optional().nullable(),
  lastCenterLng: z.union([z.lazy(() => DecimalNullableFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'lastCenterLng' must be a Decimal",
})]).optional().nullable(),
  lastZoom: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  lastBearing: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  lastPitch: z.union([z.lazy(() => FloatNullableFilterObjectSchema), z.number()]).optional().nullable(),
  lastPoiSignature: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastPoiKinds: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  lastPoiRadiusM: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  lastPoiCount: z.union([z.lazy(() => IntNullableFilterObjectSchema), z.number().int()]).optional().nullable(),
  lastPoiFetchedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  maptilerStyle: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  maptilerLanguage: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  maptilerLastPath: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  maptilerLastParams: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  maptilerLastKind: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  maptilerLastSignature: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  maptilerLastFetchedAt: z.union([z.lazy(() => DateTimeNullableFilterObjectSchema), z.coerce.date()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional()
}).strict();
export const UserPreferenceWhereInputObjectSchema: z.ZodType<Prisma.UserPreferenceWhereInput> = userpreferencewhereinputSchema as unknown as z.ZodType<Prisma.UserPreferenceWhereInput>;
export const UserPreferenceWhereInputObjectZodSchema = userpreferencewhereinputSchema;
