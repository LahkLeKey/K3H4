import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoViewHistoriesInputObjectSchema as UserCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutGeoViewHistoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoViewHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoViewHistoriesInput>;
export const UserCreateOrConnectWithoutGeoViewHistoriesInputObjectZodSchema = makeSchema();
