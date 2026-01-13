import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutBankTransactionsInputObjectSchema as UserCreateWithoutBankTransactionsInputObjectSchema } from './UserCreateWithoutBankTransactionsInput.schema';
import { UserUncheckedCreateWithoutBankTransactionsInputObjectSchema as UserUncheckedCreateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutBankTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBankTransactionsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutBankTransactionsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBankTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutBankTransactionsInput>;
export const UserCreateOrConnectWithoutBankTransactionsInputObjectZodSchema = makeSchema();
