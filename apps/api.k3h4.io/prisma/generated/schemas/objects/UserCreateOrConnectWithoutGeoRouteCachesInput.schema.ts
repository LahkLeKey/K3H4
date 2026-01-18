import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoRouteCachesInputObjectSchema as UserCreateWithoutGeoRouteCachesInputObjectSchema } from './UserCreateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoRouteCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoRouteCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoRouteCachesInput>;
export const UserCreateOrConnectWithoutGeoRouteCachesInputObjectZodSchema = makeSchema();
