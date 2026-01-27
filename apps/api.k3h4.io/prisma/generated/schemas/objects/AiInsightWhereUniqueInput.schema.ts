import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AiInsightWhereUniqueInputObjectSchema: z.ZodType<Prisma.AiInsightWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AiInsightWhereUniqueInput>;
export const AiInsightWhereUniqueInputObjectZodSchema = makeSchema();
