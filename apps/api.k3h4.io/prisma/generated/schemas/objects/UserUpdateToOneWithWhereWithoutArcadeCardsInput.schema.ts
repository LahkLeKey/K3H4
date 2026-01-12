import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadeCardsInputObjectSchema as UserUpdateWithoutArcadeCardsInputObjectSchema } from './UserUpdateWithoutArcadeCardsInput.schema';
import { UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema as UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeCardsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadeCardsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeCardsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadeCardsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeCardsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeCardsInput>;
export const UserUpdateToOneWithWhereWithoutArcadeCardsInputObjectZodSchema = makeSchema();
