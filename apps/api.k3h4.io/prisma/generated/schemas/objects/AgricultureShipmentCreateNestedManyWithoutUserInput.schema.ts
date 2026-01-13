import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureShipmentCreateWithoutUserInputObjectSchema as AgricultureShipmentCreateWithoutUserInputObjectSchema } from './AgricultureShipmentCreateWithoutUserInput.schema';
import { AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema as AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureShipmentUncheckedCreateWithoutUserInput.schema';
import { AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema as AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureShipmentCreateOrConnectWithoutUserInput.schema';
import { AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema as AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema } from './AgricultureShipmentCreateManyUserInputEnvelope.schema';
import { AgricultureShipmentWhereUniqueInputObjectSchema as AgricultureShipmentWhereUniqueInputObjectSchema } from './AgricultureShipmentWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureShipmentCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureShipmentCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema), z.lazy(() => AgricultureShipmentWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureShipmentCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureShipmentCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureShipmentCreateNestedManyWithoutUserInput>;
export const AgricultureShipmentCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
