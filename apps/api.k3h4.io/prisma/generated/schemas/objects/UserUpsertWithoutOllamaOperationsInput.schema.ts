import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserUpdateWithoutOllamaOperationsInputObjectSchema as UserUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUpdateWithoutOllamaOperationsInput.schema';
import { UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedUpdateWithoutOllamaOperationsInput.schema';
import { UserCreateWithoutOllamaOperationsInputObjectSchema as UserCreateWithoutOllamaOperationsInputObjectSchema } from './UserCreateWithoutOllamaOperationsInput.schema';
import { UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema as UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedCreateWithoutOllamaOperationsInput.schema';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema'

const makeSchema = () => z.object({
  update: z.union([z.lazy(() => UserUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)]),
  create: z.union([z.lazy(() => UserCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]),
  where: z.lazy(() => UserWhereInputObjectSchema).optional()
}).strict();
export const UserUpsertWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.UserUpsertWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpsertWithoutOllamaOperationsInput>;
export const UserUpsertWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
