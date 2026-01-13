import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutShipmentInput>;
export const AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectZodSchema = makeSchema();
