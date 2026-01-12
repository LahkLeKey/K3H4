import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedUpdateWithoutUserInputObjectSchema as CulinarySupplierNeedUpdateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUpdateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedUpdateWithoutUserInput.schema';
import { CulinarySupplierNeedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedCreateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => CulinarySupplierNeedUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema)]),
  create: z.union([z.lazy(() => CulinarySupplierNeedCreateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInput>;
export const CulinarySupplierNeedUpsertWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
