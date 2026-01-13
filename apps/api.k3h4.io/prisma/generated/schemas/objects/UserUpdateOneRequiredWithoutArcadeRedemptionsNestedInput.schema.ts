import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeRedemptionsInputObjectSchema as UserCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeRedemptionsInput.schema';
import { UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema as UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeRedemptionsInput.schema';
import { UserUpsertWithoutArcadeRedemptionsInputObjectSchema as UserUpsertWithoutArcadeRedemptionsInputObjectSchema } from './UserUpsertWithoutArcadeRedemptionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadeRedemptionsInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadeRedemptionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadeRedemptionsInput.schema';
import { UserUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUpdateWithoutArcadeRedemptionsInput.schema';
import { UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema as UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeRedemptionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeRedemptionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeRedemptionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadeRedemptionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadeRedemptionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeRedemptionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInput>;
export const UserUpdateOneRequiredWithoutArcadeRedemptionsNestedInputObjectZodSchema = makeSchema();
