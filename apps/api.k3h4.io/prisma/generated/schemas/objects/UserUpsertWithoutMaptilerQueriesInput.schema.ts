import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutMaptilerQueriesInputObjectSchema as UserUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUpdateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerQueriesInput.schema';
import { UserCreateWithoutMaptilerQueriesInputObjectSchema as UserCreateWithoutMaptilerQueriesInputObjectSchema } from './UserCreateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMaptilerQueriesInput>;
export const UserUpsertWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
