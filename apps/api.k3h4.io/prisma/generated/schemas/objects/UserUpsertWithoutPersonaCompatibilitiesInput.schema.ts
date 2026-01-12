import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUpdateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaCompatibilitiesInput.schema';
import { UserCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutPersonaCompatibilitiesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutPersonaCompatibilitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutPersonaCompatibilitiesInput>;
export const UserUpsertWithoutPersonaCompatibilitiesInputObjectZodSchema = makeSchema();
