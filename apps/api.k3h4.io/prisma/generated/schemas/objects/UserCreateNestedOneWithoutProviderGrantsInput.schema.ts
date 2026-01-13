import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutProviderGrantsInputObjectSchema as UserCreateWithoutProviderGrantsInputObjectSchema } from './UserCreateWithoutProviderGrantsInput.schema';
import { UserUncheckedCreateWithoutProviderGrantsInputObjectSchema as UserUncheckedCreateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedCreateWithoutProviderGrantsInput.schema';
import { UserCreateOrConnectWithoutProviderGrantsInputObjectSchema as UserCreateOrConnectWithoutProviderGrantsInputObjectSchema } from './UserCreateOrConnectWithoutProviderGrantsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProviderGrantsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutProviderGrantsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutProviderGrantsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutProviderGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutProviderGrantsInput>;
export const UserCreateNestedOneWithoutProviderGrantsInputObjectZodSchema = makeSchema();
