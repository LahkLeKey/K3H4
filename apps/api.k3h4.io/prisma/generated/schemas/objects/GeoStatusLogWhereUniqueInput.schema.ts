import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional()
}).strict();
export const GeoStatusLogWhereUniqueInputObjectSchema: z.ZodType<Prisma.GeoStatusLogWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.GeoStatusLogWhereUniqueInput>;
export const GeoStatusLogWhereUniqueInputObjectZodSchema = makeSchema();
