import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureShipmentsInput.schema';
import { FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateNestedOneWithoutAgricultureShipmentsInput.schema';
import { AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateNestedManyWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema),
  freightLoad: z.lazy(() => FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema).optional(),
  inventoryMovements: z.lazy(() => AgricultureInventoryMovementCreateNestedManyWithoutShipmentInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCreateInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateInput>;
export const AgricultureShipmentCreateInputObjectZodSchema = makeSchema();
