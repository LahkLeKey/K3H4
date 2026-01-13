import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUpdateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)]),
  create: z.union([z.lazy(() => FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]),
  where: z.lazy(() => FreightLoadWhereInputObjectSchema).optional()
}).strict();
export const FreightLoadUpsertWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.FreightLoadUpsertWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpsertWithoutAgricultureShipmentsInput>;
export const FreightLoadUpsertWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
