import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgriculturePlotWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgriculturePlotWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgriculturePlotWhereUniqueInput>;
export const AgriculturePlotWhereUniqueInputObjectZodSchema = makeSchema();
