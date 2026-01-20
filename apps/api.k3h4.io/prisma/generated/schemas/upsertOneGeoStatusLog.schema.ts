import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogIncludeObjectSchema as GeoStatusLogIncludeObjectSchema } from './objects/GeoStatusLogInclude.schema';
import { GeoStatusLogWhereUniqueInputObjectSchema as GeoStatusLogWhereUniqueInputObjectSchema } from './objects/GeoStatusLogWhereUniqueInput.schema';
import { GeoStatusLogCreateInputObjectSchema as GeoStatusLogCreateInputObjectSchema } from './objects/GeoStatusLogCreateInput.schema';
import { GeoStatusLogUncheckedCreateInputObjectSchema as GeoStatusLogUncheckedCreateInputObjectSchema } from './objects/GeoStatusLogUncheckedCreateInput.schema';
import { GeoStatusLogUpdateInputObjectSchema as GeoStatusLogUpdateInputObjectSchema } from './objects/GeoStatusLogUpdateInput.schema';
import { GeoStatusLogUncheckedUpdateInputObjectSchema as GeoStatusLogUncheckedUpdateInputObjectSchema } from './objects/GeoStatusLogUncheckedUpdateInput.schema';

export const GeoStatusLogUpsertOneSchema: z.ZodType<Prisma.GeoStatusLogUpsertArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema, create: z.union([ GeoStatusLogCreateInputObjectSchema, GeoStatusLogUncheckedCreateInputObjectSchema ]), update: z.union([ GeoStatusLogUpdateInputObjectSchema, GeoStatusLogUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogUpsertArgs>;

export const GeoStatusLogUpsertOneZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), include: GeoStatusLogIncludeObjectSchema.optional(), where: GeoStatusLogWhereUniqueInputObjectSchema, create: z.union([ GeoStatusLogCreateInputObjectSchema, GeoStatusLogUncheckedCreateInputObjectSchema ]), update: z.union([ GeoStatusLogUpdateInputObjectSchema, GeoStatusLogUncheckedUpdateInputObjectSchema ]) }).strict();