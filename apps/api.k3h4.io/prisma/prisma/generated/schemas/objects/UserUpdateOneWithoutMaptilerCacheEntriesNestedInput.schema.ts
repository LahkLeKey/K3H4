import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateOrConnectWithoutMaptilerCacheEntriesInput.schema';
import { UserUpsertWithoutMaptilerCacheEntriesInputObjectSchema as UserUpsertWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUpsertWithoutMaptilerCacheEntriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema as UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput.schema';
import { UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUpdateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutMaptilerCacheEntriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutMaptilerCacheEntriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutMaptilerCacheEntriesNestedInput>;
export const UserUpdateOneWithoutMaptilerCacheEntriesNestedInputObjectZodSchema = makeSchema();
