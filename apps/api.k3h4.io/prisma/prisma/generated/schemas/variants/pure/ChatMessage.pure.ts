import * as z from 'zod';
import { ChatRoleSchema } from '../../enums/ChatRole.schema';
// prettier-ignore
export const ChatMessageModelSchema = z.object({
    id: z.string(),
    sessionId: z.string(),
    session: z.unknown(),
    role: ChatRoleSchema,
    content: z.string(),
    metadata: z.unknown().nullable(),
    createdAt: z.date()
}).strict();

export type ChatMessagePureType = z.infer<typeof ChatMessageModelSchema>;
