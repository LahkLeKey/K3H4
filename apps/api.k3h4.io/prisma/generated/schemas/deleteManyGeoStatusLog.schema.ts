import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './objects/GeoStatusLogWhereInput.schema';

export const GeoStatusLogDeleteManySchema: z.ZodType<Prisma.GeoStatusLogDeleteManyArgs> = z.object({ where: GeoStatusLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogDeleteManyArgs>;

export const GeoStatusLogDeleteManyZodSchema = z.object({ where: GeoStatusLogWhereInputObjectSchema.optional() }).strict();