import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUpdateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOsrmCacheEntriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInput>;
export const UserUpdateToOneWithWhereWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
