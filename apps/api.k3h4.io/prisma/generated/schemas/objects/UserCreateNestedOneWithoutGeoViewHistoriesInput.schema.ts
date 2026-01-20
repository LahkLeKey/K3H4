import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoViewHistoriesInputObjectSchema as UserCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutGeoViewHistoriesInput.schema';
import { UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema as UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateOrConnectWithoutGeoViewHistoriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoViewHistoriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoViewHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoViewHistoriesInput>;
export const UserCreateNestedOneWithoutGeoViewHistoriesInputObjectZodSchema = makeSchema();
