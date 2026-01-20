import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './objects/GeoQueryCacheInclude.schema';
import { GeoQueryCacheCreateInputObjectSchema as GeoQueryCacheCreateInputObjectSchema } from './objects/GeoQueryCacheCreateInput.schema';
import { GeoQueryCacheUncheckedCreateInputObjectSchema as GeoQueryCacheUncheckedCreateInputObjectSchema } from './objects/GeoQueryCacheUncheckedCreateInput.schema';

export const GeoQueryCacheCreateOneSchema: z.ZodType<Prisma.GeoQueryCacheCreateArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), data: z.union([GeoQueryCacheCreateInputObjectSchema, GeoQueryCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheCreateArgs>;

export const GeoQueryCacheCreateOneZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), data: z.union([GeoQueryCacheCreateInputObjectSchema, GeoQueryCacheUncheckedCreateInputObjectSchema]) }).strict();