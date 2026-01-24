import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const ChatSessionWhereUniqueInputObjectSchema: z.ZodType<Prisma.ChatSessionWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.ChatSessionWhereUniqueInput>;
export const ChatSessionWhereUniqueInputObjectZodSchema = makeSchema();
