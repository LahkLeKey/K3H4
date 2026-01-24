import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatRoleSchema } from '../enums/ChatRole.schema';
import { NestedIntFilterObjectSchema as NestedIntFilterObjectSchema } from './NestedIntFilter.schema';
import { NestedEnumChatRoleFilterObjectSchema as NestedEnumChatRoleFilterObjectSchema } from './NestedEnumChatRoleFilter.schema'

const nestedenumchatrolewithaggregatesfilterSchema = z.object({
  equals: ChatRoleSchema.optional(),
  in: ChatRoleSchema.array().optional(),
  notIn: ChatRoleSchema.array().optional(),
  not: z.union([ChatRoleSchema, z.lazy(() => NestedEnumChatRoleWithAggregatesFilterObjectSchema)]).optional(),
  _count: z.lazy(() => NestedIntFilterObjectSchema).optional(),
  _min: z.lazy(() => NestedEnumChatRoleFilterObjectSchema).optional(),
  _max: z.lazy(() => NestedEnumChatRoleFilterObjectSchema).optional()
}).strict();
export const NestedEnumChatRoleWithAggregatesFilterObjectSchema: z.ZodType<Prisma.NestedEnumChatRoleWithAggregatesFilter> = nestedenumchatrolewithaggregatesfilterSchema as unknown as z.ZodType<Prisma.NestedEnumChatRoleWithAggregatesFilter>;
export const NestedEnumChatRoleWithAggregatesFilterObjectZodSchema = nestedenumchatrolewithaggregatesfilterSchema;
