import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutProviderGrantsInputObjectSchema as UserUpdateWithoutProviderGrantsInputObjectSchema } from './UserUpdateWithoutProviderGrantsInput.schema';
import { UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema as UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema } from './UserUncheckedUpdateWithoutProviderGrantsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutProviderGrantsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutProviderGrantsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutProviderGrantsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProviderGrantsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutProviderGrantsInput>;
export const UserUpdateToOneWithWhereWithoutProviderGrantsInputObjectZodSchema = makeSchema();
