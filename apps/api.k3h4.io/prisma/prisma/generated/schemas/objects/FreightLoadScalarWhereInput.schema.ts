import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { EnumLifecycleStatusFilterObjectSchema as EnumLifecycleStatusFilterObjectSchema } from './EnumLifecycleStatusFilter.schema';
import { LifecycleStatusSchema } from '../enums/LifecycleStatus.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../helpers/decimal-helpers';
const freightloadscalarwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FreightLoadScalarWhereInputObjectSchema), z.lazy(() => FreightLoadScalarWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FreightLoadScalarWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FreightLoadScalarWhereInputObjectSchema), z.lazy(() => FreightLoadScalarWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  title: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  originName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  originLat: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  originLng: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  destinationName: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  destinationLat: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  destinationLng: z.union([z.lazy(() => FloatFilterObjectSchema), z.number()]).optional(),
  distanceKm: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'distanceKm' must be a Decimal",
})]).optional(),
  durationMinutes: z.union([z.lazy(() => IntFilterObjectSchema), z.number().int()]).optional(),
  cost: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'cost' must be a Decimal",
})]).optional(),
  status: z.union([z.lazy(() => EnumLifecycleStatusFilterObjectSchema), LifecycleStatusSchema]).optional(),
  routeGeoJson: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional()
}).strict();
export const FreightLoadScalarWhereInputObjectSchema: z.ZodType<Prisma.FreightLoadScalarWhereInput> = freightloadscalarwhereinputSchema as unknown as z.ZodType<Prisma.FreightLoadScalarWhereInput>;
export const FreightLoadScalarWhereInputObjectZodSchema = freightloadscalarwhereinputSchema;
