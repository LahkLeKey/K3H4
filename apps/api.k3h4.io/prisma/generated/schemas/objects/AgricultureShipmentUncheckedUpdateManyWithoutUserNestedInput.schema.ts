import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutUserInputObjectSchema as AgricultureShipmentCreateWithoutUserInputObjectSchema } from './AgricultureShipmentCreateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutUserInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutUserInput.schema';
import { AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectSchema as AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureShipmentUpsertWithWhereUniqueWithoutUserInput.schema';
import { AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema as AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema } from './AgricultureShipmentCreateManyUserInputEnvelope.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema';
import { AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectSchema as AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectSchema } from './AgricultureShipmentUpdateWithWhereUniqueWithoutUserInput.schema';
import { AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectSchema as AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectSchema } from './AgricultureShipmentUpdateManyWithWhereWithoutUserInput.schema';
import { AgricultureShipmentScalarWhereInputObjectSchema as AgricultureShipmentScalarWhereInputObjectSchema } from './AgricultureShipmentScalarWhereInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  upsert: z.union([z.lazy(() => AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUpsertWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema).optional(),
  set: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  disconnect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  delete: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  connect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional(),
  update: z.union([z.lazy(() => AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUpdateWithWhereUniqueWithoutUserInputObjectSchema).array()]).optional(),
  updateMany: z.union([z.lazy(() => AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUpdateManyWithWhereWithoutUserInputObjectSchema).array()]).optional(),
  deleteMany: z.union([z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema), z.lazy(() => AgricultureShipmentScalarWhereInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInput>;
export const AgricultureShipmentUncheckedUpdateManyWithoutUserNestedInputObjectZodSchema = makeSchema();
