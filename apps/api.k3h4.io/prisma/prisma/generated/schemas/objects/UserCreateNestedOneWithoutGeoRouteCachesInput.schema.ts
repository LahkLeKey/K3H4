import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoRouteCachesInputObjectSchema as UserCreateWithoutGeoRouteCachesInputObjectSchema } from './UserCreateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedCreateWithoutGeoRouteCachesInput.schema';
import { UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema as UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema } from './UserCreateOrConnectWithoutGeoRouteCachesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoRouteCachesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoRouteCachesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoRouteCachesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoRouteCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoRouteCachesInput>;
export const UserCreateNestedOneWithoutGeoRouteCachesInputObjectZodSchema = makeSchema();
