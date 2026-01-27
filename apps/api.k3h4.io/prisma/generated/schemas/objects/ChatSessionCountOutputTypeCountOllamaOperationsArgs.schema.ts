import * as z from 'zod';
import type { Prisma } from '@prisma/client';
import { OllamaOperationWhereInputObjectSchema as OllamaOperationWhereInputObjectSchema } from './OllamaOperationWhereInput.schema'

const makeSchema = () => z.object({
  where: z.lazy(() => OllamaOperationWhereInputObjectSchema).optional()
}).strict();
export const ChatSessionCountOutputTypeCountOllamaOperationsArgsObjectSchema = makeSchema();
export const ChatSessionCountOutputTypeCountOllamaOperationsArgsObjectZodSchema = makeSchema();
