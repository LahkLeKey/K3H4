import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoQueryCachesInputObjectSchema as UserCreateWithoutGeoQueryCachesInputObjectSchema } from './UserCreateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoQueryCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoQueryCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoQueryCachesInput>;
export const UserCreateOrConnectWithoutGeoQueryCachesInputObjectZodSchema = makeSchema();
