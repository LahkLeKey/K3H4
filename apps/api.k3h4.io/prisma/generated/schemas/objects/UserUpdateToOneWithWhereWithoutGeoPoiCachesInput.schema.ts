import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoPoiCachesInputObjectSchema as UserUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUpdateWithoutGeoPoiCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoPoiCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoPoiCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoPoiCachesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoPoiCachesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoPoiCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoPoiCachesInput>;
export const UserUpdateToOneWithWhereWithoutGeoPoiCachesInputObjectZodSchema = makeSchema();
