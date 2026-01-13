import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)])
}).strict();
export const FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadCreateOrConnectWithoutAgricultureShipmentsInput>;
export const FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
