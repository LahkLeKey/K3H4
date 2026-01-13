import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { WarehouseItemScalarWhereInputObjectSchema as WarehouseItemScalarWhereInputObjectSchema } from './WarehouseItemScalarWhereInput.schema';
import { WarehouseItemUpdateManyMutationInputObjectSchema as WarehouseItemUpdateManyMutationInputObjectSchema } from './WarehouseItemUpdateManyMutationInput.schema';
import { WarehouseItemUncheckedUpdateManyWithoutFreightLoadInputObjectSchema as WarehouseItemUncheckedUpdateManyWithoutFreightLoadInputObjectSchema } from './WarehouseItemUncheckedUpdateManyWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => WarehouseItemScalarWhereInputObjectSchema),
  data: z.union([z.lazy(() => WarehouseItemUpdateManyMutationInputObjectSchema), z.lazy(() => WarehouseItemUncheckedUpdateManyWithoutFreightLoadInputObjectSchema)])
}).strict();
export const WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.WarehouseItemUpdateManyWithWhereWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.WarehouseItemUpdateManyWithWhereWithoutFreightLoadInput>;
export const WarehouseItemUpdateManyWithWhereWithoutFreightLoadInputObjectZodSchema = makeSchema();
