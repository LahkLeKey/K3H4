import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoDemTileCachesInputObjectSchema as UserCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoDemTileCachesInput.schema';
import { UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema as UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoDemTileCachesInput.schema';
import { UserUpsertWithoutGeoDemTileCachesInputObjectSchema as UserUpsertWithoutGeoDemTileCachesInputObjectSchema } from './UserUpsertWithoutGeoDemTileCachesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoDemTileCachesInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoDemTileCachesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoDemTileCachesInput.schema';
import { UserUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUpdateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDemTileCachesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoDemTileCachesInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoDemTileCachesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoDemTileCachesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoDemTileCachesNestedInput>;
export const UserUpdateOneWithoutGeoDemTileCachesNestedInputObjectZodSchema = makeSchema();
