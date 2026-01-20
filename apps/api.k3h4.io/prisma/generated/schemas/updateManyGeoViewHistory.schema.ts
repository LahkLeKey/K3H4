import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistoryUpdateManyMutationInputObjectSchema as GeoViewHistoryUpdateManyMutationInputObjectSchema } from './objects/GeoViewHistoryUpdateManyMutationInput.schema';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './objects/GeoViewHistoryWhereInput.schema';

export const GeoViewHistoryUpdateManySchema: z.ZodType<Prisma.GeoViewHistoryUpdateManyArgs> = z.object({ data: GeoViewHistoryUpdateManyMutationInputObjectSchema, where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryUpdateManyArgs>;

export const GeoViewHistoryUpdateManyZodSchema = z.object({ data: GeoViewHistoryUpdateManyMutationInputObjectSchema, where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict();