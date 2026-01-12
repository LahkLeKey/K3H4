import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { StringFilterObjectSchema as StringFilterObjectSchema } from './StringFilter.schema';
import { StringNullableFilterObjectSchema as StringNullableFilterObjectSchema } from './StringNullableFilter.schema';
import { DecimalFilterObjectSchema as DecimalFilterObjectSchema } from './DecimalFilter.schema';
import { DateTimeFilterObjectSchema as DateTimeFilterObjectSchema } from './DateTimeFilter.schema';
import { UserScalarRelationFilterObjectSchema as UserScalarRelationFilterObjectSchema } from './UserScalarRelationFilter.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { AgricultureInventoryScalarRelationFilterObjectSchema as AgricultureInventoryScalarRelationFilterObjectSchema } from './AgricultureInventoryScalarRelationFilter.schema';
import { AgricultureInventoryWhereInputObjectSchema as AgricultureInventoryWhereInputObjectSchema } from './AgricultureInventoryWhereInput.schema';
import { AgricultureShipmentNullableScalarRelationFilterObjectSchema as AgricultureShipmentNullableScalarRelationFilterObjectSchema } from './AgricultureShipmentNullableScalarRelationFilter.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const agricultureinventorymovementwhereinputSchema = z.object({
  AND: z.union([z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).array()]).optional(),
  OR: z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).array().optional(),
  NOT: z.union([z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereInputObjectSchema).array()]).optional(),
  id: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  userId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  inventoryId: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  shipmentId: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  type: z.union([z.lazy(() => StringFilterObjectSchema), z.string()]).optional(),
  quantity: z.union([z.lazy(() => DecimalFilterObjectSchema), z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'quantity' must be a Decimal",
})]).optional(),
  reason: z.union([z.lazy(() => StringNullableFilterObjectSchema), z.string()]).optional().nullable(),
  createdAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  updatedAt: z.union([z.lazy(() => DateTimeFilterObjectSchema), z.coerce.date()]).optional(),
  user: z.union([z.lazy(() => UserScalarRelationFilterObjectSchema), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  inventory: z.union([z.lazy(() => AgricultureInventoryScalarRelationFilterObjectSchema), z.lazy(() => AgricultureInventoryWhereInputObjectSchema)]).optional(),
  shipment: z.union([z.lazy(() => AgricultureShipmentNullableScalarRelationFilterObjectSchema), z.lazy(() => AgricultureShipmentWhereInputObjectSchema)]).optional()
}).strict();
export const AgricultureInventoryMovementWhereInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementWhereInput> = agricultureinventorymovementwhereinputSchema as unknown as z.ZodType<Prisma.AgricultureInventoryMovementWhereInput>;
export const AgricultureInventoryMovementWhereInputObjectZodSchema = agricultureinventorymovementwhereinputSchema;
