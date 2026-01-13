import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUpdateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeRedemptionsInput.schema';
import { UserCreateWithoutArcadeRedemptionsInputObjectSchema as UserCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeRedemptionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadeRedemptionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadeRedemptionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadeRedemptionsInput>;
export const UserUpsertWithoutArcadeRedemptionsInputObjectZodSchema = makeSchema();
