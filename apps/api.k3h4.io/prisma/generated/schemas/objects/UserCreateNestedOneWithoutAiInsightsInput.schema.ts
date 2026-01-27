import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAiInsightsInputObjectSchema as UserCreateWithoutAiInsightsInputObjectSchema } from './UserCreateWithoutAiInsightsInput.schema';
import { UserUncheckedCreateWithoutAiInsightsInputObjectSchema as UserUncheckedCreateWithoutAiInsightsInputObjectSchema } from './UserUncheckedCreateWithoutAiInsightsInput.schema';
import { UserCreateOrConnectWithoutAiInsightsInputObjectSchema as UserCreateOrConnectWithoutAiInsightsInputObjectSchema } from './UserCreateOrConnectWithoutAiInsightsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAiInsightsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAiInsightsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutAiInsightsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAiInsightsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutAiInsightsInput>;
export const UserCreateNestedOneWithoutAiInsightsInputObjectZodSchema = makeSchema();
