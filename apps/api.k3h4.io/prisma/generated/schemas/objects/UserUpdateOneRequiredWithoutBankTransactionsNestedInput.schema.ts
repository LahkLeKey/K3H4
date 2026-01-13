import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutBankTransactionsInputObjectSchema as UserCreateWithoutBankTransactionsInputObjectSchema } from './UserCreateWithoutBankTransactionsInput.schema';
import { UserUncheckedCreateWithoutBankTransactionsInputObjectSchema as UserUncheckedCreateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedCreateWithoutBankTransactionsInput.schema';
import { UserCreateOrConnectWithoutBankTransactionsInputObjectSchema as UserCreateOrConnectWithoutBankTransactionsInputObjectSchema } from './UserCreateOrConnectWithoutBankTransactionsInput.schema';
import { UserUpsertWithoutBankTransactionsInputObjectSchema as UserUpsertWithoutBankTransactionsInputObjectSchema } from './UserUpsertWithoutBankTransactionsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutBankTransactionsInputObjectSchema as UserUpdateToOneWithWhereWithoutBankTransactionsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutBankTransactionsInput.schema';
import { UserUpdateWithoutBankTransactionsInputObjectSchema as UserUpdateWithoutBankTransactionsInputObjectSchema } from './UserUpdateWithoutBankTransactionsInput.schema';
import { UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema as UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema } from './UserUncheckedUpdateWithoutBankTransactionsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutBankTransactionsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBankTransactionsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBankTransactionsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUpdateWithoutBankTransactionsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutBankTransactionsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutBankTransactionsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBankTransactionsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutBankTransactionsNestedInput>;
export const UserUpdateOneRequiredWithoutBankTransactionsNestedInputObjectZodSchema = makeSchema();
