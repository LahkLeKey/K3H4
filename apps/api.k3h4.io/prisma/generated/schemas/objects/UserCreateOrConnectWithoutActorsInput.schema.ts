import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutActorsInputObjectSchema as UserCreateWithoutActorsInputObjectSchema } from './UserCreateWithoutActorsInput.schema';
import { UserUncheckedCreateWithoutActorsInputObjectSchema as UserUncheckedCreateWithoutActorsInputObjectSchema } from './UserUncheckedCreateWithoutActorsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutActorsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutActorsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutActorsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutActorsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutActorsInput>;
export const UserCreateOrConnectWithoutActorsInputObjectZodSchema = makeSchema();
