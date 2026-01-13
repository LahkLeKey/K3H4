import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemCreateWithoutUserInputObjectSchema as WarehouseItemCreateWithoutUserInputObjectSchema } from './WarehouseItemCreateWithoutUserInput.schema';
import { WarehouseItemUncheckedCreateWithoutUserInputObjectSchema as WarehouseItemUncheckedCreateWithoutUserInputObjectSchema } from './WarehouseItemUncheckedCreateWithoutUserInput.schema';
import { WarehouseItemCreateOrConnectWithoutUserInputObjectSchema as WarehouseItemCreateOrConnectWithoutUserInputObjectSchema } from './WarehouseItemCreateOrConnectWithoutUserInput.schema';
import { WarehouseItemCreateManyUserInputEnvelopeObjectSchema as WarehouseItemCreateManyUserInputEnvelopeObjectSchema } from './WarehouseItemCreateManyUserInputEnvelope.schema';
import { WarehouseItemWhereUniqueInputObjectSchema as WarehouseItemWhereUniqueInputObjectSchema } from './WarehouseItemWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemCreateWithoutUserInputObjectSchema).array(), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => WarehouseItemCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => WarehouseItemCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => WarehouseItemCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema), z.lazy(() => WarehouseItemWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const WarehouseItemUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUncheckedCreateNestedManyWithoutUserInput>;
export const WarehouseItemUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
