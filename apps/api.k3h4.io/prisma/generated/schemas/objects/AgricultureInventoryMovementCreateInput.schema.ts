import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureInventoryMovementsInput.schema';
import { AgricultureInventoryCreateNestedOneWithoutMovementsInputObjectSchema as AgricultureInventoryCreateNestedOneWithoutMovementsInputObjectSchema } from './AgricultureInventoryCreateNestedOneWithoutMovementsInput.schema';
import { AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInput.schema'

import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  type: z.string(),
  quantity: z.union([
  z.number(),
  z.string(),
  z.instanceof(Prisma.Decimal),
  DecimalJSLikeSchema,
]).refine((v) => isValidDecimalInput(v), {
  message: "Field 'quantity' must be a Decimal",
}),
  reason: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema),
  inventory: z.lazy(() => AgricultureInventoryCreateNestedOneWithoutMovementsInputObjectSchema),
  shipment: z.lazy(() => AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementCreateInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateInput>;
export const AgricultureInventoryMovementCreateInputObjectZodSchema = makeSchema();
