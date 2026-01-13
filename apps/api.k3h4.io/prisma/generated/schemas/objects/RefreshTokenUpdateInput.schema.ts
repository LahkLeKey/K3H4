import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { StringFieldUpdateOperationsInputObjectSchema as StringFieldUpdateOperationsInputObjectSchema } from './StringFieldUpdateOperationsInput.schema';
import { DateTimeFieldUpdateOperationsInputObjectSchema as DateTimeFieldUpdateOperationsInputObjectSchema } from './DateTimeFieldUpdateOperationsInput.schema';
import { UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectSchema as UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectSchema } from './UserUpdateOneRequiredWithoutRefreshTokensNestedInput.schema'

const makeSchema = () => z.object({
  id: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  token: z.union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputObjectSchema)]).optional(),
  createdAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  expiresAt: z.union([z.coerce.date(), z.lazy(() => DateTimeFieldUpdateOperationsInputObjectSchema)]).optional(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutRefreshTokensNestedInputObjectSchema).optional()
}).strict();
export const RefreshTokenUpdateInputObjectSchema: z.ZodType<Prisma.RefreshTokenUpdateInput> = makeSchema() as unknown as z.ZodType<Prisma.RefreshTokenUpdateInput>;
export const RefreshTokenUpdateInputObjectZodSchema = makeSchema();
