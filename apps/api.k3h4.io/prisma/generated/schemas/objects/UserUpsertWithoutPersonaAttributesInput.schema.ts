import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPersonaAttributesInputObjectSchema as UserUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUpdateWithoutPersonaAttributesInput.schema';
import { UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema as UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaAttributesInput.schema';
import { UserCreateWithoutPersonaAttributesInputObjectSchema as UserCreateWithoutPersonaAttributesInputObjectSchema } from './UserCreateWithoutPersonaAttributesInput.schema';
import { UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema as UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaAttributesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaAttributesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPersonaAttributesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPersonaAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPersonaAttributesInput>;
export const UserUpsertWithoutPersonaAttributesInputObjectZodSchema = makeSchema();
