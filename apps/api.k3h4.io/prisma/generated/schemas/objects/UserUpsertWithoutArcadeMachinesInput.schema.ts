import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadeMachinesInputObjectSchema as UserUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUpdateWithoutArcadeMachinesInput.schema';
import { UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema as UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeMachinesInput.schema';
import { UserCreateWithoutArcadeMachinesInputObjectSchema as UserCreateWithoutArcadeMachinesInputObjectSchema } from './UserCreateWithoutArcadeMachinesInput.schema';
import { UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema as UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedCreateWithoutArcadeMachinesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadeMachinesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadeMachinesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadeMachinesInput>;
export const UserUpsertWithoutArcadeMachinesInputObjectZodSchema = makeSchema();
