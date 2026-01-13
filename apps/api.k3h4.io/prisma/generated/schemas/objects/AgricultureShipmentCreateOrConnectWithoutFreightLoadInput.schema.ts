import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutFreightLoadInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema)])
}).strict();
export const AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateOrConnectWithoutFreightLoadInput>;
export const AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectZodSchema = makeSchema();
