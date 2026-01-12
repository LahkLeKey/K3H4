import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateNestedOneWithoutAgricultureShipmentsInput.schema';
import { AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateNestedManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  freightLoad: z.lazy(() => FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCreateWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateWithoutUserInput>;
export const AgricultureShipmentCreateWithoutUserInputObjectZodSchema = makeSchema();
