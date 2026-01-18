import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryCreateManyInputObjectSchema as OsrmCacheEntryCreateManyInputObjectSchema } from './objects/OsrmCacheEntryCreateManyInput.schema';

export const OsrmCacheEntryCreateManyAndReturnSchema: z.ZodType<Prisma.OsrmCacheEntryCreateManyAndReturnArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), data: z.union([ OsrmCacheEntryCreateManyInputObjectSchema, z.array(OsrmCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryCreateManyAndReturnArgs>;

export const OsrmCacheEntryCreateManyAndReturnZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), data: z.union([ OsrmCacheEntryCreateManyInputObjectSchema, z.array(OsrmCacheEntryCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();