import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUpdateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  data: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInput>;
export const AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectZodSchema = makeSchema();
