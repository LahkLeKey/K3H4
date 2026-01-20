import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './objects/GeoQueryCacheInclude.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './objects/GeoQueryCacheWhereUniqueInput.schema';

export const GeoQueryCacheFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoQueryCacheFindUniqueOrThrowArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), where: GeoQueryCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheFindUniqueOrThrowArgs>;

export const GeoQueryCacheFindUniqueOrThrowZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), where: GeoQueryCacheWhereUniqueInputObjectSchema }).strict();