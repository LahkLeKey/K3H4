import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoQueryCacheUpdateManyMutationInputObjectSchema as GeoQueryCacheUpdateManyMutationInputObjectSchema } from './objects/GeoQueryCacheUpdateManyMutationInput.schema';
import { GeoQueryCacheWhereInputObjectSchema as GeoQueryCacheWhereInputObjectSchema } from './objects/GeoQueryCacheWhereInput.schema';

export const GeoQueryCacheUpdateManySchema: z.ZodType<Prisma.GeoQueryCacheUpdateManyArgs> = z.object({ data: GeoQueryCacheUpdateManyMutationInputObjectSchema, where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoQueryCacheUpdateManyArgs>;

export const GeoQueryCacheUpdateManyZodSchema = z.object({ data: GeoQueryCacheUpdateManyMutationInputObjectSchema, where: GeoQueryCacheWhereInputObjectSchema.optional() }).strict();