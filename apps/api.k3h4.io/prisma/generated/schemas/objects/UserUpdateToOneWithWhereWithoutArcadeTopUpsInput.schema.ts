import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutArcadeTopUpsInputObjectSchema as UserUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUpdateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeTopUpsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutArcadeTopUpsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeTopUpsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutArcadeTopUpsInput>;
export const UserUpdateToOneWithWhereWithoutArcadeTopUpsInputObjectZodSchema = makeSchema();
