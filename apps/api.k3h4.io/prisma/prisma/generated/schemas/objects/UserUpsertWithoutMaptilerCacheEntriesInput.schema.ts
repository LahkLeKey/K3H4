import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUpdateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema';
import { UserCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutMaptilerCacheEntriesInput>;
export const UserUpsertWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
