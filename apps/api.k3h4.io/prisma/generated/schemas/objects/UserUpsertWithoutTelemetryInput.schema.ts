import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutTelemetryInputObjectSchema as UserUpdateWithoutTelemetryInputObjectSchema } from './UserUpdateWithoutTelemetryInput.schema';
import { UserUncheckedUpdateWithoutTelemetryInputObjectSchema as UserUncheckedUpdateWithoutTelemetryInputObjectSchema } from './UserUncheckedUpdateWithoutTelemetryInput.schema';
import { UserCreateWithoutTelemetryInputObjectSchema as UserCreateWithoutTelemetryInputObjectSchema } from './UserCreateWithoutTelemetryInput.schema';
import { UserUncheckedCreateWithoutTelemetryInputObjectSchema as UserUncheckedCreateWithoutTelemetryInputObjectSchema } from './UserUncheckedCreateWithoutTelemetryInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTelemetryInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTelemetryInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutTelemetryInput>;
export const UserUpsertWithoutTelemetryInputObjectZodSchema = makeSchema();
