import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoRouteCachesInputObjectSchema as UserCreateWithoutGeoRouteCachesInputObjectSchema } from './UserCreateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoRouteCachesInput.schema';
import { UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema as UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoRouteCachesInput.schema';
import { UserUpsertWithoutGeoRouteCachesInputObjectSchema as UserUpsertWithoutGeoRouteCachesInputObjectSchema } from './UserUpsertWithoutGeoRouteCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoRouteCachesInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoRouteCachesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoRouteCachesInput.schema';
import { UserUpdateWithoutGeoRouteCachesInputObjectSchema as UserUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUpdateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoRouteCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoRouteCachesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoRouteCachesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoRouteCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoRouteCachesNestedInput>;
export const UserUpdateOneWithoutGeoRouteCachesNestedInputObjectZodSchema = makeSchema();
