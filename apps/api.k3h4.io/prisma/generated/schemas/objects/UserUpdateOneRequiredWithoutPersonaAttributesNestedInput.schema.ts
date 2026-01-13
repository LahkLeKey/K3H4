import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonaAttributesInputObjectSchema as UserCreateWithoutPersonaAttributesInputObjectSchema } from './UserCreateWithoutPersonaAttributesInput.schema';
import { UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema as UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaAttributesInput.schema';
import { UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema as UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema } from './UserCreateOrConnectWithoutPersonaAttributesInput.schema';
import { UserUpsertWithoutPersonaAttributesInputObjectSchema as UserUpsertWithoutPersonaAttributesInputObjectSchema } from './UserUpsertWithoutPersonaAttributesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPersonaAttributesInputObjectSchema as UserUpdateToOneWithWhereWithoutPersonaAttributesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPersonaAttributesInput.schema';
import { UserUpdateWithoutPersonaAttributesInputObjectSchema as UserUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUpdateWithoutPersonaAttributesInput.schema';
import { UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema as UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaAttributesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonaAttributesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPersonaAttributesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUpdateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPersonaAttributesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonaAttributesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonaAttributesNestedInput>;
export const UserUpdateOneRequiredWithoutPersonaAttributesNestedInputObjectZodSchema = makeSchema();
