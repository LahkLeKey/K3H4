import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutGeoDirectionsInputObjectSchema as UserCreateWithoutGeoDirectionsInputObjectSchema } from './UserCreateWithoutGeoDirectionsInput.schema';
import { UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema as UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedCreateWithoutGeoDirectionsInput.schema';
import { UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema as UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema } from './UserCreateOrConnectWithoutGeoDirectionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutGeoDirectionsInput>;
export const UserCreateNestedOneWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
