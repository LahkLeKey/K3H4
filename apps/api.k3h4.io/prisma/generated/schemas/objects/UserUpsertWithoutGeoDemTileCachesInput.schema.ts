import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUpdateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDemTileCachesInput.schema';
import { UserCreateWithoutGeoDemTileCachesInputObjectSchema as UserCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoDemTileCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoDemTileCachesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoDemTileCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoDemTileCachesInput>;
export const UserUpsertWithoutGeoDemTileCachesInputObjectZodSchema = makeSchema();
