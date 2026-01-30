import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutAiInsightsInputObjectSchema as UserUpdateWithoutAiInsightsInputObjectSchema } from './UserUpdateWithoutAiInsightsInput.schema';
import { UserUncheckedUpdateWithoutAiInsightsInputObjectSchema as UserUncheckedUpdateWithoutAiInsightsInputObjectSchema } from './UserUncheckedUpdateWithoutAiInsightsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutAiInsightsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutAiInsightsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutAiInsightsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAiInsightsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAiInsightsInput>;
export const UserUpdateToOneWithWhereWithoutAiInsightsInputObjectZodSchema = makeSchema();
