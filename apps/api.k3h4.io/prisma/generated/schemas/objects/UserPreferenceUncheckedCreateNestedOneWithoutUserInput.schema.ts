import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserPreferenceCreateWithoutUserInputObjectSchema as UserPreferenceCreateWithoutUserInputObjectSchema } from './UserPreferenceCreateWithoutUserInput.schema';
import { UserPreferenceUncheckedCreateWithoutUserInputObjectSchema as UserPreferenceUncheckedCreateWithoutUserInputObjectSchema } from './UserPreferenceUncheckedCreateWithoutUserInput.schema';
import { UserPreferenceCreateOrConnectWithoutUserInputObjectSchema as UserPreferenceCreateOrConnectWithoutUserInputObjectSchema } from './UserPreferenceCreateOrConnectWithoutUserInput.schema';
import { UserPreferenceWhereUniqueInputObjectSchema as UserPreferenceWhereUniqueInputObjectSchema } from './UserPreferenceWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserPreferenceCreateWithoutUserInputObjectSchema), z.lazy(() => UserPreferenceUncheckedCreateWithoutUserInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserPreferenceCreateOrConnectWithoutUserInputObjectSchema).optional(),
  connect: z.lazy(() => UserPreferenceWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectSchema: z.ZodType<Prisma.UserPreferenceUncheckedCreateNestedOneWithoutUserInput> = makeSchema() as unknown as z.ZodType<Prisma.UserPreferenceUncheckedCreateNestedOneWithoutUserInput>;
export const UserPreferenceUncheckedCreateNestedOneWithoutUserInputObjectZodSchema = makeSchema();
