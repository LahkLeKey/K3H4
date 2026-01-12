import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutFreightLoadInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutFreightLoadInput.schema';
import { AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema as AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInput.schema';
import { AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema as AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema } from './AgricultureShipmentCreateManyFreightLoadInputEnvelope.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema as AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInput.schema';
import { AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectSchema as AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectSchema } from './AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInput.schema';
import { AgricultureShipmentScalarWhereInputObjectSchema as AgricultureShipmentScalarWhereInputObjectSchema } from './AgricultureShipmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentCreateWithoutFreightLoadInputObjectSchema).array(), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutFreightLoadInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentCreateOrConnectWithoutFreightLoadInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUpsertWithWhereUniqueWithoutFreightLoadInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureShipmentCreateManyFreightLoadInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUpdateWithWhereUniqueWithoutFreightLoadInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectSchema), z.lazy(() => AgricultureShipmentUpdateManyWithWhereWithoutFreightLoadInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadNestedInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadNestedInput>;
export const AgricultureShipmentUncheckedUpdateManyWithoutFreightLoadNestedInputObjectZodSchema = makeSchema();
