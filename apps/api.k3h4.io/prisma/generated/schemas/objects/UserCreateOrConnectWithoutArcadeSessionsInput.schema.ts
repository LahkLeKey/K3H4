import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadeSessionsInputObjectSchema as UserCreateWithoutArcadeSessionsInputObjectSchema } from './UserCreateWithoutArcadeSessionsInput.schema';
import { UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema as UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeSessionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeSessionsInput>;
export const UserCreateOrConnectWithoutArcadeSessionsInputObjectZodSchema = makeSchema();
