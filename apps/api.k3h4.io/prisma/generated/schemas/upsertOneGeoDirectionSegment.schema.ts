import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './objects/GeoDirectionSegmentInclude.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './objects/GeoDirectionSegmentWhereUniqueInput.schema';
import { GeoDirectionSegmentCreateInputObjectSchema as GeoDirectionSegmentCreateInputObjectSchema } from './objects/GeoDirectionSegmentCreateInput.schema';
import { GeoDirectionSegmentUncheckedCreateInputObjectSchema as GeoDirectionSegmentUncheckedCreateInputObjectSchema } from './objects/GeoDirectionSegmentUncheckedCreateInput.schema';
import { GeoDirectionSegmentUpdateInputObjectSchema as GeoDirectionSegmentUpdateInputObjectSchema } from './objects/GeoDirectionSegmentUpdateInput.schema';
import { GeoDirectionSegmentUncheckedUpdateInputObjectSchema as GeoDirectionSegmentUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionSegmentUncheckedUpdateInput.schema';

export const GeoDirectionSegmentUpsertOneSchema: z.ZodType<Prisma.GeoDirectionSegmentUpsertArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), where: GeoDirectionSegmentWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionSegmentCreateInputObjectSchema, GeoDirectionSegmentUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionSegmentUpdateInputObjectSchema, GeoDirectionSegmentUncheckedUpdateInputObjectSchema ]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpsertArgs>;

export const GeoDirectionSegmentUpsertOneZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), where: GeoDirectionSegmentWhereUniqueInputObjectSchema, create: z.union([ GeoDirectionSegmentCreateInputObjectSchema, GeoDirectionSegmentUncheckedCreateInputObjectSchema ]), update: z.union([ GeoDirectionSegmentUpdateInputObjectSchema, GeoDirectionSegmentUncheckedUpdateInputObjectSchema ]) }).strict();