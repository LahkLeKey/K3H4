import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './objects/GeoDirectionStopWhereInput.schema';

export const GeoDirectionStopDeleteManySchema: z.ZodType<Prisma.GeoDirectionStopDeleteManyArgs> = z.object({ where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopDeleteManyArgs>;

export const GeoDirectionStopDeleteManyZodSchema = z.object({ where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict();