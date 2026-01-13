import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeSessionsInputObjectSchema as UserCreateWithoutArcadeSessionsInputObjectSchema } from './UserCreateWithoutArcadeSessionsInput.schema';
import { UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema as UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeSessionsInput.schema';
import { UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema as UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeSessionsInput.schema';
import { UserUpsertWithoutArcadeSessionsInputObjectSchema as UserUpsertWithoutArcadeSessionsInputObjectSchema } from './UserUpsertWithoutArcadeSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadeSessionsInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadeSessionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadeSessionsInput.schema';
import { UserUpdateWithoutArcadeSessionsInputObjectSchema as UserUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUpdateWithoutArcadeSessionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeSessionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadeSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadeSessionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeSessionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeSessionsNestedInput>;
export const UserUpdateOneRequiredWithoutArcadeSessionsNestedInputObjectZodSchema = makeSchema();
