import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheIncludeObjectSchema as GeoQueryCacheIncludeObjectSchema } from './objects/GeoQueryCacheInclude.schema';
import { GeoQueryCacheWhereUniqueInputObjectSchema as GeoQueryCacheWhereUniqueInputObjectSchema } from './objects/GeoQueryCacheWhereUniqueInput.schema';
import { GeoQueryCacheCreateInputObjectSchema as GeoQueryCacheCreateInputObjectSchema } from './objects/GeoQueryCacheCreateInput.schema';
import { GeoQueryCacheUncheckedCreateInputObjectSchema as GeoQueryCacheUncheckedCreateInputObjectSchema } from './objects/GeoQueryCacheUncheckedCreateInput.schema';
import { GeoQueryCacheUpdateInputObjectSchema as GeoQueryCacheUpdateInputObjectSchema } from './objects/GeoQueryCacheUpdateInput.schema';
import { GeoQueryCacheUncheckedUpdateInputObjectSchema as GeoQueryCacheUncheckedUpdateInputObjectSchema } from './objects/GeoQueryCacheUncheckedUpdateInput.schema';

export const GeoQueryCacheUpsertOneSchema: z.ZodType<Prisma.GeoQueryCacheUpsertArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), where: GeoQueryCacheWhereUniqueInputObjectSchema, create: z.union([ GeoQueryCacheCreateInputObjectSchema, GeoQueryCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoQueryCacheUpdateInputObjectSchema, GeoQueryCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheUpsertArgs>;

export const GeoQueryCacheUpsertOneZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), include: GeoQueryCacheIncludeObjectSchema.optional(), where: GeoQueryCacheWhereUniqueInputObjectSchema, create: z.union([ GeoQueryCacheCreateInputObjectSchema, GeoQueryCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoQueryCacheUpdateInputObjectSchema, GeoQueryCacheUncheckedUpdateInputObjectSchema ]) }).strict();