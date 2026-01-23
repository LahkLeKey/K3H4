import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionWhereInputObjectSchema as ChatSessionWhereInputObjectSchema } from './ChatSessionWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => ChatSessionWhereInputObjectSchema).optional()
}).strict();
export const UserCountOutputTypeCountChatSessionsArgsObjectSchema = makeSchema();
export const UserCountOutputTypeCountChatSessionsArgsObjectZodSchema = makeSchema();
