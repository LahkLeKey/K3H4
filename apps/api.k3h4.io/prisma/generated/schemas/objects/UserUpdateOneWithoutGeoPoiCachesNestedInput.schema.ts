import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoPoiCachesInputObjectSchema as UserCreateWithoutGeoPoiCachesInputObjectSchema } from './UserCreateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoPoiCachesInput.schema';
import { UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema as UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoPoiCachesInput.schema';
import { UserUpsertWithoutGeoPoiCachesInputObjectSchema as UserUpsertWithoutGeoPoiCachesInputObjectSchema } from './UserUpsertWithoutGeoPoiCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoPoiCachesInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoPoiCachesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoPoiCachesInput.schema';
import { UserUpdateWithoutGeoPoiCachesInputObjectSchema as UserUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUpdateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoPoiCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoPoiCachesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoPoiCachesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoPoiCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoPoiCachesNestedInput>;
export const UserUpdateOneWithoutGeoPoiCachesNestedInputObjectZodSchema = makeSchema();
