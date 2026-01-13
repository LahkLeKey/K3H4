import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedCreateOrConnectWithoutUserInput>;
export const CulinarySupplierNeedCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
