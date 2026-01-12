import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeMachinesInputObjectSchema as UserCreateWithoutArcadeMachinesInputObjectSchema } from './UserCreateWithoutArcadeMachinesInput.schema';
import { UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema as UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedCreateWithoutArcadeMachinesInput.schema';
import { UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema as UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema } from './UserCreateOrConnectWithoutArcadeMachinesInput.schema';
import { UserUpsertWithoutArcadeMachinesInputObjectSchema as UserUpsertWithoutArcadeMachinesInputObjectSchema } from './UserUpsertWithoutArcadeMachinesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadeMachinesInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadeMachinesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadeMachinesInput.schema';
import { UserUpdateWithoutArcadeMachinesInputObjectSchema as UserUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUpdateWithoutArcadeMachinesInput.schema';
import { UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema as UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeMachinesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeMachinesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeMachinesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadeMachinesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadeMachinesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeMachinesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeMachinesNestedInput>;
export const UserUpdateOneRequiredWithoutArcadeMachinesNestedInputObjectZodSchema = makeSchema();
