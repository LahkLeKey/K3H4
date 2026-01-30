import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheIncludeObjectSchema as GeoRouteCacheIncludeObjectSchema } from './objects/GeoRouteCacheInclude.schema';
import { GeoRouteCacheWhereUniqueInputObjectSchema as GeoRouteCacheWhereUniqueInputObjectSchema } from './objects/GeoRouteCacheWhereUniqueInput.schema';
import { GeoRouteCacheCreateInputObjectSchema as GeoRouteCacheCreateInputObjectSchema } from './objects/GeoRouteCacheCreateInput.schema';
import { GeoRouteCacheUncheckedCreateInputObjectSchema as GeoRouteCacheUncheckedCreateInputObjectSchema } from './objects/GeoRouteCacheUncheckedCreateInput.schema';
import { GeoRouteCacheUpdateInputObjectSchema as GeoRouteCacheUpdateInputObjectSchema } from './objects/GeoRouteCacheUpdateInput.schema';
import { GeoRouteCacheUncheckedUpdateInputObjectSchema as GeoRouteCacheUncheckedUpdateInputObjectSchema } from './objects/GeoRouteCacheUncheckedUpdateInput.schema';

export const GeoRouteCacheUpsertOneSchema: z.ZodType<Prisma.GeoRouteCacheUpsertArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), where: GeoRouteCacheWhereUniqueInputObjectSchema, create: z.union([ GeoRouteCacheCreateInputObjectSchema, GeoRouteCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoRouteCacheUpdateInputObjectSchema, GeoRouteCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheUpsertArgs>;

export const GeoRouteCacheUpsertOneZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), include: GeoRouteCacheIncludeObjectSchema.optional(), where: GeoRouteCacheWhereUniqueInputObjectSchema, create: z.union([ GeoRouteCacheCreateInputObjectSchema, GeoRouteCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoRouteCacheUpdateInputObjectSchema, GeoRouteCacheUncheckedUpdateInputObjectSchema ]) }).strict();