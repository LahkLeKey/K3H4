import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutBankTransactionsInputObjectSchema as UserUpdateWithoutBankTransactionsInputObjectSchema } from './UserUpdateWithoutBankTransactionsInput.schema';
import { UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema as UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutBankTransactionsInput.schema';
import { UserCreateWithoutBankTransactionsInputObjectSchema as UserCreateWithoutBankTransactionsInputObjectSchema } from './UserCreateWithoutBankTransactionsInput.schema';
import { UserUncheckedCreateWithoutBankTransactionsInputObjectSchema as UserUncheckedCreateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutBankTransactionsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBankTransactionsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutBankTransactionsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutBankTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutBankTransactionsInput>;
export const UserUpsertWithoutBankTransactionsInputObjectZodSchema = makeSchema();
