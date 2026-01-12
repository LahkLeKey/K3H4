import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema as CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateOrConnectWithoutUserInput.schema';
import { CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectSchema as CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInput.schema';
import { CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema as CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema } from './CulinarySupplierNeedCreateManyUserInputEnvelope.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectSchema as CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInput.schema';
import { CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectSchema as CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectSchema } from './CulinarySupplierNeedUpdateManyWithWhereWithoutUserInput.schema';
import { CulinarySupplierNeedScalarWhereInputObjectSchema as CulinarySupplierNeedScalarWhereInputObjectSchema } from './CulinarySupplierNeedScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema), z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const CulinarySupplierNeedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateManyWithoutUserNestedInput>;
export const CulinarySupplierNeedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
