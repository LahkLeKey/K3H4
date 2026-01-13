import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  set: z.string().array()
}).strict();
export const AgricultureResourceCreatetagsInputObjectSchema: z.ZodType<Prisma.AgricultureResourceCreatetagsInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceCreatetagsInput>;
export const AgricultureResourceCreatetagsInputObjectZodSchema = makeSchema();
