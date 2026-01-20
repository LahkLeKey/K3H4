import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const GeoQueryCacheWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoQueryCacheWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoQueryCacheWhereUniqueInput>;
export const GeoQueryCacheWhereUniqueInputObjectZodSchema = makeSchema();
