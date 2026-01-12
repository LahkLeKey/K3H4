import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeCardsInputObjectSchema as UserCreateWithoutArcadeCardsInputObjectSchema } from './UserCreateWithoutArcadeCardsInput.schema';
import { UserUncheckedCreateWithoutArcadeCardsInputObjectSchema as UserUncheckedCreateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeCardsInput.schema';
import { UserCreateOrConnectWithoutArcadeCardsInputObjectSchema as UserCreateOrConnectWithoutArcadeCardsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeCardsInput.schema';
import { UserUpsertWithoutArcadeCardsInputObjectSchema as UserUpsertWithoutArcadeCardsInputObjectSchema } from './UserUpsertWithoutArcadeCardsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadeCardsInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadeCardsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadeCardsInput.schema';
import { UserUpdateWithoutArcadeCardsInputObjectSchema as UserUpdateWithoutArcadeCardsInputObjectSchema } from './UserUpdateWithoutArcadeCardsInput.schema';
import { UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema as UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeCardsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeCardsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeCardsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadeCardsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadeCardsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeCardsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeCardsNestedInput>;
export const UserUpdateOneRequiredWithoutArcadeCardsNestedInputObjectZodSchema = makeSchema();
