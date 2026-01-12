import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCreateWithoutUserInputObjectSchema as AgricultureInventoryCreateWithoutUserInputObjectSchema } from './AgricultureInventoryCreateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutUserInput.schema';
import { AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema as AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureInventoryCreateOrConnectWithoutUserInput.schema';
import { AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureInventoryUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema as AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema } from './AgricultureInventoryCreateManyUserInputEnvelope.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureInventoryUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureInventoryUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureInventoryScalarWhereInputObjectSchema as AgricultureInventoryScalarWhereInputObjectSchema } from './AgricultureInventoryScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema), z.lazy(() => AgricultureInventoryScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUpdateManyWithoutUserNestedInput>;
export const AgricultureInventoryUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
