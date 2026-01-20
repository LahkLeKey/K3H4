import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './objects/GeoDemTileCacheInclude.schema';
import { GeoDemTileCacheWhereUniqueInputObjectSchema as GeoDemTileCacheWhereUniqueInputObjectSchema } from './objects/GeoDemTileCacheWhereUniqueInput.schema';
import { GeoDemTileCacheCreateInputObjectSchema as GeoDemTileCacheCreateInputObjectSchema } from './objects/GeoDemTileCacheCreateInput.schema';
import { GeoDemTileCacheUncheckedCreateInputObjectSchema as GeoDemTileCacheUncheckedCreateInputObjectSchema } from './objects/GeoDemTileCacheUncheckedCreateInput.schema';
import { GeoDemTileCacheUpdateInputObjectSchema as GeoDemTileCacheUpdateInputObjectSchema } from './objects/GeoDemTileCacheUpdateInput.schema';
import { GeoDemTileCacheUncheckedUpdateInputObjectSchema as GeoDemTileCacheUncheckedUpdateInputObjectSchema } from './objects/GeoDemTileCacheUncheckedUpdateInput.schema';

export const GeoDemTileCacheUpsertOneSchema: z.ZodType<Prisma.GeoDemTileCacheUpsertArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), where: GeoDemTileCacheWhereUniqueInputObjectSchema, create: z.union([ GeoDemTileCacheCreateInputObjectSchema, GeoDemTileCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDemTileCacheUpdateInputObjectSchema, GeoDemTileCacheUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheUpsertArgs>;

export const GeoDemTileCacheUpsertOneZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), where: GeoDemTileCacheWhereUniqueInputObjectSchema, create: z.union([ GeoDemTileCacheCreateInputObjectSchema, GeoDemTileCacheUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDemTileCacheUpdateInputObjectSchema, GeoDemTileCacheUncheckedUpdateInputObjectSchema ]) }).strict();