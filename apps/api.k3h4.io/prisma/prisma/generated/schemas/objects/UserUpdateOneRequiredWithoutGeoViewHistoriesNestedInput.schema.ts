import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoViewHistoriesInputObjectSchema as UserCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedCreateWithoutGeoViewHistoriesInput.schema';
import { UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema as UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema } from './UserCreateOrConnectWithoutGeoViewHistoriesInput.schema';
import { UserUpsertWithoutGeoViewHistoriesInputObjectSchema as UserUpsertWithoutGeoViewHistoriesInputObjectSchema } from './UserUpsertWithoutGeoViewHistoriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoViewHistoriesInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoViewHistoriesInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoViewHistoriesInput.schema';
import { UserUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUpdateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoViewHistoriesInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoViewHistoriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoViewHistoriesInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoViewHistoriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutGeoViewHistoriesNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutGeoViewHistoriesNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutGeoViewHistoriesNestedInput>;
export const UserUpdateOneRequiredWithoutGeoViewHistoriesNestedInputObjectZodSchema = makeSchema();
