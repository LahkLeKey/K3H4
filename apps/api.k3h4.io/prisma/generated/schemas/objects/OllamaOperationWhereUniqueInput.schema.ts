import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const OllamaOperationWhereUniqueInputObjectSchema: z.ZodType<Prisma.OllamaOperationWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OllamaOperationWhereUniqueInput>;
export const OllamaOperationWhereUniqueInputObjectZodSchema = makeSchema();
