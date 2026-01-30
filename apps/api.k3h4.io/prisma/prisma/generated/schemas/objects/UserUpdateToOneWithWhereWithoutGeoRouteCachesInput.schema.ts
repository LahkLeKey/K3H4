import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoRouteCachesInputObjectSchema as UserUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUpdateWithoutGeoRouteCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoRouteCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoRouteCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoRouteCachesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoRouteCachesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoRouteCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoRouteCachesInput>;
export const UserUpdateToOneWithWhereWithoutGeoRouteCachesInputObjectZodSchema = makeSchema();
