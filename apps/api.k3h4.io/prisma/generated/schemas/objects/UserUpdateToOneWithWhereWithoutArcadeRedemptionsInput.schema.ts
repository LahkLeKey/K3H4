import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUpdateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeRedemptionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadeRedemptionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeRedemptionsInput>;
export const UserUpdateToOneWithWhereWithoutArcadeRedemptionsInputObjectZodSchema = makeSchema();
