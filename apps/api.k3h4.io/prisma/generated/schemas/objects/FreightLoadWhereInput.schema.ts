import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { FloatFilterObjectSchema as FloatFilterObjectSchema } from './FloatFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { IntFilterObjectSchema as IntFilterObjectSchema } from './IntFilter.schema';
import { JsonNullableFilterObjectSchema as JsonNullableFilterObjectSchema } from './JsonNullableFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { WarehouseItemListRelationFilterObjectSchema as WarehouseItemListRelationFilterObjectSchema } from './WarehouseItemListRelationFilter.schema';
import { AgricultureShipmentListRelationFilterObjectSchema as AgricultureShipmentListRelationFilterObjectSchema } from './AgricultureShipmentListRelationFilter.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const freightloadwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => FreightLoadWhereInputObjectSchema), z.lazy(() => FreightLoadWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => FreightLoadWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => FreightLoadWhereInputObjectSchema), z.lazy(() => FreightLoadWhereInputObjectSchema).array()]).optional(),
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
  status: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  routeGeoJson: z.lazy(() => JsonNullableFilterObjectSchema).optional(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  warehouseItems: z.lazy(() => WarehouseItemListRelationFilterObjectSchema).optional(),
  agricultureShipments: z.lazy(() => AgricultureShipmentListRelationFilterObjectSchema).optional()
}).strict();
export const FreightLoadWhereInputObjectSchema: z.ZodType<Prisma.FreightLoadWhereInput> = freightloadwhereinputSchema as unknown as z.ZodType<Prisma.FreightLoadWhereInput>;
export const FreightLoadWhereInputObjectZodSchema = freightloadwhereinputSchema;
