import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './objects/GeoDemTileCacheInclude.schema';
import { GeoDemTileCacheUpdateInputObjectSchema as GeoDemTileCacheUpdateInputObjectSchema } from './objects/GeoDemTileCacheUpdateInput.schema';
import { GeoDemTileCacheUncheckedUpdateInputObjectSchema as GeoDemTileCacheUncheckedUpdateInputObjectSchema } from './objects/GeoDemTileCacheUncheckedUpdateInput.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './objects/GeoDemTileCacheWhereUniqueInput.schema';

export const GeoDemTileCacheUpdateOneSchema: z.ZodType<Prisma.GeoDemTileCacheUpdateArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), data: z.union([GeoDemTileCacheUpdateInputObjectSchema, GeoDemTileCacheUncheckedUpdateInputObjectSchema]), where: GeoDemTileCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpdateArgs>;

export const GeoDemTileCacheUpdateOneZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), data: z.union([GeoDemTileCacheUpdateInputObjectSchema, GeoDemTileCacheUncheckedUpdateInputObjectSchema]), where: GeoDemTileCacheWhereUniqueInputObjectSchema }).strict();