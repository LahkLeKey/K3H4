import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerCacheEntriesInput.schema';
import { UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema as UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema } from './UserCreateOrConnectWithoutMaptilerCacheEntriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMaptilerCacheEntriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutMaptilerCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMaptilerCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMaptilerCacheEntriesInput>;
export const UserCreateNestedOneWithoutMaptilerCacheEntriesInputObjectZodSchema = makeSchema();
