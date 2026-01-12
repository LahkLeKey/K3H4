import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutProviderGrantsInputObjectSchema as UserCreateWithoutProviderGrantsInputObjectSchema } from './UserCreateWithoutProviderGrantsInput.schema';
import { UserUncheckedCreateWithoutProviderGrantsInputObjectSchema as UserUncheckedCreateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedCreateWithoutProviderGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutProviderGrantsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutProviderGrantsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutProviderGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutProviderGrantsInput>;
export const UserCreateOrConnectWithoutProviderGrantsInputObjectZodSchema = makeSchema();
