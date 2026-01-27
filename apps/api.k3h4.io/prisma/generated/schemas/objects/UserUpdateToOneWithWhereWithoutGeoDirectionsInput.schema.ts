import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoDirectionsInputObjectSchema as UserUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUpdateWithoutGeoDirectionsInput.schema';
import { UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema as UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDirectionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoDirectionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDirectionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoDirectionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoDirectionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoDirectionsInput>;
export const UserUpdateToOneWithWhereWithoutGeoDirectionsInputObjectZodSchema = makeSchema();
