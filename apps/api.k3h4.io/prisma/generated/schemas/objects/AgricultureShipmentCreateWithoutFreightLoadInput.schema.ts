import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureShipmentsInput.schema';
import { AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateNestedManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateWithoutFreightLoadInput>;
export const AgricultureShipmentCreateWithoutFreightLoadInputObjectZodSchema = makeSchema();
