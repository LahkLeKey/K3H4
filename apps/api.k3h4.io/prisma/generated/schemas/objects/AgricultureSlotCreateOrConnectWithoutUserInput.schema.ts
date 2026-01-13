import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureSlotWhereUniqueInputObjectSchema as AgricultureSlotWhereUniqueInputObjectSchema } from './AgricultureSlotWhereUniqueInput.schema';
import { AgricultureSlotCreateWithoutUserInputObjectSchema as AgricultureSlotCreateWithoutUserInputObjectSchema } from './AgricultureSlotCreateWithoutUserInput.schema';
import { AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema as AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureSlotUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureSlotWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureSlotCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureSlotUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureSlotCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureSlotCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureSlotCreateOrConnectWithoutUserInput>;
export const AgricultureSlotCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
