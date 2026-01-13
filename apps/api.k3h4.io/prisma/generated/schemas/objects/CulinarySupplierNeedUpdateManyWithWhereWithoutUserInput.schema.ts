import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { CulinarySupplierNeedScalarWhereInputObjectSchema as CulinarySupplierNeedScalarWhereInputObjectSchema } from './CulinarySupplierNeedScalarWhereInput.schema';
import { CulinarySupplierNeedUpdateManyMutationInputObjectSchema as CulinarySupplierNeedUpdateManyMutationInputObjectSchema } from './CulinarySupplierNeedUpdateManyMutationInput.schema';
import { CulinarySupplierNeedUncheckedUpdateManyWithoutUserInputObjectSchema as CulinarySupplierNeedUncheckedUpdateManyWithoutUserInputObjectSchema } from './CulinarySupplierNeedUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => CulinarySupplierNeedScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => CulinarySupplierNeedUpdateManyMutationInputObjectSchema), z.lazy(() => CulinarySupplierNeedUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.CulinarySupplierNeedUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.CulinarySupplierNeedUpdateManyWithWhereWithoutUserInput>;
export const CulinarySupplierNeedUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
