import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedCreateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema as FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadCreateOrConnectWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUpsertWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUpsertWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUpsertWithoutAgricultureShipmentsInput.schema';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema';
import { FreightLoadWhereUniqueInputObjectSchema as FreightLoadWhereUniqueInputObjectSchema } from './FreightLoadWhereUniqueInput.schema';
import { FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUpdateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => FreightLoadCreateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedCreateWithoutAgricultureShipmentsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => FreightLoadCreateOrConnectWithoutAgricultureShipmentsInputObjectSchema).optional(),
  upsert: z.lazy(() => FreightLoadUpsertWithoutAgricultureShipmentsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => FreightLoadWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => FreightLoadWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => FreightLoadWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)]).optional()
}).strict();
export const FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInput>;
export const FreightLoadUpdateOneWithoutAgricultureShipmentsNestedInputObjectZodSchema = makeSchema();
