import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { ChatSessionCreateManyUserInputObjectSchema as ChatSessionCreateManyUserInputObjectSchema } from './ChatSessionCreateManyUserInput.schema'

const makeSchema = () => z.object({
  data: z.union([z.lazy(() => ChatSessionCreateManyUserInputObjectSchema), z.lazy(() => ChatSessionCreateManyUserInputObjectSchema).array()]),
  skipDuplicates: z.boolean().optional()
}).strict();
export const ChatSessionCreateManyUserInputEnvelopeObjectSchema: z.ZodType<Prisma.ChatSessionCreateManyUserInputEnvelope> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionCreateManyUserInputEnvelope>;
export const ChatSessionCreateManyUserInputEnvelopeObjectZodSchema = makeSchema();
