import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutInventoryInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutInventoryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutInventoryInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutInventoryInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutInventoryInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutInventoryInput>;
export const AgricultureInventoryMovementCreateOrConnectWithoutInventoryInputObjectZodSchema = makeSchema();
