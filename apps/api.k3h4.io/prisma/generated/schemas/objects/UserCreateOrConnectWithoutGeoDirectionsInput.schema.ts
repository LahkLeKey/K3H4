import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutGeoDirectionsInputObjectSchema as UserCreateWithoutGeoDirectionsInputObjectSchema } from './UserCreateWithoutGeoDirectionsInput.schema';
import { UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema as UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedCreateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutGeoDirectionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutGeoDirectionsInput>;
export const UserCreateOrConnectWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
