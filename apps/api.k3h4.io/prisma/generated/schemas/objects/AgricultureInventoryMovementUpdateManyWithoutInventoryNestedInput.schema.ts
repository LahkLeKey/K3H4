import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInput.schema';
import { AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyInventoryInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInput.schema';
import { AgricultureInventoryMovementScalarWhereInputObjectSchema as AgricultureInventoryMovementScalarWhereInputObjectSchema } from './AgricultureInventoryMovementScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpsertWithWhereUniqueWithoutInventoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateWithWhereUniqueWithoutInventoryInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUpdateManyWithWhereWithoutInventoryInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryMovementScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementUpdateManyWithoutInventoryNestedInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithoutInventoryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementUpdateManyWithoutInventoryNestedInput>;
export const AgricultureInventoryMovementUpdateManyWithoutInventoryNestedInputObjectZodSchema = makeSchema();
