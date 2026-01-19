import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheSelectObjectSchema as GeoRouteCacheSelectObjectSchema } from './objects/GeoRouteCacheSelect.schema';
import { GeoRouteCacheUpdateManyMutationInputObjectSchema as GeoRouteCacheUpdateManyMutationInputObjectSchema } from './objects/GeoRouteCacheUpdateManyMutationInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './objects/GeoRouteCacheWhereInput.schema';

export const GeoRouteCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoRouteCacheUpdateManyAndReturnArgs> = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), data: GeoRouteCacheUpdateManyMutationInputObjectSchema, where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateManyAndReturnArgs>;

export const GeoRouteCacheUpdateManyAndReturnZodSchema = z.object({ select: GeoRouteCacheSelectObjectSchema.optional(), data: GeoRouteCacheUpdateManyMutationInputObjectSchema, where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict();