import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPosTicketsInputObjectSchema as UserUpdateWithoutPosTicketsInputObjectSchema } from './UserUpdateWithoutPosTicketsInput.schema';
import { UserUncheckedUpdateWithoutPosTicketsInputObjectSchema as UserUncheckedUpdateWithoutPosTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutPosTicketsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosTicketsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPosTicketsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPosTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPosTicketsInput>;
export const UserUpdateToOneWithWhereWithoutPosTicketsInputObjectZodSchema = makeSchema();
