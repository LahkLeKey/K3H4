import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './UserCreateNestedOneWithoutAgricultureShipmentsInput.schema';
import { FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateNestedOneWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  id: z.string().optional(),
  lot: z.string(),
  destination: z.string(),
  mode: z.string(),
  eta: z.coerce.date().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  user: z.lazy(() => UserCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema),
  freightLoad: z.lazy(() => FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateWithoutInventoryMovementsInput>;
export const AgricultureShipmentCreateWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
