import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutMaptilerQueriesInputObjectSchema as UserUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUpdateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedUpdateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutMaptilerQueriesInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutMaptilerQueriesInput>;
export const UserUpdateToOneWithWhereWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
