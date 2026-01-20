import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheSelectObjectSchema as GeoQueryCacheSelectObjectSchema } from './objects/GeoQueryCacheSelect.schema';
import { GeoQueryCacheUpdateManyMutationInputObjectSchema as GeoQueryCacheUpdateManyMutationInputObjectSchema } from './objects/GeoQueryCacheUpdateManyMutationInput.schema';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './objects/GeoQueryCacheWhereInput.schema';

export const GeoQueryCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoQueryCacheUpdateManyAndReturnArgs> = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), data: GeoQueryCacheUpdateManyMutationInputObjectSchema, where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateManyAndReturnArgs>;

export const GeoQueryCacheUpdateManyAndReturnZodSchema = z.object({ select: GeoQueryCacheSelectObjectSchema.optional(), data: GeoQueryCacheUpdateManyMutationInputObjectSchema, where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict();