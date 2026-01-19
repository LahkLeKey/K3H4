import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoRouteCacheUpdateManyMutationInputObjectSchema as GeoRouteCacheUpdateManyMutationInputObjectSchema } from './objects/GeoRouteCacheUpdateManyMutationInput.schema';
import { GeoRouteCacheWhereInputObjectSchema as GeoRouteCacheWhereInputObjectSchema } from './objects/GeoRouteCacheWhereInput.schema';

export const GeoRouteCacheUpdateManySchema: z.ZodType<Prisma.GeoRouteCacheUpdateManyArgs> = z.object({ data: GeoRouteCacheUpdateManyMutationInputObjectSchema, where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoRouteCacheUpdateManyArgs>;

export const GeoRouteCacheUpdateManyZodSchema = z.object({ data: GeoRouteCacheUpdateManyMutationInputObjectSchema, where: GeoRouteCacheWhereInputObjectSchema.optional() }).strict();