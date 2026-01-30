import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMaptilerCacheEntriesInput>;
export const UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
