import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserWhereInputObjectSchema as UserWhereInputObjectSchema } from './UserWhereInput.schema';
import { UserUpdateWithoutOllamaOperationsInputObjectSchema as UserUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUpdateWithoutOllamaOperationsInput.schema';
import { UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema as UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema } from './UserUncheckedUpdateWithoutOllamaOperationsInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => UserWhereInputObjectSchema).optional(),
  data: z.union([z.lazy(() => UserUpdateWithoutOllamaOperationsInputObjectSchema), z.lazy(() => UserUncheckedUpdateWithoutOllamaOperationsInputObjectSchema)])
}).strict();
export const UserUpdateToOneWithWhereWithoutOllamaOperationsInputObjectSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOllamaOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutOllamaOperationsInput>;
export const UserUpdateToOneWithWhereWithoutOllamaOperationsInputObjectZodSchema = makeSchema();
