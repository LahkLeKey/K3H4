import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadeMachinesInputObjectSchema as UserUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUpdateWithoutArcadeMachinesInput.schema';
import { UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema as UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeMachinesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadeMachinesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeMachinesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadeMachinesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeMachinesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeMachinesInput>;
export const UserUpdateToOneWithWhereWithoutArcadeMachinesInputObjectZodSchema = makeSchema();
