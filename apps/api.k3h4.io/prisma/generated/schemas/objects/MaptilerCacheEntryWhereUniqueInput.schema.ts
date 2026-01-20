import * as z from 'zod';
import type { Prisma } from '@prisma/client';


const makeSchema = () => z.object({
  id: z.string().optional(),
  signature: z.string().optional()
}).strict();
export const MaptilerCacheEntryWhereUniqueInputObjectSchema: z.ZodType<Prisma.MaptilerCacheEntryWhereUniqueInput> = makeSchema() as unknown as z.ZodType<Prisma.MaptilerCacheEntryWhereUniqueInput>;
export const MaptilerCacheEntryWhereUniqueInputObjectZodSchema = makeSchema();
