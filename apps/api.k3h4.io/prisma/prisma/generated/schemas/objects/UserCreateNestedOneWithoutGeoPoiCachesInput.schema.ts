import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoPoiCachesInputObjectSchema as UserCreateWithoutGeoPoiCachesInputObjectSchema } from './UserCreateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoPoiCachesInput.schema';
import { UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema as UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoPoiCachesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoPoiCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoPoiCachesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoPoiCachesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoPoiCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoPoiCachesInput>;
export const UserCreateNestedOneWithoutGeoPoiCachesInputObjectZodSchema = makeSchema();
