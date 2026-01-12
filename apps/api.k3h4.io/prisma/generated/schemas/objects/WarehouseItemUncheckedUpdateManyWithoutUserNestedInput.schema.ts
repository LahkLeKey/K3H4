import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateWithoutUserInputObjectSchema as WarehouseItemCreateWithoutUserInputObjectSchema } from './WarehouseItemCreateWithoutUserInput.schema';
import { WarehouseItemUncheckedCreateWithoutUserInputObjectSchema as WarehouseItemUncheckedCreateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutUserInput.schema';
import { WarehouseItemCreateOrConnectWithoutUserInputObjectSchema as WarehouseItemCreateOrConnectWithoutUserInputObjectSchema } from './WarehouseItemCreateOrConnectWithoutUserInput.schema';
import { WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectSchema as WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './WarehouseItemUpsertWithWhereUniqueWithoutUserInput.schema';
import { WarehouseItemCreateManyUserInputEnvelopeObjectSchema as WarehouseItemCreateManyUserInputEnvelopeObjectSchema } from './WarehouseItemCreateManyUserInputEnvelope.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectSchema as WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './WarehouseItemUpdateWithWhereUniqueWithoutUserInput.schema';
import { WarehouseItemUpdateManyWithWhereWithoutUserInputObjectSchema as WarehouseItemUpdateManyWithWhereWithoutUserInputObjectSchema } from './WarehouseItemUpdateManyWithWhereWithoutUserInput.schema';
import { WarehouseItemScalarWhereInputObjectSchema as WarehouseItemScalarWhereInputObjectSchema } from './WarehouseItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema).array(), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WarehouseItemCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WarehouseItemCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WarehouseItemUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WarehouseItemScalarWhereInputObjectSchema), z.lazy(() => WarehouseItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WarehouseItemUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedUpdateManyWithoutUserNestedInput>;
export const WarehouseItemUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
