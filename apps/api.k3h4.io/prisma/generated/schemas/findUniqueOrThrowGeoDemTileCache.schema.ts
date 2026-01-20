import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './objects/GeoDemTileCacheInclude.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './objects/GeoDemTileCacheWhereUniqueInput.schema';

export const GeoDemTileCacheFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoDemTileCacheFindUniqueOrThrowArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), where: GeoDemTileCacheWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheFindUniqueOrThrowArgs>;

export const GeoDemTileCacheFindUniqueOrThrowZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), where: GeoDemTileCacheWhereUniqueInputObjectSchema }).strict();