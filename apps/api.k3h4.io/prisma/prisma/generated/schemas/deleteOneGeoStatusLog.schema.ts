import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';

export const GeoStatusLogDeleteOneSchema: z.ZodType<Prisma.GeoStatusLogDeleteArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogDeleteArgs>;

export const GeoStatusLogDeleteOneZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict();