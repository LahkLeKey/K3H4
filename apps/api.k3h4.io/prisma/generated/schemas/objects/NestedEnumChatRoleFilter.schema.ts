import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatRoleSchema } from '../enums/ChatRole.schema'

const nestedenumchatrolefilterSchema = z.object({
  equals: ChatRoleSchema.optional(),
  in: ChatRoleSchema.array().optional(),
  notIn: ChatRoleSchema.array().optional(),
  not: z.union([ChatRoleSchema, z.lazy(() => NestedEnumChatRoleFilterObjectSchema)]).optional()
}).strict();
export const NestedEnumChatRoleFilterObjectSchema: z.ZodType<Prisma.NestedEnumChatRoleFilter> = nestedenumchatrolefilterSchema as unknown as z.ZodType<Prisma.NestedEnumChatRoleFilter>;
export const NestedEnumChatRoleFilterObjectZodSchema = nestedenumchatrolefilterSchema;
