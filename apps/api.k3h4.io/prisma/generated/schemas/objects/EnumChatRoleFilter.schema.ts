import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { NestedEnumChatRoleFilterObjectSchema as NestedEnumChatRoleFilterObjectSchema } from './NestedEnumChatRoleFilter.schema'

const makeSchema = () => z.object({
  equals: ChatRoleSchema.optional(),
  in: ChatRoleSchema.array().optional(),
  notIn: ChatRoleSchema.array().optional(),
  not: z.union([ChatRoleSchema, z.lazy(() => NestedEnumChatRoleFilterObjectSchema)]).optional()
}).strict();
export const EnumChatRoleFilterObjectSchema: z.ZodType<Prisma.EnumChatRoleFilter> = makeSchema() as unknown as z.ZodType<Prisma.EnumChatRoleFilter>;
export const EnumChatRoleFilterObjectZodSchema = makeSchema();
