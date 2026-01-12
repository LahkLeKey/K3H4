import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadeSessionsInputObjectSchema as UserUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUpdateWithoutArcadeSessionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeSessionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadeSessionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeSessionsInput>;
export const UserUpdateToOneWithWhereWithoutArcadeSessionsInputObjectZodSchema = makeSchema();
