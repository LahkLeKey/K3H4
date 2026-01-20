import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheUpdateManyMutationInputObjectSchema as GeoDemTileCacheUpdateManyMutationInputObjectSchema } from './objects/GeoDemTileCacheUpdateManyMutationInput.schema';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './objects/GeoDemTileCacheWhereInput.schema';

export const GeoDemTileCacheUpdateManySchema: z.ZodType<Prisma.GeoDemTileCacheUpdateManyArgs> = z.object({ data: GeoDemTileCacheUpdateManyMutationInputObjectSchema, where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpdateManyArgs>;

export const GeoDemTileCacheUpdateManyZodSchema = z.object({ data: GeoDemTileCacheUpdateManyMutationInputObjectSchema, where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict();