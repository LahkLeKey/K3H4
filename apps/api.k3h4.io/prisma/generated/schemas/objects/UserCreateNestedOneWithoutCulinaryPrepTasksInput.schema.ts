import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutCulinaryPrepTasksInputObjectSchema as UserCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateWithoutCulinaryPrepTasksInput.schema';
import { UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema as UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema } from './UserUncheckedCreateWithoutCulinaryPrepTasksInput.schema';
import { UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema as UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema } from './UserCreateOrConnectWithoutCulinaryPrepTasksInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutCulinaryPrepTasksInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutCulinaryPrepTasksInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutCulinaryPrepTasksInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutCulinaryPrepTasksInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutCulinaryPrepTasksInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutCulinaryPrepTasksInput>;
export const UserCreateNestedOneWithoutCulinaryPrepTasksInputObjectZodSchema = makeSchema();
