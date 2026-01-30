import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './UserPreferenceWhereUniqueInput.schema';
import { UserPreferenceCreateWithoutUserInputObjectSchema as UserPreferenceCreateWithoutUserInputObjectSchema } from './UserPreferenceCreateWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateWithoutUserInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserPreferenceWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserPreferenceCreateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedCreateWithoutUserInputObjectSchema)])
}).strict();
export const UserPreferenceCreateOrConnectWithoutUserInputObjectSchema: z.ZodType<Prisma.UserPreferenceCreateOrConnectWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceCreateOrConnectWithoutUserInput>;
export const UserPreferenceCreateOrConnectWithoutUserInputObjectZodSchema = makeSchema();
