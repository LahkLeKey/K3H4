import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureInventoryWhereUniqueInputObjectSchema as AgricultureInventoryWhereUniqueInputObjectSchema } from './AgricultureInventoryWhereUniqueInput.schema';
import { AgricultureInventoryCreateWithoutUserInputObjectSchema as AgricultureInventoryCreateWithoutUserInputObjectSchema } from './AgricultureInventoryCreateWithoutUserInput.schema';
import { AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema as AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureInventoryUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureInventoryWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureInventoryCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureInventoryUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureInventoryCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureInventoryCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureInventoryCreateOrConnectWithoutUserInput>;
export const AgricultureInventoryCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
