import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoQueryCachesInputObjectSchema as UserUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUpdateWithoutGeoQueryCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoQueryCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoQueryCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoQueryCachesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoQueryCachesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoQueryCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoQueryCachesInput>;
export const UserUpdateToOneWithWhereWithoutGeoQueryCachesInputObjectZodSchema = makeSchema();
