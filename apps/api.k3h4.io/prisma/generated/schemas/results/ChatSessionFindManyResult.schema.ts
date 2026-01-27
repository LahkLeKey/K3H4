import * as z from 'zod';
export const ChatSessionFindManyResultSchema = z.object({
  data: z.array(z.object({
  id: z.string(),
  userId: z.string(),
  user: z.unknown(),
  title: z.string().optional(),
  systemPrompt: z.string().optional(),
  model: z.string().optional(),
  temperature: z.number().optional(),
  metadata: z.unknown().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  messages: z.array(z.unknown()),
  ollamaOperations: z.array(z.unknown())
})),
  pagination: z.object({
  page: z.number().int().min(1),
  pageSize: z.number().int().min(1),
  total: z.number().int().min(0),
  totalPages: z.number().int().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean()
})
});