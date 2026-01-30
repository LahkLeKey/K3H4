import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionIncludeObjectSchema as GeoDirectionIncludeObjectSchema } from './objects/GeoDirectionInclude.schema';
import { GeoDirectionWhereUniqueInputObjectSchema as GeoDirectionWhereUniqueInputObjectSchema } from './objects/GeoDirectionWhereUniqueInput.schema';
import { GeoDirectionCreateInputObjectSchema as GeoDirectionCreateInputObjectSchema } from './objects/GeoDirectionCreateInput.schema';
import { GeoDirectionUncheckedCreateInputObjectSchema as GeoDirectionUncheckedCreateInputObjectSchema } from './objects/GeoDirectionUncheckedCreateInput.schema';
import { GeoDirectionUpdateInputObjectSchema as GeoDirectionUpdateInputObjectSchema } from './objects/GeoDirectionUpdateInput.schema';
import { GeoDirectionUncheckedUpdateInputObjectSchema as GeoDirectionUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionUncheckedUpdateInput.schema';

export const GeoDirectionUpsertOneSchema: z.ZodType<Prisma.GeoDirectionUpsertArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionCreateInputObjectSchema, GeoDirectionUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionUpdateInputObjectSchema, GeoDirectionUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionUpsertArgs>;

export const GeoDirectionUpsertOneZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), include: GeoDirectionIncludeObjectSchema.optional(), where: GeoDirectionWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionCreateInputObjectSchema, GeoDirectionUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionUpdateInputObjectSchema, GeoDirectionUncheckedUpdateInputObjectSchema ]) }).strict();