import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './objects/GeoDirectionSegmentInclude.schema';
import { GeoDirectionSegmentUpdateInputObjectSchema as GeoDirectionSegmentUpdateInputObjectSchema } from './objects/GeoDirectionSegmentUpdateInput.schema';
import { GeoDirectionSegmentUncheckedUpdateInputObjectSchema as GeoDirectionSegmentUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionSegmentUncheckedUpdateInput.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './objects/GeoDirectionSegmentWhereUniqueInput.schema';

export const GeoDirectionSegmentUpdateOneSchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), data: z.union([GeoDirectionSegmentUpdateInputObjectSchema, GeoDirectionSegmentUncheckedUpdateInputObjectSchema]), where: GeoDirectionSegmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateArgs>;

export const GeoDirectionSegmentUpdateOneZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), data: z.union([GeoDirectionSegmentUpdateInputObjectSchema, GeoDirectionSegmentUncheckedUpdateInputObjectSchema]), where: GeoDirectionSegmentWhereUniqueInputObjectSchema }).strict();