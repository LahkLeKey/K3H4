import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskCreateWithoutUserInputObjectSchema as AgricultureTaskCreateWithoutUserInputObjectSchema } from './AgricultureTaskCreateWithoutUserInput.schema';
import { AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema as AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutUserInput.schema';
import { AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema as AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureTaskCreateOrConnectWithoutUserInput.schema';
import { AgricultureTaskCreateManyUserInputEnvelopeObjectSchema as AgricultureTaskCreateManyUserInputEnvelopeObjectSchema } from './AgricultureTaskCreateManyUserInputEnvelope.schema';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureTaskCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema), z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureTaskUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskUncheckedCreateNestedManyWithoutUserInput>;
export const AgricultureTaskUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
