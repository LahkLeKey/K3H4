import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateOrConnectWithoutWarehouseItemsInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema).optional(),
  connect: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).optional()
}).strict();
export const FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateNestedOneWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateNestedOneWithoutWarehouseItemsInput>;
export const FreightLoadCreateNestedOneWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
