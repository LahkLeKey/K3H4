import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUpdateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutWarehouseItemsInput.schema';
import { FreightLoadCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)]),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]),
  where: z.lazy(() => FreightLoadWhereInputObjectSchema).optional()
}).strict();
export const FreightLoadUpsertWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.FreightLoadUpsertWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpsertWithoutWarehouseItemsInput>;
export const FreightLoadUpsertWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
