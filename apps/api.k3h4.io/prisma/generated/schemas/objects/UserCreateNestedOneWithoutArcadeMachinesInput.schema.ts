import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeMachinesInputObjectSchema as UserCreateWithoutArcadeMachinesInputObjectSchema } from './UserCreateWithoutArcadeMachinesInput.schema';
import { UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema as UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedCreateWithoutArcadeMachinesInput.schema';
import { UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema as UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema } from './UserCreateOrConnectWithoutArcadeMachinesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutArcadeMachinesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeMachinesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutArcadeMachinesInput>;
export const UserCreateNestedOneWithoutArcadeMachinesInputObjectZodSchema = makeSchema();
