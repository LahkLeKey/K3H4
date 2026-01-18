import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUpdateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutOsrmCacheEntriesInput.schema';
import { UserCreateWithoutOsrmCacheEntriesInputObjectSchema as UserCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutOsrmCacheEntriesInput>;
export const UserUpsertWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
