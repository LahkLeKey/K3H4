import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutUserInput.schema';
import { AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyUserInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithoutUserNestedInput>;
export const AgricultureInventoryMovementUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
