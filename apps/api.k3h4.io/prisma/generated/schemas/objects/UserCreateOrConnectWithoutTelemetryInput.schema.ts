import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutTelemetryInputObjectSchema as UserCreateWithoutTelemetryInputObjectSchema } from './UserCreateWithoutTelemetryInput.schema';
import { UserUncheckedCreateWithoutTelemetryInputObjectSchema as UserUncheckedCreateWithoutTelemetryInputObjectSchema } from './UserUncheckedCreateWithoutTelemetryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutTelemetryInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutTelemetryInput>;
export const UserCreateOrConnectWithoutTelemetryInputObjectZodSchema = makeSchema();
