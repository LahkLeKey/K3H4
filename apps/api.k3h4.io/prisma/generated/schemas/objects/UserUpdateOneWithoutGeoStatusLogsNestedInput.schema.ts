import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoStatusLogsInputObjectSchema as UserCreateWithoutGeoStatusLogsInputObjectSchema } from './UserCreateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedCreateWithoutGeoStatusLogsInput.schema';
import { UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema as UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema } from './UserCreateOrConnectWithoutGeoStatusLogsInput.schema';
import { UserUpsertWithoutGeoStatusLogsInputObjectSchema as UserUpsertWithoutGeoStatusLogsInputObjectSchema } from './UserUpsertWithoutGeoStatusLogsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoStatusLogsInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoStatusLogsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoStatusLogsInput.schema';
import { UserUpdateWithoutGeoStatusLogsInputObjectSchema as UserUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUpdateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoStatusLogsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoStatusLogsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoStatusLogsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoStatusLogsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoStatusLogsNestedInput>;
export const UserUpdateOneWithoutGeoStatusLogsNestedInputObjectZodSchema = makeSchema();
