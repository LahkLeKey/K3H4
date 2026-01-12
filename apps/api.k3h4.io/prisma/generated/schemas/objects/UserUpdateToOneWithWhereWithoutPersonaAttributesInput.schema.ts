import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPersonaAttributesInputObjectSchema as UserUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUpdateWithoutPersonaAttributesInput.schema';
import { UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema as UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaAttributesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPersonaAttributesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaAttributesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPersonaAttributesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonaAttributesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonaAttributesInput>;
export const UserUpdateToOneWithWhereWithoutPersonaAttributesInputObjectZodSchema = makeSchema();
