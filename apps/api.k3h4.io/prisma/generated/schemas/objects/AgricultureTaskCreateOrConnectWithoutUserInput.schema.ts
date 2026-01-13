import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { AgricultureTaskWhereUniqueInputObjectSchema as AgricultureTaskWhereUniqueInputObjectSchema } from './AgricultureTaskWhereUniqueInput.schema';
import { AgricultureTaskCreateWithoutUserInputObjectSchema as AgricultureTaskCreateWithoutUserInputObjectSchema } from './AgricultureTaskCreateWithoutUserInput.schema';
import { AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema as AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema } from './AgricultureTaskUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => AgricultureTaskWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => AgricultureTaskCreateWithoutUserInputObjectSchema), z.lazy(() => AgricultureTaskUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const AgricultureTaskCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskCreateOrConnectWithoutUserInput>;
export const AgricultureTaskCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
