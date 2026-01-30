import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntryCreateManyInputObjectSchema as OsrmCacheEntryCreateManyInputObjectSchema } from './objects/OsrmCacheEntryCreateManyInput.schema';

export const OsrmCacheEntryCreateManySchema: z.ZodType<Prisma.OsrmCacheEntryCreateManyArgs> = z.object({ data: z.union([ OsrmCacheEntryCreateManyInputObjectSchema, z.array(OsrmCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateManyArgs>;

export const OsrmCacheEntryCreateManyZodSchema = z.object({ data: z.union([ OsrmCacheEntryCreateManyInputObjectSchema, z.array(OsrmCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();