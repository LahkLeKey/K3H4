import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateWithoutFreightLoadInputObjectSchema as WarehouseItemCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutFreightLoadInput.schema';
import { WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema as WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateOrConnectWithoutFreightLoadInput.schema';
import { WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema as WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema } from './WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInput.schema';
import { WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema as WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema } from './WarehouseItemCreateManyFreightLoadInputEnvelope.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema';
import { WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema as WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema } from './WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInput.schema';
import { WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectSchema as WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectSchema } from './WarehouseItemUpdateManyWithWhereWithoutFreightLoadInput.schema';
import { WarehouseItemScalarWhereInputObjectSchema as WarehouseItemScalarWhereInputObjectSchema } from './WarehouseItemScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema).array(), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => WarehouseItemScalarWhereInputObjectSchema), z.lazy(() => WarehouseItemScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const WarehouseItemUpdateManyWithoutFreightLoadNestedInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateManyWithoutFreightLoadNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateManyWithoutFreightLoadNestedInput>;
export const WarehouseItemUpdateManyWithoutFreightLoadNestedInputObjectZodSchema = makeSchema();
