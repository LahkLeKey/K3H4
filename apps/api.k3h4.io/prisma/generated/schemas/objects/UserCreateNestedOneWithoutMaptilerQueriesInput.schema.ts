import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutMaptilerQueriesInputObjectSchema as UserCreateWithoutMaptilerQueriesInputObjectSchema } from './UserCreateWithoutMaptilerQueriesInput.schema';
import { UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema as UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema } from './UserUncheckedCreateWithoutMaptilerQueriesInput.schema';
import { UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema as UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema } from './UserCreateOrConnectWithoutMaptilerQueriesInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutMaptilerQueriesInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutMaptilerQueriesInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutMaptilerQueriesInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutMaptilerQueriesInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutMaptilerQueriesInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutMaptilerQueriesInput>;
export const UserCreateNestedOneWithoutMaptilerQueriesInputObjectZodSchema = makeSchema();
