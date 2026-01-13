import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const AgricultureCropPlanWhereUniqueInputObjectSchema: z.ZodType<Prisma.AgricultureCropPlanWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.AgricultureCropPlanWhereUniqueInput>;
export const AgricultureCropPlanWhereUniqueInputObjectZodSchema = makeSchema();
