import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUpdateWithoutPersonaCompatibilitiesInput.schema';
import { UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema as UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema } from './UserUncheckedUpdateWithoutPersonaCompatibilitiesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutPersonaCompatibilitiesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutPersonaCompatibilitiesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInput>;
export const UserUpdateToOneWithWhereWithoutPersonaCompatibilitiesInputObjectZodSchema = makeSchema();
