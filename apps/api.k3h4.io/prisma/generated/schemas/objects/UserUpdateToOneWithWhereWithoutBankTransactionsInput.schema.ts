import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutBankTransactionsInputObjectSchema as UserUpdateWithoutBankTransactionsInputObjectSchema } from './UserUpdateWithoutBankTransactionsInput.schema';
import { UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema as UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutBankTransactionsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutBankTransactionsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBankTransactionsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBankTransactionsInput>;
export const UserUpdateToOneWithWhereWithoutBankTransactionsInputObjectZodSchema = makeSchema();
