import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoPoiCachesInputObjectSchema as UserUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUpdateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoPoiCachesInput.schema';
import { UserCreateWithoutGeoPoiCachesInputObjectSchema as UserCreateWithoutGeoPoiCachesInputObjectSchema } from './UserCreateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoPoiCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoPoiCachesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoPoiCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoPoiCachesInput>;
export const UserUpsertWithoutGeoPoiCachesInputObjectZodSchema = makeSchema();
