import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeSessionsInputObjectSchema as UserCreateWithoutArcadeSessionsInputObjectSchema } from './UserCreateWithoutArcadeSessionsInput.schema';
import { UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema as UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeSessionsInput.schema';
import { UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema as UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeSessionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeSessionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeSessionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeSessionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadeSessionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeSessionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeSessionsInput>;
export const UserCreateNestedOneWithoutArcadeSessionsInputObjectZodSchema = makeSchema();
