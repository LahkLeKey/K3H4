import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutArcadeTopUpsInputObjectSchema as UserUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUpdateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeTopUpsInput.schema';
import { UserCreateWithoutArcadeTopUpsInputObjectSchema as UserCreateWithoutArcadeTopUpsInputObjectSchema } from './UserCreateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeTopUpsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutArcadeTopUpsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutArcadeTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutArcadeTopUpsInput>;
export const UserUpsertWithoutArcadeTopUpsInputObjectZodSchema = makeSchema();
