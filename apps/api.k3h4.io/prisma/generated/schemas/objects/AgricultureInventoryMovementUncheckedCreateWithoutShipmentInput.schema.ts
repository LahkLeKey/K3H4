import * as z from 'zod';
import { Prisma } from '@prisma/client';


import { DecimalJSLikeSchema, isValidDecimalInput } from '../../helpers/decimal-helpers';
const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  inventoryId: z.string(),
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
  updatedAt: z.coerce.date().optional()
}).strict();
export const AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput>;
export const AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectZodSchema = makeSchema();
