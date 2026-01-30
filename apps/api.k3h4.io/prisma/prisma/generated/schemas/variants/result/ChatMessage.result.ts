import * as z from 'zod';
import { ChatRoleSchema } from '../../enums/ChatRole.schema';
// prettier-ignore
export const ChatMessageResultSchema = z.object({
    id: z.string(),
    sessionId: z.string(),
    session: z.unknown(),
    role: ChatRoleSchema,
    content: z.string(),
    metadata: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type ChatMessageResultType = z.infer<typeof ChatMessageResultSchema>;
