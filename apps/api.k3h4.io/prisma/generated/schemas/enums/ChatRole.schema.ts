import * as z from 'zod';

export const ChatRoleSchema = z.enum(['SYSTEM', 'USER', 'ASSISTANT'])

export type ChatRole = z.infer<typeof ChatRoleSchema>;