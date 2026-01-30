import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPreferenceInputObjectSchema as UserCreateWithoutPreferenceInputObjectSchema } from './UserCreateWithoutPreferenceInput.schema';
import { UserUncheckedCreateWithoutPreferenceInputObjectSchema as UserUncheckedCreateWithoutPreferenceInputObjectSchema } from './UserUncheckedCreateWithoutPreferenceInput.schema';
import { UserCreateOrConnectWithoutPreferenceInputObjectSchema as UserCreateOrConnectWithoutPreferenceInputObjectSchema } from './UserCreateOrConnectWithoutPreferenceInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPreferenceInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPreferenceInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPreferenceInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPreferenceInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPreferenceInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPreferenceInput>;
export const UserCreateNestedOneWithoutPreferenceInputObjectZodSchema = makeSchema();
