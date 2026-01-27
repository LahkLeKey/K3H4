import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { SortOrderSchema } from '../enums/SortOrder.schema';
import { SortOrderInputObjectSchema as SortOrderInputObjectSchema } from './SortOrderInput.schema';
import { UserOrderByWithRelationInputObjectSchema as UserOrderByWithRelationInputObjectSchema } from './UserOrderByWithRelationInput.schema';
import { ChatSessionOrderByWithRelationInputObjectSchema as ChatSessionOrderByWithRelationInputObjectSchema } from './ChatSessionOrderByWithRelationInput.schema'

const makeSchema = () => z.object({
  id: SortOrderSchema.optional(),
  userId: SortOrderSchema.optional(),
  source: SortOrderSchema.optional(),
  sessionId: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  model: SortOrderSchema.optional(),
  temperature: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  systemPrompt: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  requestBody: SortOrderSchema.optional(),
  responseBody: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  statusCode: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  errorMessage: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  metadata: z.union([SortOrderSchema, z.lazy(() => SortOrderInputObjectSchema)]).optional(),
  createdAt: SortOrderSchema.optional(),
  updatedAt: SortOrderSchema.optional(),
  user: z.lazy(() => UserOrderByWithRelationInputObjectSchema).optional(),
  session: z.lazy(() => ChatSessionOrderByWithRelationInputObjectSchema).optional()
}).strict();
export const OllamaOperationOrderByWithRelationInputObjectSchema: z.ZodType<Prisma.OllamaOperationOrderByWithRelationInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationOrderByWithRelationInput>;
export const OllamaOperationOrderByWithRelationInputObjectZodSchema = makeSchema();
