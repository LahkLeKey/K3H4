import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutOsrmCacheEntriesInputObjectSchema as UserCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutOsrmCacheEntriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutOsrmCacheEntriesInput>;
export const UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
