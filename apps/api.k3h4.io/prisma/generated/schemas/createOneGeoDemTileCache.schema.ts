import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDemTileCacheSelectObjectSchema as GeoDemTileCacheSelectObjectSchema } from './objects/GeoDemTileCacheSelect.schema';
import { GeoDemTileCacheIncludeObjectSchema as GeoDemTileCacheIncludeObjectSchema } from './objects/GeoDemTileCacheInclude.schema';
import { GeoDemTileCacheCreateInputObjectSchema as GeoDemTileCacheCreateInputObjectSchema } from './objects/GeoDemTileCacheCreateInput.schema';
import { GeoDemTileCacheUncheckedCreateInputObjectSchema as GeoDemTileCacheUncheckedCreateInputObjectSchema } from './objects/GeoDemTileCacheUncheckedCreateInput.schema';

export const GeoDemTileCacheCreateOneSchema: z.ZodType<Prisma.GeoDemTileCacheCreateArgs> = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), data: z.union([GeoDemTileCacheCreateInputObjectSchema, GeoDemTileCacheUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoDemTileCacheCreateArgs>;

export const GeoDemTileCacheCreateOneZodSchema = z.object({ select: GeoDemTileCacheSelectObjectSchema.optional(), include: GeoDemTileCacheIncludeObjectSchema.optional(), data: z.union([GeoDemTileCacheCreateInputObjectSchema, GeoDemTileCacheUncheckedCreateInputObjectSchema]) }).strict();