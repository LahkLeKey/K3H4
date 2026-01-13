import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutFreightLoadInput.schema';
import { AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema as AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema } from './AgricultureShipmentCreateManyFreightLoadInputEnvelope.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema).array(), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureShipmentUncheckedCreateNestedManyWithoutFreightLoadInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedCreateNestedManyWithoutFreightLoadInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedCreateNestedManyWithoutFreightLoadInput>;
export const AgricultureShipmentUncheckedCreateNestedManyWithoutFreightLoadInputObjectZodSchema = makeSchema();
