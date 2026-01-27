import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';
import { GeoDirectionStopCreateInputObjectSchema as GeoDirectionStopCreateInputObjectSchema } from './objects/GeoDirectionStopCreateInput.schema';
import { GeoDirectionStopUncheckedCreateInputObjectSchema as GeoDirectionStopUncheckedCreateInputObjectSchema } from './objects/GeoDirectionStopUncheckedCreateInput.schema';
import { GeoDirectionStopUpdateInputObjectSchema as GeoDirectionStopUpdateInputObjectSchema } from './objects/GeoDirectionStopUpdateInput.schema';
import { GeoDirectionStopUncheckedUpdateInputObjectSchema as GeoDirectionStopUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionStopUncheckedUpdateInput.schema';

export const GeoDirectionStopUpsertOneSchema: z.ZodType<Prisma.GeoDirectionStopUpsertArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionStopCreateInputObjectSchema, GeoDirectionStopUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionStopUpdateInputObjectSchema, GeoDirectionStopUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopUpsertArgs>;

export const GeoDirectionStopUpsertOneZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionStopCreateInputObjectSchema, GeoDirectionStopUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionStopUpdateInputObjectSchema, GeoDirectionStopUncheckedUpdateInputObjectSchema ]) }).strict();