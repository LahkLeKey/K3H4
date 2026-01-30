import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheWhereInputObjectSchema as GeoDemTileCacheWhereInputObjectSchema } from './objects/GeoDemTileCacheWhereInput.schema';

export const GeoDemTileCacheDeleteManySchema: z.ZodType<Prisma.GeoDemTileCacheDeleteManyArgs> = z.object({ where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheDeleteManyArgs>;

export const GeoDemTileCacheDeleteManyZodSchema = z.object({ where: GeoDemTileCacheWhereInputObjectSchema.optional() }).strict();