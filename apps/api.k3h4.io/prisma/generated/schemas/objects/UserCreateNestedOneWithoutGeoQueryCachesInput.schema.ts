import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoQueryCachesInputObjectSchema as UserCreateWithoutGeoQueryCachesInputObjectSchema } from './UserCreateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoQueryCachesInput.schema';
import { UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema as UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoQueryCachesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoQueryCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoQueryCachesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoQueryCachesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoQueryCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoQueryCachesInput>;
export const UserCreateNestedOneWithoutGeoQueryCachesInputObjectZodSchema = makeSchema();
