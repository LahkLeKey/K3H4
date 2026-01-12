import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPosTicketsInputObjectSchema as UserUpdateWithoutPosTicketsInputObjectSchema } from './UserUpdateWithoutPosTicketsInput.schema';
import { UserUncheckedUpdateWithoutPosTicketsInputObjectSchema as UserUncheckedUpdateWithoutPosTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutPosTicketsInput.schema';
import { UserCreateWithoutPosTicketsInputObjectSchema as UserCreateWithoutPosTicketsInputObjectSchema } from './UserCreateWithoutPosTicketsInput.schema';
import { UserUncheckedCreateWithoutPosTicketsInputObjectSchema as UserUncheckedCreateWithoutPosTicketsInputObjectSchema } from './UserUncheckedCreateWithoutPosTicketsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosTicketsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosTicketsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPosTicketsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPosTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPosTicketsInput>;
export const UserUpsertWithoutPosTicketsInputObjectZodSchema = makeSchema();
