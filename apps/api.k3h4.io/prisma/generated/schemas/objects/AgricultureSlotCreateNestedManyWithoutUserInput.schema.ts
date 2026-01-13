import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotCreateWithoutUserInputObjectSchema as AgricultureSlotCreateWithoutUserInputObjectSchema } from './AgricultureSlotCreateWithoutUserInput.schema';
import { AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema as AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutUserInput.schema';
import { AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema as AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureSlotCreateOrConnectWithoutUserInput.schema';
import { AgricultureSlotCreateManyUserInputEnvelopeObjectSchema as AgricultureSlotCreateManyUserInputEnvelopeObjectSchema } from './AgricultureSlotCreateManyUserInputEnvelope.schema';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureSlotCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema), z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureSlotCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateNestedManyWithoutUserInput>;
export const AgricultureSlotCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
