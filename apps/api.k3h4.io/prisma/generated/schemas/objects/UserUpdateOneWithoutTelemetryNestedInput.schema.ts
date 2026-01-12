import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutTelemetryInputObjectSchema as UserCreateWithoutTelemetryInputObjectSchema } from './UserCreateWithoutTelemetryInput.schema';
import { UserUncheckedCreateWithoutTelemetryInputObjectSchema as UserUncheckedCreateWithoutTelemetryInputObjectSchema } from './UserUncheckedCreateWithoutTelemetryInput.schema';
import { UserCreateOrConnectWithoutTelemetryInputObjectSchema as UserCreateOrConnectWithoutTelemetryInputObjectSchema } from './UserCreateOrConnectWithoutTelemetryInput.schema';
import { UserUpsertWithoutTelemetryInputObjectSchema as UserUpsertWithoutTelemetryInputObjectSchema } from './UserUpsertWithoutTelemetryInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutTelemetryInputObjectSchema as UserUpdateToOneWithWhereWithoutTelemetryInputObjectSchema } from './UserUpdateToOneWithWhereWithoutTelemetryInput.schema';
import { UserUpdateWithoutTelemetryInputObjectSchema as UserUpdateWithoutTelemetryInputObjectSchema } from './UserUpdateWithoutTelemetryInput.schema';
import { UserUncheckedUpdateWithoutTelemetryInputObjectSchema as UserUncheckedUpdateWithoutTelemetryInputObjectSchema } from './UserUncheckedUpdateWithoutTelemetryInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTelemetryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTelemetryInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutTelemetryInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutTelemetryInputObjectSchema), z.lazy(() => UserUpdateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTelemetryInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutTelemetryNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutTelemetryNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutTelemetryNestedInput>;
export const UserUpdateOneWithoutTelemetryNestedInputObjectZodSchema = makeSchema();
