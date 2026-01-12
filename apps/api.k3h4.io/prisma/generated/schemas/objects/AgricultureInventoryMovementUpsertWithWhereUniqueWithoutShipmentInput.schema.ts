import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUpdateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedUpdateWithoutShipmentInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInput>;
export const AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectZodSchema = makeSchema();
