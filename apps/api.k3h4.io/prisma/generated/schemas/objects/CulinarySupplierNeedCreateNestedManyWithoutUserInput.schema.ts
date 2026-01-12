import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema as CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateOrConnectWithoutUserInput.schema';
import { CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema as CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema } from './CulinarySupplierNeedCreateManyUserInputEnvelope.schema';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './CulinarySupplierNeedWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema).array(), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => CulinarySupplierNeedCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema), z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateNestedManyWithoutUserInput>;
export const CulinarySupplierNeedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
