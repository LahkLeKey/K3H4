import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogUpdateInputObjectSchema as GeoStatusLogUpdateInputObjectSchema } from './objects/GeoStatusLogUpdateInput.schema';
import { GeoStatusLogUncheckedUpdateInputObjectSchema as GeoStatusLogUncheckedUpdateInputObjectSchema } from './objects/GeoStatusLogUncheckedUpdateInput.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';

export const GeoStatusLogUpdateOneSchema: z.ZodType<Prisma.GeoStatusLogUpdateArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), data: z.union([GeoStatusLogUpdateInputObjectSchema, GeoStatusLogUncheckedUpdateInputObjectSchema]), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateArgs>;

export const GeoStatusLogUpdateOneZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), data: z.union([GeoStatusLogUpdateInputObjectSchema, GeoStatusLogUncheckedUpdateInputObjectSchema]), where: GeoStatusLogWhereUniqueInputObjectSchema }).strict();