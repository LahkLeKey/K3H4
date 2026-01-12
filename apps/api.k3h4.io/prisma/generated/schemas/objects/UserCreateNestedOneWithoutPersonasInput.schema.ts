import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonasInputObjectSchema as UserCreateWithoutPersonasInputObjectSchema } from './UserCreateWithoutPersonasInput.schema';
import { UserUncheckedCreateWithoutPersonasInputObjectSchema as UserUncheckedCreateWithoutPersonasInputObjectSchema } from './UserUncheckedCreateWithoutPersonasInput.schema';
import { UserCreateOrConnectWithoutPersonasInputObjectSchema as UserCreateOrConnectWithoutPersonasInputObjectSchema } from './UserCreateOrConnectWithoutPersonasInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonasInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonasInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutPersonasInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutPersonasInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutPersonasInput>;
export const UserCreateNestedOneWithoutPersonasInputObjectZodSchema = makeSchema();
