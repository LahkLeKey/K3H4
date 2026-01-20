import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutMaptilerQueriesInputObjectSchema as UserCreateWithoutMaptilerQueriesInputObjectSchema } from './UserCreateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerQueriesInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutMaptilerQueriesInput>;
export const UserCreateOrConnectWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
