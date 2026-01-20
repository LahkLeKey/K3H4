import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistorySelectObjectSchema as GeoViewHistorySelectObjectSchema } from './objects/GeoViewHistorySelect.schema';
import { GeoViewHistoryUpdateManyMutationInputObjectSchema as GeoViewHistoryUpdateManyMutationInputObjectSchema } from './objects/GeoViewHistoryUpdateManyMutationInput.schema';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './objects/GeoViewHistoryWhereInput.schema';

export const GeoViewHistoryUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoViewHistoryUpdateManyAndReturnArgs> = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), data: GeoViewHistoryUpdateManyMutationInputObjectSchema, where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateManyAndReturnArgs>;

export const GeoViewHistoryUpdateManyAndReturnZodSchema = z.object({ select: GeoViewHistorySelectObjectSchema.optional(), data: GeoViewHistoryUpdateManyMutationInputObjectSchema, where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict();