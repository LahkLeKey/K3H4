import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutTelemetryInputObjectSchema as UserCreateWithoutTelemetryInputObjectSchema } from './UserCreateWithoutTelemetryInput.schema';
import { UserUncheckedCreateWithoutTelemetryInputObjectSchema as UserUncheckedCreateWithoutTelemetryInputObjectSchema } from './UserUncheckedCreateWithoutTelemetryInput.schema';
import { UserCreateOrConnectWithoutTelemetryInputObjectSchema as UserCreateOrConnectWithoutTelemetryInputObjectSchema } from './UserCreateOrConnectWithoutTelemetryInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTelemetryInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutTelemetryInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutTelemetryInput>;
export const UserCreateNestedOneWithoutTelemetryInputObjectZodSchema = makeSchema();
