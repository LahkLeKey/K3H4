import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgricultureResourceWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureResourceWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureResourceWhereUniqueInput>;
export const AgricultureResourceWhereUniqueInputObjectZodSchema = makeSchema();
