import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntrySelectObjectSchema as OsrmCacheEntrySelectObjectSchema } from './objects/OsrmCacheEntrySelect.schema';
import { OsrmCacheEntryUpdateManyMutationInputObjectSchema as OsrmCacheEntryUpdateManyMutationInputObjectSchema } from './objects/OsrmCacheEntryUpdateManyMutationInput.schema';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './objects/OsrmCacheEntryWhereInput.schema';

export const OsrmCacheEntryUpdateManyAndReturnSchema: z.ZodType<Prisma.OsrmCacheEntryUpdateManyAndReturnArgs> = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), data: OsrmCacheEntryUpdateManyMutationInputObjectSchema, where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateManyAndReturnArgs>;

export const OsrmCacheEntryUpdateManyAndReturnZodSchema = z.object({ select: OsrmCacheEntrySelectObjectSchema.optional(), data: OsrmCacheEntryUpdateManyMutationInputObjectSchema, where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict();