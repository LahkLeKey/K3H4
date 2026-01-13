import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  userId: z.string(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutFreightLoadInput>;
export const AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectZodSchema = makeSchema();
