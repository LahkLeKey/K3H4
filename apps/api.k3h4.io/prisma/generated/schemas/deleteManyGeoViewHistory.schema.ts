import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoViewHistoryWhereInputObjectSchema as GeoViewHistoryWhereInputObjectSchema } from './objects/GeoViewHistoryWhereInput.schema';

export const GeoViewHistoryDeleteManySchema: z.ZodType<Prisma.GeoViewHistoryDeleteManyArgs> = z.object({ where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoViewHistoryDeleteManyArgs>;

export const GeoViewHistoryDeleteManyZodSchema = z.object({ where: GeoViewHistoryWhereInputObjectSchema.optional() }).strict();