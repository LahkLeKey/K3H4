import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryMovementWhereUniqueInputObjectSchema as AgricultureInventoryMovementWhereUniqueInputObjectSchema } from './AgricultureInventoryMovementWhereUniqueInput.schema';
import { AgricultureInventoryMovementCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementCreateWithoutUserInput.schema';
import { AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryMovementUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryMovementWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureInventoryMovementCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryMovementUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryMovementCreateOrConnectWithoutUserInput>;
export const AgricultureInventoryMovementCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
