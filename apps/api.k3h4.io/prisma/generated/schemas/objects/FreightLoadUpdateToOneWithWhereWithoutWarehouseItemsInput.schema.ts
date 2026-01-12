import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema';
import { FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUpdateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)])
}).strict();
export const FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInput>;
export const FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
