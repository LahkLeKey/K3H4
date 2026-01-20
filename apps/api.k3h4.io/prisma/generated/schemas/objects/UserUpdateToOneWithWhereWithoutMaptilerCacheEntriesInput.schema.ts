import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUpdateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerCacheEntriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInput>;
export const UserUpdateToOneWithWhereWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
