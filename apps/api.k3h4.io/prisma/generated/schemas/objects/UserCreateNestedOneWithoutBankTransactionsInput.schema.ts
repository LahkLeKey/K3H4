import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBankTransactionsInputObjectSchema as UserCreateWithoutBankTransactionsInputObjectSchema } from './UserCreateWithoutBankTransactionsInput.schema';
import { UserUncheckedCreateWithoutBankTransactionsInputObjectSchema as UserUncheckedCreateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutBankTransactionsInput.schema';
import { UserCreateOrConnectWithoutBankTransactionsInputObjectSchema as UserCreateOrConnectWithoutBankTransactionsInputObjectSchema } from './UserCreateOrConnectWithoutBankTransactionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBankTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutBankTransactionsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBankTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutBankTransactionsInput>;
export const UserCreateNestedOneWithoutBankTransactionsInputObjectZodSchema = makeSchema();
