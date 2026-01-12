import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array().optional(),
  push: z.union([z.string(), z.string().array()]).optional()
}).strict();
export const AgricultureResourceUpdatetagsInputObjectSchema: z.ZodType<Prisma.AgricultureResourceUpdatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceUpdatetagsInput>;
export const AgricultureResourceUpdatetagsInputObjectZodSchema = makeSchema();
