import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateWithoutFreightLoadInputObjectSchema as WarehouseItemCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateWithoutFreightLoadInput.schema';
import { WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutFreightLoadInput.schema';
import { WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema as WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema } from './WarehouseItemCreateOrConnectWithoutFreightLoadInput.schema';
import { WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema as WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema } from './WarehouseItemCreateManyFreightLoadInputEnvelope.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemCreateWithoutFreightLoadInputObjectSchema).array(), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutFreightLoadInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema), z.lazy(() => WarehouseItemCreateOrConnectWithoutFreightLoadInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WarehouseItemCreateManyFreightLoadInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WarehouseItemUncheckedCreateNestedManyWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedCreateNestedManyWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedCreateNestedManyWithoutFreightLoadInput>;
export const WarehouseItemUncheckedCreateNestedManyWithoutFreightLoadInputObjectZodSchema = makeSchema();
