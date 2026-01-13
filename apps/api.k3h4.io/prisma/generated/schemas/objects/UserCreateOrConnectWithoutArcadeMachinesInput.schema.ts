import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutArcadeMachinesInputObjectSchema as UserCreateWithoutArcadeMachinesInputObjectSchema } from './UserCreateWithoutArcadeMachinesInput.schema';
import { UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema as UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedCreateWithoutArcadeMachinesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeMachinesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutArcadeMachinesInput>;
export const UserCreateOrConnectWithoutArcadeMachinesInputObjectZodSchema = makeSchema();
