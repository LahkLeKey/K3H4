import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserCreateWithoutOllamaOperationsInputObjectSchema as UserCreateWithoutOllamaOperationsInputObjectSchema } from './UserCreateWithoutOllamaOperationsInput.schema';
import { UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema as UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedCreateWithoutOllamaOperationsInput.schema';
import { UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema as UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema } from './UserCreateOrConnectWithoutOllamaOperationsInput.schema';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema'

const makeSchema = () => z.object({
  create: z.union([z.lazy(() => UserCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema)]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputObjectSchema).optional()
}).strict();
export const UserCreateNestedOneWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateNestedOneWithoutOllamaOperationsInput>;
export const UserCreateNestedOneWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
