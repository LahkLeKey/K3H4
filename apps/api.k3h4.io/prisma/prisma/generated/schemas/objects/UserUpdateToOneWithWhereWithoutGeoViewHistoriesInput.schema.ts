import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUpdateWithoutGeoViewHistoriesInput.schema';
import { UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema as UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoViewHistoriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoViewHistoriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoViewHistoriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoViewHistoriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoViewHistoriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoViewHistoriesInput>;
export const UserUpdateToOneWithWhereWithoutGeoViewHistoriesInputObjectZodSchema = makeSchema();
