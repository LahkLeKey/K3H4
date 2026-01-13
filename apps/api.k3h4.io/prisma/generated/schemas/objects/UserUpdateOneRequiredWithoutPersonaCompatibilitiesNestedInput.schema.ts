import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedCreateWithoutPersonaCompatibilitiesInput.schema';
import { UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema as UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema } from './UserCreateOrConnectWithoutPersonaCompatibilitiesInput.schema';
import { UserUpsertWithoutPersonaCompatibilitiesInputObjectSchema as UserUpsertWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUpsertWithoutPersonaCompatibilitiesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInputObjectSchema as UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInput.schema';
import { UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUpdateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaCompatibilitiesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutPersonaCompatibilitiesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutPersonaCompatibilitiesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutPersonaCompatibilitiesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInput>;
export const UserUpdateOneRequiredWithoutPersonaCompatibilitiesNestedInputObjectZodSchema = makeSchema();
