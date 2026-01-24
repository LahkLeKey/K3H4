import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatMessageCreateManySessionInputObjectSchema as ChatMessageCreateManySessionInputObjectSchema } from './ChatMessageCreateManySessionInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ChatMessageCreateManySessionInputObjectSchema), z.lazy(() => ChatMessageCreateManySessionInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ChatMessageCreateManySessionInputEnvelopeObjectSchema: z.ZodType<Prisma.ChatMessageCreateManySessionInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ChatMessageCreateManySessionInputEnvelope>;
export const ChatMessageCreateManySessionInputEnvelopeObjectZodSchema = makeSchema();
