import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutShipmentInput.schema';
import { AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyShipmentInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInput>;
export const AgricultureInventoryMovementUncheckedCreateNestedManyWithoutShipmentInputObjectZodSchema = makeSchema();
