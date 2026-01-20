import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUpdateWithoutGeoDemTileCachesInput.schema';
import { UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema as UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema } from './UserUncheckedUpdateWithoutGeoDemTileCachesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutGeoDemTileCachesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutGeoDemTileCachesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutGeoDemTileCachesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoDemTileCachesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutGeoDemTileCachesInput>;
export const UserUpdateToOneWithWhereWithoutGeoDemTileCachesInputObjectZodSchema = makeSchema();
