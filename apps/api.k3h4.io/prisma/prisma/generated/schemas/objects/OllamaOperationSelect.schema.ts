import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { UserArgsObjectSchema as UserArgsObjectSchema } from './UserArgs.schema';
import { ChatSessionArgsObjectSchema as ChatSessionArgsObjectSchema } from './ChatSessionArgs.schema'

const makeSchema = () => z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  user: z.union([z.boolean(), z.lazy(() => UserArgsObjectSchema)]).optional(),
  source: z.boolean().optional(),
  sessionId: z.boolean().optional(),
  session: z.union([z.boolean(), z.lazy(() => ChatSessionArgsObjectSchema)]).optional(),
  model: z.boolean().optional(),
  temperature: z.boolean().optional(),
  systemPrompt: z.boolean().optional(),
  requestBody: z.boolean().optional(),
  responseBody: z.boolean().optional(),
  statusCode: z.boolean().optional(),
  errorMessage: z.boolean().optional(),
  metadata: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional()
}).strict();
export const OllamaOperationSelectObjectSchema: z.ZodType<Prisma.OllamaOperationSelect> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationSelect>;
export const OllamaOperationSelectObjectZodSchema = makeSchema();
