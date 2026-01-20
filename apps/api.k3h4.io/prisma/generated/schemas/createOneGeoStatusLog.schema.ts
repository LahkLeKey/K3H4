import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogCreateInputObjectSchema as GeoStatusLogCreateInputObjectSchema } from './objects/GeoStatusLogCreateInput.schema';
import { GeoStatusLogUncheckedCreateInputObjectSchema as GeoStatusLogUncheckedCreateInputObjectSchema } from './objects/GeoStatusLogUncheckedCreateInput.schema';

export const GeoStatusLogCreateOneSchema: z.ZodType<Prisma.GeoStatusLogCreateArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), data: z.union([GeoStatusLogCreateInputObjectSchema, GeoStatusLogUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogCreateArgs>;

export const GeoStatusLogCreateOneZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), data: z.union([GeoStatusLogCreateInputObjectSchema, GeoStatusLogUncheckedCreateInputObjectSchema]) }).strict();