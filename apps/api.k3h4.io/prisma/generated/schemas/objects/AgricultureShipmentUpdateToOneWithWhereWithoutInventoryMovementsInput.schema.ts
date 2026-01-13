import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereInputObjectSchema as AgricultureShipmentWhereInputObjectSchema } from './AgricultureShipmentWhereInput.schema';
import { AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUpdateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutInventoryMovementsInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInput>;
export const AgricultureShipmentUpdateToOneWithWhereWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
