import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUpdateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema)]),
  where: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional()
}).strict();
export const AgricultureShipmentUpsertWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpsertWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpsertWithoutInventoryMovementsInput>;
export const AgricultureShipmentUpsertWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
