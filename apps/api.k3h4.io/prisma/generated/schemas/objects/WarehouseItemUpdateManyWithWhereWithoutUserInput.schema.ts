import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemScalarWhereInputObjectSchema as WarehouseItemScalarWhereInputObjectSchema } from './WarehouseItemScalarWhereInput.schema';
import { WarehouseItemUpdateManyMutationInputObjectSchema as WarehouseItemUpdateManyMutationInputObjectSchema } from './WarehouseItemUpdateManyMutationInput.schema';
import { WarehouseItemUncheckedUpdateManyWithoutUserInputObjectSchema as WarehouseItemUncheckedUpdateManyWithoutUserInputObjectSchema } from './WarehouseItemUncheckedUpdateManyWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => WarehouseItemUpdateManyMutationInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateManyWithoutUserInputObjectSchema)])
}).strict();
export const WarehouseItemUpdateManyWithWhereWithoutUserInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateManyWithWhereWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateManyWithWhereWithoutUserInput>;
export const WarehouseItemUpdateManyWithWhereWithoutUserInputObjectZodSchema = makeSchema();
