import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutPersonasInputObjectSchema as UserCreateWithoutPersonasInputObjectSchema } from './UserCreateWithoutPersonasInput.schema';
import { UserUncheckedCreateWithoutPersonasInputObjectSchema as UserUncheckedCreateWithoutPersonasInputObjectSchema } from './UserUncheckedCreateWithoutPersonasInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutPersonasInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonasInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutPersonasInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutPersonasInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutPersonasInput>;
export const UserCreateOrConnectWithoutPersonasInputObjectZodSchema = makeSchema();
