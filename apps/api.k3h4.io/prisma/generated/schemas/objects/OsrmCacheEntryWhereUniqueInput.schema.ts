import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const OsrmCacheEntryWhereUniqueInputObjectSchema: z.ZodType<Prisma.OsrmCacheEntryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.OsrmCacheEntryWhereUniqueInput>;
export const OsrmCacheEntryWhereUniqueInputObjectZodSchema = makeSchema();
