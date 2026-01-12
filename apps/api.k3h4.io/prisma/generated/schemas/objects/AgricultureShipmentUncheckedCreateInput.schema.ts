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
  freightLoadId: z.string().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUncheckedCreateInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedCreateInput>;
export const AgricultureShipmentUncheckedCreateInputObjectZodSchema = makeSchema();
