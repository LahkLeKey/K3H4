import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereUniqueInputObjectSchema as UserWhereUniqueInputObjectSchema } from './UserWhereUniqueInput.schema';
import { UserCreateWithoutOllamaOperationsInputObjectSchema as UserCreateWithoutOllamaOperationsInputObjectSchema } from './UserCreateWithoutOllamaOperationsInput.schema';
import { UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema as UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedCreateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereUniqueInputObjectSchema),
  create: z.union([z.lazy(() => UserCreateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedCreateWithoutOllamaOperationsInputObjectSchema)])
}).strict();
export const UserCreateOrConnectWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserCreateOrConnectWithoutOllamaOperationsInput>;
export const UserCreateOrConnectWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
