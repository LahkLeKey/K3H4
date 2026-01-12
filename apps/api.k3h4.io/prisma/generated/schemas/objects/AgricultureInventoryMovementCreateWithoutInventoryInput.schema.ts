import * as z from 'zod';
import { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema as UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureInventoryMovementsInput.schema';
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
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureInventoryMovementsInputObjectSchema),
  shipment: z.lazy(() => AgricultureShipmentCreateNestedOneWithoutInventoryMovementsInputObjectSchema).optional()
}).strict();
export const AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateWithoutInventoryInput>;
export const AgricultureInventoryMovementCreateWithoutInventoryInputObjectZodSchema = makeSchema();
