import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutAiInsightsInputObjectSchema as UserCreateWithoutAiInsightsInputObjectSchema } from './UserCreateWithoutAiInsightsInput.schema';
import { UserUncheckedCreateWithoutAiInsightsInputObjectSchema as UserUncheckedCreateWithoutAiInsightsInputObjectSchema } from './UserUncheckedCreateWithoutAiInsightsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAiInsightsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutAiInsightsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAiInsightsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutAiInsightsInput>;
export const UserCreateOrConnectWithoutAiInsightsInputObjectZodSchema = makeSchema();
