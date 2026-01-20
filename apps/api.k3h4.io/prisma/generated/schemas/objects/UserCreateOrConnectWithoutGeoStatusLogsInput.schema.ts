import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoStatusLogsInputObjectSchema as UserCreateWithoutGeoStatusLogsInputObjectSchema } from './UserCreateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedCreateWithoutGeoStatusLogsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoStatusLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoStatusLogsInput>;
export const UserCreateOrConnectWithoutGeoStatusLogsInputObjectZodSchema = makeSchema();
