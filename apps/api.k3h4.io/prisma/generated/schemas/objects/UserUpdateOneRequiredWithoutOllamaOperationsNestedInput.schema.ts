import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOllamaOperationsInputObjectSchema as UserCreateWithoutOllamaOperationsInputObjectSchema } from './UserCreateWithoutOllamaOperationsInput.schema';
import { UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema as UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedCreateWithoutOllamaOperationsInput.schema';
import { UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema as UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema } from './UserCreateOrConnectWithoutOllamaOperationsInput.schema';
import { UserUpsertWithoutOllamaOperationsInputObjectSchema as UserUpsertWithoutOllamaOperationsInputObjectSchema } from './UserUpsertWithoutOllamaOperationsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema as UserUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema } from './UserUpdateToOneWithWhereWithoutOllamaOperationsInput.schema';
import { UserUpdateWithoutOllamaOperationsInputObjectSchema as UserUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUpdateWithoutOllamaOperationsInput.schema';
import { UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedUpdateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutOllamaOperationsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional(),
  update: z.union([z.lazy(() => UserUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)]).optional()
}).strict();
export const UserUpdateOneRequiredWithoutOllamaOperationsNestedInputObjectSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutOllamaOperationsNestedInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateOneRequiredWithoutOllamaOperationsNestedInput>;
export const UserUpdateOneRequiredWithoutOllamaOperationsNestedInputObjectZodSchema = makeSchema();
