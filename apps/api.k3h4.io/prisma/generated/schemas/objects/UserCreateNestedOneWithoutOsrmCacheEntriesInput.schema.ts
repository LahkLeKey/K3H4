import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOsrmCacheEntriesInputObjectSchema as UserCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateWithoutOsrmCacheEntriesInput.schema';
import { UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema as UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema } from './UserUncheckedCreateWithoutOsrmCacheEntriesInput.schema';
import { UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema as UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema } from './UserCreateOrConnectWithoutOsrmCacheEntriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOsrmCacheEntriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOsrmCacheEntriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOsrmCacheEntriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutOsrmCacheEntriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOsrmCacheEntriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutOsrmCacheEntriesInput>;
export const UserCreateNestedOneWithoutOsrmCacheEntriesInputObjectZodSchema = makeSchema();
