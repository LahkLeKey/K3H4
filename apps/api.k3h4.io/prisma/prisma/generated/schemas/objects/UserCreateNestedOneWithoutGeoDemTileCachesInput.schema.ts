import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoDemTileCachesInputObjectSchema as UserCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoDemTileCachesInput.schema';
import { UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema as UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoDemTileCachesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoDemTileCachesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoDemTileCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoDemTileCachesInput>;
export const UserCreateNestedOneWithoutGeoDemTileCachesInputObjectZodSchema = makeSchema();
