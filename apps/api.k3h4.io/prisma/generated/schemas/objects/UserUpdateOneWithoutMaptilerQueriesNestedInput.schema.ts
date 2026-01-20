import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMaptilerQueriesInputObjectSchema as UserCreateWithoutMaptilerQueriesInputObjectSchema } from './UserCreateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema as UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema } from './UserCreateOrConnectWithoutMaptilerQueriesInput.schema';
import { UserUpsertWithoutMaptilerQueriesInputObjectSchema as UserUpsertWithoutMaptilerQueriesInputObjectSchema } from './UserUpsertWithoutMaptilerQueriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema as UserUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMaptilerQueriesInput.schema';
import { UserUpdateWithoutMaptilerQueriesInputObjectSchema as UserUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUpdateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMaptilerQueriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutMaptilerQueriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutMaptilerQueriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutMaptilerQueriesNestedInput>;
export const UserUpdateOneWithoutMaptilerQueriesNestedInputObjectZodSchema = makeSchema();
