import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadePrizesInputObjectSchema as UserUpdateWithoutArcadePrizesInputObjectSchema } from './UserUpdateWithoutArcadePrizesInput.schema';
import { UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema as UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadePrizesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadePrizesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadePrizesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadePrizesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadePrizesInput>;
export const UserUpdateToOneWithWhereWithoutArcadePrizesInputObjectZodSchema = makeSchema();
