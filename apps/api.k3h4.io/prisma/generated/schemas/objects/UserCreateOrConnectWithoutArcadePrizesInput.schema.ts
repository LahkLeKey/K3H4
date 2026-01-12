import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadePrizesInputObjectSchema as UserCreateWithoutArcadePrizesInputObjectSchema } from './UserCreateWithoutArcadePrizesInput.schema';
import { UserUncheckedCreateWithoutArcadePrizesInputObjectSchema as UserUncheckedCreateWithoutArcadePrizesInputObjectSchema } from './UserUncheckedCreateWithoutArcadePrizesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadePrizesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadePrizesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadePrizesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadePrizesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadePrizesInput>;
export const UserCreateOrConnectWithoutArcadePrizesInputObjectZodSchema = makeSchema();
