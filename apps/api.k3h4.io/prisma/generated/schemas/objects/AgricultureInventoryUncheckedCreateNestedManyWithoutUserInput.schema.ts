import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryCreateWithoutUserInputObjectSchema as AgricultureInventoryCreateWithoutUserInputObjectSchema } from './AgricultureInventoryCreateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutUserInput.schema';
import { AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema as AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureInventoryCreateOrConnectWithoutUserInput.schema';
import { AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema as AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema } from './AgricultureInventoryCreateManyUserInputEnvelope.schema';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryUncheckedCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryUncheckedCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryUncheckedCreateNestedManyWithoutUserInput>;
export const AgricultureInventoryUncheckedCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
