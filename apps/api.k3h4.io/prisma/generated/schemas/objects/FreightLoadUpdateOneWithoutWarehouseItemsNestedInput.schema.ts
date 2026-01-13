import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateOrConnectWithoutWarehouseItemsInput.schema';
import { FreightLoadUpsertWithoutWarehouseItemsInputObjectSchema as FreightLoadUpsertWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUpsertWithoutWarehouseItemsInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema as FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInput.schema';
import { FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUpdateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema).optional(),
  upsert: z.lazy(() => FreightLoadUpsertWithoutWarehouseItemsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => FreightLoadWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => FreightLoadWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => FreightLoadUpdateToOneWithWhereWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUpdateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutWarehouseItemsInputObjectSchema)]).optional()
}).strict();
export const FreightLoadUpdateOneWithoutWarehouseItemsNestedInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateOneWithoutWarehouseItemsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateOneWithoutWarehouseItemsNestedInput>;
export const FreightLoadUpdateOneWithoutWarehouseItemsNestedInputObjectZodSchema = makeSchema();
