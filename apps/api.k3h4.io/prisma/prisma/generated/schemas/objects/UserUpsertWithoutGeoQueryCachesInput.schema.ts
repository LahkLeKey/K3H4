import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoQueryCachesInputObjectSchema as UserUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUpdateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoQueryCachesInput.schema';
import { UserCreateWithoutGeoQueryCachesInputObjectSchema as UserCreateWithoutGeoQueryCachesInputObjectSchema } from './UserCreateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoQueryCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoQueryCachesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoQueryCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoQueryCachesInput>;
export const UserUpsertWithoutGeoQueryCachesInputObjectZodSchema = makeSchema();
