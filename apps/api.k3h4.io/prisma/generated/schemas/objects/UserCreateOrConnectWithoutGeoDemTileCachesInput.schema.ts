import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoDemTileCachesInputObjectSchema as UserCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserCreateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoDemTileCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDemTileCachesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoDemTileCachesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoDemTileCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoDemTileCachesInput>;
export const UserCreateOrConnectWithoutGeoDemTileCachesInputObjectZodSchema = makeSchema();
