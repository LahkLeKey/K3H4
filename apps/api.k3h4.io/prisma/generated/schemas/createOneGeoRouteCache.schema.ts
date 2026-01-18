import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './objects/GeoRouteCacheInclude.schema';
import { GeoRouteCacheCreateInputObjectSchema as GeoRouteCacheCreateInputObjectSchema } from './objects/GeoRouteCacheCreateInput.schema';
import { GeoRouteCacheUncheckedCreateInputObjectSchema as GeoRouteCacheUncheckedCreateInputObjectSchema } from './objects/GeoRouteCacheUncheckedCreateInput.schema';

export const GeoRouteCacheCreateOneSchema: z.ZodType<Prisma.GeoRouteCacheCreateArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), data: z.union([GeoRouteCacheCreateInputObjectSchema, GeoRouteCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheCreateArgs>;

export const GeoRouteCacheCreateOneZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), data: z.union([GeoRouteCacheCreateInputObjectSchema, GeoRouteCacheUncheckedCreateInputObjectSchema]) }).strict();