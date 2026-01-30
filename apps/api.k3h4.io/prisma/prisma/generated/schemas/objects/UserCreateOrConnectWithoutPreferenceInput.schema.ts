import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPreferenceInputObjectSchema as UserCreateWithoutPreferenceInputObjectSchema } from './UserCreateWithoutPreferenceInput.schema';
import { UserUncheckedCreateWithoutPreferenceInputObjectSchema as UserUncheckedCreateWithoutPreferenceInputObjectSchema } from './UserUncheckedCreateWithoutPreferenceInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPreferenceInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPreferenceInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPreferenceInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPreferenceInput>;
export const UserCreateOrConnectWithoutPreferenceInputObjectZodSchema = makeSchema();
