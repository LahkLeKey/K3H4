import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPosTicketsInputObjectSchema as UserCreateWithoutPosTicketsInputObjectSchema } from './UserCreateWithoutPosTicketsInput.schema';
import { UserUncheckedCreateWithoutPosTicketsInputObjectSchema as UserUncheckedCreateWithoutPosTicketsInputObjectSchema } from './UserUncheckedCreateWithoutPosTicketsInput.schema';
import { UserCreateOrConnectWithoutPosTicketsInputObjectSchema as UserCreateOrConnectWithoutPosTicketsInputObjectSchema } from './UserCreateOrConnectWithoutPosTicketsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPosTicketsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPosTicketsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPosTicketsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPosTicketsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPosTicketsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPosTicketsInput>;
export const UserCreateNestedOneWithoutPosTicketsInputObjectZodSchema = makeSchema();
