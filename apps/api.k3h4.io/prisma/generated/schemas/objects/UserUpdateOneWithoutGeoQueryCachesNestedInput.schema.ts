import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoQueryCachesInputObjectSchema as UserCreateWithoutGeoQueryCachesInputObjectSchema } from './UserCreateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoQueryCachesInput.schema';
import { UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema as UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoQueryCachesInput.schema';
import { UserUpsertWithoutGeoQueryCachesInputObjectSchema as UserUpsertWithoutGeoQueryCachesInputObjectSchema } from './UserUpsertWithoutGeoQueryCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoQueryCachesInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoQueryCachesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoQueryCachesInput.schema';
import { UserUpdateWithoutGeoQueryCachesInputObjectSchema as UserUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUpdateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoQueryCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoQueryCachesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoQueryCachesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoQueryCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoQueryCachesNestedInput>;
export const UserUpdateOneWithoutGeoQueryCachesNestedInputObjectZodSchema = makeSchema();
