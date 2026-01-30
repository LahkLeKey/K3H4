import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoStatusLogsInputObjectSchema as UserUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUpdateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoStatusLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoStatusLogsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoStatusLogsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoStatusLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoStatusLogsInput>;
export const UserUpdateToOneWithWhereWithoutGeoStatusLogsInputObjectZodSchema = makeSchema();
