import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentCreateWithoutInventoryMovementsInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutInventoryMovementsInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutInventoryMovementsInputObjectSchema)])
}).strict();
export const AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInput>;
export const AgricultureShipmentCreateOrConnectWithoutInventoryMovementsInputObjectZodSchema = makeSchema();
