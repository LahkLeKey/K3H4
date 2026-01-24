import * as z from 'zod';
export const ChatMessageUpsertResultSchema = z.object({
  id: z.string(),
  sessionId: z.string(),
  session: z.unknown(),
  role: z.unknown(),
  content: z.string(),
  metadata: z.unknown().optional(),
  createdAt: z.date()
});