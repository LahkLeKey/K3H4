import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOsrmCacheEntriesInputObjectSchema as UserCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema as UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateOrConnectWithoutOsrmCacheEntriesInput.schema';
import { UserUpsertWithoutOsrmCacheEntriesInputObjectSchema as UserUpsertWithoutOsrmCacheEntriesInputObjectSchema } from './UserUpsertWithoutOsrmCacheEntriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema as UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInput.schema';
import { UserUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUpdateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutOsrmCacheEntriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutOsrmCacheEntriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutOsrmCacheEntriesNestedInput>;
export const UserUpdateOneWithoutOsrmCacheEntriesNestedInputObjectZodSchema = makeSchema();
