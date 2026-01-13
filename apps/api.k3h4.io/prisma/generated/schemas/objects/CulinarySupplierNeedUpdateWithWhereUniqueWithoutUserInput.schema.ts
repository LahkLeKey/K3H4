import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedWhereUniqueInputObjectSchema as CulinarySupplierNeedWhereUniqueInputObjectSchema } from './CulinarySupplierNeedWhereUniqueInput.schema';
import { CulinarySupplierNeedUpdateWithoutUserInputObjectSchema as CulinarySupplierNeedUpdateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUpdateWithoutUserInput.schema';
import { CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedUpdateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinarySupplierNeedWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => CulinarySupplierNeedUpdateWithoutUserInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedUpdateWithoutUserInputObjectSchema)])
}).strict();
export const CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInput>;
export const CulinarySupplierNeedUpdateWithWhereUniqueWithoutUserInputObjectZodSchema = makeSchema();
