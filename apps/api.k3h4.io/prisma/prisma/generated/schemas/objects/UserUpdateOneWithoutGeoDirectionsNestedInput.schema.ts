import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoDirectionsInputObjectSchema as UserCreateWithoutGeoDirectionsInputObjectSchema } from './UserCreateWithoutGeoDirectionsInput.schema';
import { UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema as UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedCreateWithoutGeoDirectionsInput.schema';
import { UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema as UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema } from './UserCreateOrConnectWithoutGeoDirectionsInput.schema';
import { UserUpsertWithoutGeoDirectionsInputObjectSchema as UserUpsertWithoutGeoDirectionsInputObjectSchema } from './UserUpsertWithoutGeoDirectionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema as UserUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutGeoDirectionsInput.schema';
import { UserUpdateWithoutGeoDirectionsInputObjectSchema as UserUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUpdateWithoutGeoDirectionsInput.schema';
import { UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutGeoDirectionsInputObjectSchema).optional(),
  disconnect: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  delete: z.union([z.boolean(), z.lazy(() => UserWhereInputObjectSchema)]).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneWithoutGeoDirectionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneWithoutGeoDirectionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneWithoutGeoDirectionsNestedInput>;
export const UserUpdateOneWithoutGeoDirectionsNestedInputObjectZodSchema = makeSchema();
