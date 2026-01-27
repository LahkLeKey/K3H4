import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutAiInsightsInputObjectSchema as UserUpdateWithoutAiInsightsInputObjectSchema } from './UserUpdateWithoutAiInsightsInput.schema';
import { UserUncheckedUpdateWithoutAiInsightsInputObjectSchema as UserUncheckedUpdateWithoutAiInsightsInputObjectSchema } from './UserUncheckedUpdateWithoutAiInsightsInput.schema';
import { UserCreateWithoutAiInsightsInputObjectSchema as UserCreateWithoutAiInsightsInputObjectSchema } from './UserCreateWithoutAiInsightsInput.schema';
import { UserUncheckedCreateWithoutAiInsightsInputObjectSchema as UserUncheckedCreateWithoutAiInsightsInputObjectSchema } from './UserUncheckedCreateWithoutAiInsightsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAiInsightsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutAiInsightsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutAiInsightsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutAiInsightsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutAiInsightsInput>;
export const UserUpsertWithoutAiInsightsInputObjectZodSchema = makeSchema();
