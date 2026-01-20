import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheCreateManyInputObjectSchema as GeoDemTileCacheCreateManyInputObjectSchema } from './objects/GeoDemTileCacheCreateManyInput.schema';

export const GeoDemTileCacheCreateManyAndReturnSchema: z.ZodType<Prisma.GeoDemTileCacheCreateManyAndReturnArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), data: z.union([ GeoDemTileCacheCreateManyInputObjectSchema, z.array(GeoDemTileCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateManyAndReturnArgs>;

export const GeoDemTileCacheCreateManyAndReturnZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), data: z.union([ GeoDemTileCacheCreateManyInputObjectSchema, z.array(GeoDemTileCacheCreateManyInputObjectSchema) ]), skipDuplicates: z.boolean().optional() }).strict();