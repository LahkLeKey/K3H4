import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgricultureTaskWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureTaskWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureTaskWhereUniqueInput>;
export const AgricultureTaskWhereUniqueInputObjectZodSchema = makeSchema();
