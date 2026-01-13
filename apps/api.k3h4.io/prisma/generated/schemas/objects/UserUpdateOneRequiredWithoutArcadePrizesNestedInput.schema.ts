import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadePrizesInputObjectSchema as UserCreateWithoutArcadePrizesInputObjectSchema } from './UserCreateWithoutArcadePrizesInput.schema';
import { UserUncheckedCreateWithoutArcadePrizesInputObjectSchema as UserUncheckedCreateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedCreateWithoutArcadePrizesInput.schema';
import { UserCreateOrConnectWithoutArcadePrizesInputObjectSchema as UserCreateOrConnectWithoutArcadePrizesInputObjectSchema } from './UserCreateOrConnectWithoutArcadePrizesInput.schema';
import { UserUpsertWithoutArcadePrizesInputObjectSchema as UserUpsertWithoutArcadePrizesInputObjectSchema } from './UserUpsertWithoutArcadePrizesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadePrizesInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadePrizesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadePrizesInput.schema';
import { UserUpdateWithoutArcadePrizesInputObjectSchema as UserUpdateWithoutArcadePrizesInputObjectSchema } from './UserUpdateWithoutArcadePrizesInput.schema';
import { UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema as UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadePrizesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadePrizesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadePrizesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadePrizesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadePrizesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadePrizesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadePrizesNestedInput>;
export const UserUpdateOneRequiredWithoutArcadePrizesNestedInputObjectZodSchema = makeSchema();
