import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadCreateWithoutWarehouseItemsInput.schema';
import { FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema as FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutWarehouseItemsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutWarehouseItemsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutWarehouseItemsInputObjectSchema)])
}).strict();
export const FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutWarehouseItemsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutWarehouseItemsInput>;
export const FreightLoadCreateOrConnectWithoutWarehouseItemsInputObjectZodSchema = makeSchema();
