import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadeCardsInputObjectSchema as UserUpdateWithoutArcadeCardsInputObjectSchema } from './UserUpdateWithoutArcadeCardsInput.schema';
import { UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema as UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeCardsInput.schema';
import { UserCreateWithoutArcadeCardsInputObjectSchema as UserCreateWithoutArcadeCardsInputObjectSchema } from './UserCreateWithoutArcadeCardsInput.schema';
import { UserUncheckedCreateWithoutArcadeCardsInputObjectSchema as UserUncheckedCreateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeCardsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeCardsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadeCardsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadeCardsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadeCardsInput>;
export const UserUpsertWithoutArcadeCardsInputObjectZodSchema = makeSchema();
