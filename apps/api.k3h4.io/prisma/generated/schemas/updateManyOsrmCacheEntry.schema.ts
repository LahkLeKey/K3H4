import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { OsrmCacheEntryUpdateManyMutationInputObjectSchema as OsrmCacheEntryUpdateManyMutationInputObjectSchema } from './objects/OsrmCacheEntryUpdateManyMutationInput.schema';
import { OsrmCacheEntryWhereInputObjectSchema as OsrmCacheEntryWhereInputObjectSchema } from './objects/OsrmCacheEntryWhereInput.schema';

export const OsrmCacheEntryUpdateManySchema: z.ZodType<Prisma.OsrmCacheEntryUpdateManyArgs> = z.object({ data: OsrmCacheEntryUpdateManyMutationInputObjectSchema, where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.OsrmCacheEntryUpdateManyArgs>;

export const OsrmCacheEntryUpdateManyZodSchema = z.object({ data: OsrmCacheEntryUpdateManyMutationInputObjectSchema, where: OsrmCacheEntryWhereInputObjectSchema.optional() }).strict();