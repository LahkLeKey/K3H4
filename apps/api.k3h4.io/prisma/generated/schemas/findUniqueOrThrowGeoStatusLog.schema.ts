import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';

export const GeoStatusLogFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoStatusLogFindUniqueOrThrowArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogFindUniqueOrThrowArgs>;

export const GeoStatusLogFindUniqueOrThrowZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict();