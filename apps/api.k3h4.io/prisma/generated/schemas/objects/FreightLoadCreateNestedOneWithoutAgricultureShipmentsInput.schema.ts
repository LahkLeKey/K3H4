import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateOrConnectWithoutAgricultureShipmentsInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema).optional(),
  connect: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).optional()
}).strict();
export const FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateNestedOneWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateNestedOneWithoutAgricultureShipmentsInput>;
export const FreightLoadCreateNestedOneWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
