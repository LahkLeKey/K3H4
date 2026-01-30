import * as z from 'zod';
import { ChatRoleSchema } from '../../enums/ChatRole.schema';
// prettier-ignore
export const ChatMessageInputSchema = z.object({
    id: z.string(),
    sessionId: z.string(),
    session: z.unknown(),
    role: ChatRoleSchema,
    content: z.string(),
    metadata: z.unknown().optional().nullable(),
    createdAt: z.date()
}).strict();

export type ChatMessageInputType = z.infer<typeof ChatMessageInputSchema>;
