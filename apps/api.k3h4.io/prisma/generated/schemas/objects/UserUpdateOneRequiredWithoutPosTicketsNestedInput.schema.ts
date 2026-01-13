import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPosTicketsInputObjectSchema as UserCreateWithoutPosTicketsInputObjectSchema } from './UserCreateWithoutPosTicketsInput.schema';
import { UserUncheckedCreateWithoutPosTicketsInputObjectSchema as UserUncheckedCreateWithoutPosTicketsInputObjectSchema } from './UserUncheckedCreateWithoutPosTicketsInput.schema';
import { UserCreateOrConnectWithoutPosTicketsInputObjectSchema as UserCreateOrConnectWithoutPosTicketsInputObjectSchema } from './UserCreateOrConnectWithoutPosTicketsInput.schema';
import { UserUpsertWithoutPosTicketsInputObjectSchema as UserUpsertWithoutPosTicketsInputObjectSchema } from './UserUpsertWithoutPosTicketsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPosTicketsInputObjectSchema as UserUpdateToOneWithWhereWithoutPosTicketsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPosTicketsInput.schema';
import { UserUpdateWithoutPosTicketsInputObjectSchema as UserUpdateWithoutPosTicketsInputObjectSchema } from './UserUpdateWithoutPosTicketsInput.schema';
import { UserUncheckedUpdateWithoutPosTicketsInputObjectSchema as UserUncheckedUpdateWithoutPosTicketsInputObjectSchema } from './UserUncheckedUpdateWithoutPosTicketsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPosTicketsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPosTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUpdateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPosTicketsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPosTicketsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPosTicketsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPosTicketsNestedInput>;
export const UserUpdateOneRequiredWithoutPosTicketsNestedInputObjectZodSchema = makeSchema();
