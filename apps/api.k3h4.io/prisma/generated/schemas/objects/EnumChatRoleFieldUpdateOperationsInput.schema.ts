import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatRoleSchema } from '../enums/ChatRole.schema'

const makeSchema = () => z.object({
  set: ChatRoleSchema.optional()
}).strict();
export const EnumChatRoleFieldUpdateOperationsInputObjectSchema: z.ZodType<Prisma.EnumChatRoleFieldUpdateOperationsInput> = makeSchema() as unknown as z.ZodType<Prisma.EnumChatRoleFieldUpdateOperationsInput>;
export const EnumChatRoleFieldUpdateOperationsInputObjectZodSchema = makeSchema();
