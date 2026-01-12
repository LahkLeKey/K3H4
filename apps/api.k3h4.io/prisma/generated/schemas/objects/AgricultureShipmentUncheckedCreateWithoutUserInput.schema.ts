import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedCreateWithoutUserInput>;
export const AgricultureShipmentUncheckedCreateWithoutUserInputObjectZodSchema = makeSchema();
