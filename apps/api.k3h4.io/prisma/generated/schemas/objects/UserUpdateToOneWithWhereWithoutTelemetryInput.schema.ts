import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutTelemetryInputObjectSchema as UserUpdateWithoutTelemetryInputObjectSchema } from './UserUpdateWithoutTelemetryInput.schema';
import { UserUncheckedUpdateWithoutTelemetryInputObjectSchema as UserUncheckedUpdateWithoutTelemetryInputObjectSchema } from './UserUncheckedUpdateWithoutTelemetryInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutTelemetryInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutTelemetryInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutTelemetryInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTelemetryInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutTelemetryInput>;
export const UserUpdateToOneWithWhereWithoutTelemetryInputObjectZodSchema = makeSchema();
