import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutUserInput.schema';
import { AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyUserInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyUserInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementCreateNestedManyWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateNestedManyWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateNestedManyWithoutUserInput>;
export const AgricultureInventoryMovementCreateNestedManyWithoutUserInputObjectZodSchema = makeSchema();
