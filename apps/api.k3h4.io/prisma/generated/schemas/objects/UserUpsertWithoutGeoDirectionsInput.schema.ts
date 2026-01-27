import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutGeoDirectionsInputObjectSchema as UserUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUpdateWithoutGeoDirectionsInput.schema';
import { UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDirectionsInput.schema';
import { UserCreateWithoutGeoDirectionsInputObjectSchema as UserCreateWithoutGeoDirectionsInputObjectSchema } from './UserCreateWithoutGeoDirectionsInput.schema';
import { UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema as UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedCreateWithoutGeoDirectionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutGeoDirectionsInput>;
export const UserUpsertWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
