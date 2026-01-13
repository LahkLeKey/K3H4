import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { FreightLoadWhereInputObjectSchema as FreightLoadWhereInputObjectSchema } from './FreightLoadWhereInput.schema';
import { FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUpdateWithoutAgricultureShipmentsInput.schema';
import { FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema as FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema } from './FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => FreightLoadWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => FreightLoadUpdateWithoutAgricultureShipmentsInputObjectSchema), z.lazy(() => FreightLoadUncheckedUpdateWithoutAgricultureShipmentsInputObjectSchema)])
}).strict();
export const FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectSchema: z.ZodType<Prisma.FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInput> = makeSchema() as unknown as z.ZodType<Prisma.FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInput>;
export const FreightLoadUpdateToOneWithWhereWithoutAgricultureShipmentsInputObjectZodSchema = makeSchema();
