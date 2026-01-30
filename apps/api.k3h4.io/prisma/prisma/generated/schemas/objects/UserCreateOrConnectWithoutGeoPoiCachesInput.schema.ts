import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoPoiCachesInputObjectSchema as UserCreateWithoutGeoPoiCachesInputObjectSchema } from './UserCreateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoPoiCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoPoiCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoPoiCachesInput>;
export const UserCreateOrConnectWithoutGeoPoiCachesInputObjectZodSchema = makeSchema();
