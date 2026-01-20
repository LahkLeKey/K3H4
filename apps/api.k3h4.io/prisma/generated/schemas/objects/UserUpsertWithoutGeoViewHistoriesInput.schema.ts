import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUpdateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoViewHistoriesInput.schema';
import { UserCreateWithoutGeoViewHistoriesInputObjectSchema as UserCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutGeoViewHistoriesInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoViewHistoriesInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoViewHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoViewHistoriesInput>;
export const UserUpsertWithoutGeoViewHistoriesInputObjectZodSchema = makeSchema();
