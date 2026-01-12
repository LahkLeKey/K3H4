import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutCulinaryPrepTasksInputObjectSchema as UserCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryPrepTasksInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutCulinaryPrepTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutCulinaryPrepTasksInput>;
export const UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectZodSchema = makeSchema();
