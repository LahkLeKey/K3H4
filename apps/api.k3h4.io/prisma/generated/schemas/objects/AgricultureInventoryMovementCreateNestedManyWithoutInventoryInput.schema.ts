import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateOrConnectWithoutInventoryInput.schema';
import { AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema as AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema } from './AgricultureInventoryMovementCreateManyInventoryInputEnvelope.schema';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema).array(), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema).array()]).optional(),
  connectOrCreate: z.union([z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema).array()]).optional(),
  createMany: z.lazy(() => AgricultureInventoryMovementCreateManyInventoryInputEnvelopeObjectSchema).optional(),
  connect: z.union([z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema), z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema).array()]).optional()
}).strict();
export const AgricultureInventoryMovementCreateNestedManyWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateNestedManyWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateNestedManyWithoutInventoryInput>;
export const AgricultureInventoryMovementCreateNestedManyWithoutInventoryInputObjectZodSchema = makeSchema();
