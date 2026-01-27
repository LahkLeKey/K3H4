import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutAiInsightsInputObjectSchema as UserCreateWithoutAiInsightsInputObjectSchema } from './UserCreateWithoutAiInsightsInput.schema';
import { UserUncheckedCreateWithoutAiInsightsInputObjectSchema as UserUncheckedCreateWithoutAiInsightsInputObjectSchema } from './UserUncheckedCreateWithoutAiInsightsInput.schema';
import { UserCreateOrConnectWithoutAiInsightsInputObjectSchema as UserCreateOrConnectWithoutAiInsightsInputObjectSchema } from './UserCreateOrConnectWithoutAiInsightsInput.schema';
import { UserUpsertWithoutAiInsightsInputObjectSchema as UserUpsertWithoutAiInsightsInputObjectSchema } from './UserUpsertWithoutAiInsightsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutAiInsightsInputObjectSchema as UserUpdateToOneWithWhereWithoutAiInsightsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutAiInsightsInput.schema';
import { UserUpdateWithoutAiInsightsInputObjectSchema as UserUpdateWithoutAiInsightsInputObjectSchema } from './UserUpdateWithoutAiInsightsInput.schema';
import { UserUncheckedUpdateWithoutAiInsightsInputObjectSchema as UserUncheckedUpdateWithoutAiInsightsInputObjectSchema } from './UserUncheckedUpdateWithoutAiInsightsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAiInsightsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutAiInsightsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutAiInsightsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUpdateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAiInsightsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutAiInsightsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAiInsightsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutAiInsightsNestedInput>;
export const UserUpdateOneRequiredWithoutAiInsightsNestedInputObjectZodSchema = makeSchema();
