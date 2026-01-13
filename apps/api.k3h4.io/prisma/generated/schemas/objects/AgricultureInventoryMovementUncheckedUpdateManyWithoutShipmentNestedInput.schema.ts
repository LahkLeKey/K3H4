import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutShipmentInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInput.schema';
import { AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyShipmentInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInput.schema';
import { AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectSchema as AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectSchema } from './AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInput.schema';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutShipmentInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutShipmentInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutShipmentInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutShipmentInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyShipmentInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutShipmentInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutShipmentInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInput>;
export const AgricultureInventoryMovementUncheckedUpdateManyWithoutShipmentNestedInputObjectZodSchema = makeSchema();
