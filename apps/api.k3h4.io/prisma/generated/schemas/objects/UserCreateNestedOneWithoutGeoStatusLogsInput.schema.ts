import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoStatusLogsInputObjectSchema as UserCreateWithoutGeoStatusLogsInputObjectSchema } from './UserCreateWithoutGeoStatusLogsInput.schema';
import { UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema as UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema } from './UserUncheckedCreateWithoutGeoStatusLogsInput.schema';
import { UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema as UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema } from './UserCreateOrConnectWithoutGeoStatusLogsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoStatusLogsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoStatusLogsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoStatusLogsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoStatusLogsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoStatusLogsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoStatusLogsInput>;
export const UserCreateNestedOneWithoutGeoStatusLogsInputObjectZodSchema = makeSchema();
