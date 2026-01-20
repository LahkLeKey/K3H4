import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoStatusLogsInputObjectSchema as UserUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUpdateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoStatusLogsInput.schema';
import { UserCreateWithoutGeoStatusLogsInputObjectSchema as UserCreateWithoutGeoStatusLogsInputObjectSchema } from './UserCreateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedCreateWithoutGeoStatusLogsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoStatusLogsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoStatusLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoStatusLogsInput>;
export const UserUpsertWithoutGeoStatusLogsInputObjectZodSchema = makeSchema();
