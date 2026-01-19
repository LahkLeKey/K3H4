import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const GeoRouteCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoRouteCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoRouteCacheWhereUniqueInput>;
export const GeoRouteCacheWhereUniqueInputObjectZodSchema = makeSchema();
