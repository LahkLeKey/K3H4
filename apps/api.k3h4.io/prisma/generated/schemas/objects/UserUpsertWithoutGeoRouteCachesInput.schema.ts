import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoRouteCachesInputObjectSchema as UserUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUpdateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoRouteCachesInput.schema';
import { UserCreateWithoutGeoRouteCachesInputObjectSchema as UserCreateWithoutGeoRouteCachesInputObjectSchema } from './UserCreateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoRouteCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoRouteCachesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoRouteCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoRouteCachesInput>;
export const UserUpsertWithoutGeoRouteCachesInputObjectZodSchema = makeSchema();
