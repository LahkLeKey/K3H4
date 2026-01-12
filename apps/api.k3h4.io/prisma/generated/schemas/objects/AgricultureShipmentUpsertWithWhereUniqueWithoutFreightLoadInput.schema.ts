import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUpdateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedUpdateWithoutFreightLoadInput.schema';
import { AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  update: z.union([z.lazy(() => AgricultureShipmentUpdateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedUpdateWithoutFreightLoadInputObjectSchema)]),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInput>;
export const AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectZodSchema = makeSchema();
