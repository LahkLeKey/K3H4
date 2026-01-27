import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './objects/GeoDirectionSegmentInclude.schema';
import { GeoDirectionSegmentCreateInputObjectSchema as GeoDirectionSegmentCreateInputObjectSchema } from './objects/GeoDirectionSegmentCreateInput.schema';
import { GeoDirectionSegmentUncheckedCreateInputObjectSchema as GeoDirectionSegmentUncheckedCreateInputObjectSchema } from './objects/GeoDirectionSegmentUncheckedCreateInput.schema';

export const GeoDirectionSegmentCreateOneSchema: z.ZodType<Prisma.GeoDirectionSegmentCreateArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), data: z.union([GeoDirectionSegmentCreateInputObjectSchema, GeoDirectionSegmentUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentCreateArgs>;

export const GeoDirectionSegmentCreateOneZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), data: z.union([GeoDirectionSegmentCreateInputObjectSchema, GeoDirectionSegmentUncheckedCreateInputObjectSchema]) }).strict();