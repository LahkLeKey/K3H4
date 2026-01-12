import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInput>;
export const AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectZodSchema = makeSchema();
