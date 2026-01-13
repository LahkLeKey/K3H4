import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonasInputObjectSchema as UserCreateWithoutPersonasInputObjectSchema } from './UserCreateWithoutPersonasInput.schema';
import { UserUncheckedCreateWithoutPersonasInputObjectSchema as UserUncheckedCreateWithoutPersonasInputObjectSchema } from './UserUncheckedCreateWithoutPersonasInput.schema';
import { UserCreateOrConnectWithoutPersonasInputObjectSchema as UserCreateOrConnectWithoutPersonasInputObjectSchema } from './UserCreateOrConnectWithoutPersonasInput.schema';
import { UserUpsertWithoutPersonasInputObjectSchema as UserUpsertWithoutPersonasInputObjectSchema } from './UserUpsertWithoutPersonasInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPersonasInputObjectSchema as UserUpdateToOneWithWhereWithoutPersonasInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPersonasInput.schema';
import { UserUpdateWithoutPersonasInputObjectSchema as UserUpdateWithoutPersonasInputObjectSchema } from './UserUpdateWithoutPersonasInput.schema';
import { UserUncheckedUpdateWithoutPersonasInputObjectSchema as UserUncheckedUpdateWithoutPersonasInputObjectSchema } from './UserUncheckedUpdateWithoutPersonasInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonasInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPersonasInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPersonasInputObjectSchema), z.lazy(() => UserUpdateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonasInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPersonasNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonasNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonasNestedInput>;
export const UserUpdateOneRequiredWithoutPersonasNestedInputObjectZodSchema = makeSchema();
