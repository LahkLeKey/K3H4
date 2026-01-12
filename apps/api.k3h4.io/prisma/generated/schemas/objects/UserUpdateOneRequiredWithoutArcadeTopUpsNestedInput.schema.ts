import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutArcadeTopUpsInputObjectSchema as UserCreateWithoutArcadeTopUpsInputObjectSchema } from './UserCreateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedCreateWithoutArcadeTopUpsInput.schema';
import { UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema as UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema } from './UserCreateOrConnectWithoutArcadeTopUpsInput.schema';
import { UserUpsertWithoutArcadeTopUpsInputObjectSchema as UserUpsertWithoutArcadeTopUpsInputObjectSchema } from './UserUpsertWithoutArcadeTopUpsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutArcadeTopUpsInputObjectSchema as UserUpdateToOneWithWhereWithoutArcadeTopUpsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutArcadeTopUpsInput.schema';
import { UserUpdateWithoutArcadeTopUpsInputObjectSchema as UserUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUpdateWithoutArcadeTopUpsInput.schema';
import { UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema as UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema } from './UserUncheckedUpdateWithoutArcadeTopUpsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutArcadeTopUpsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutArcadeTopUpsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutArcadeTopUpsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUpdateWithoutArcadeTopUpsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutArcadeTopUpsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutArcadeTopUpsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeTopUpsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutArcadeTopUpsNestedInput>;
export const UserUpdateOneRequiredWithoutArcadeTopUpsNestedInputObjectZodSchema = makeSchema();
