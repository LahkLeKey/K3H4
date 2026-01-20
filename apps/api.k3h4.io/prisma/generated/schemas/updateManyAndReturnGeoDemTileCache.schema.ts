import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheUpdateManyMutationInputObjectSchema as GeoDemTileCacheUpdateManyMutationInputObjectSchema } from './objects/GeoDemTileCacheUpdateManyMutationInput.schema';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './objects/GeoDemTileCacheWhereInput.schema';

export const GeoDemTileCacheUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoDemTileCacheUpdateManyAndReturnArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), data: GeoDemTileCacheUpdateManyMutationInputObjectSchema, where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpdateManyAndReturnArgs>;

export const GeoDemTileCacheUpdateManyAndReturnZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), data: GeoDemTileCacheUpdateManyMutationInputObjectSchema, where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict();