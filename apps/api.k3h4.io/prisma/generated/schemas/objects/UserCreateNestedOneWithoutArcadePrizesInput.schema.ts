import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadePrizesInputObjectSchema as UserCreateWithoutArcadePrizesInputObjectSchema } from './UserCreateWithoutArcadePrizesInput.schema';
import { UserUncheckedCreateWithoutArcadePrizesInputObjectSchema as UserUncheckedCreateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedCreateWithoutArcadePrizesInput.schema';
import { UserCreateOrConnectWithoutArcadePrizesInputObjectSchema as UserCreateOrConnectWithoutArcadePrizesInputObjectSchema } from './UserCreateOrConnectWithoutArcadePrizesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadePrizesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadePrizesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadePrizesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadePrizesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadePrizesInput>;
export const UserCreateNestedOneWithoutArcadePrizesInputObjectZodSchema = makeSchema();
