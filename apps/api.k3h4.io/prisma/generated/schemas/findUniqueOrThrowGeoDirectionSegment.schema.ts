import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentIncludeObjectSchema as GeoDirectionSegmentIncludeObjectSchema } from './objects/GeoDirectionSegmentInclude.schema';
import { GeoDirectionSegmentWhereUniqueInputObjectSchema as GeoDirectionSegmentWhereUniqueInputObjectSchema } from './objects/GeoDirectionSegmentWhereUniqueInput.schema';

export const GeoDirectionSegmentFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoDirectionSegmentFindUniqueOrThrowArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), where: GeoDirectionSegmentWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentFindUniqueOrThrowArgs>;

export const GeoDirectionSegmentFindUniqueOrThrowZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), include: GeoDirectionSegmentIncludeObjectSchema.optional(), where: GeoDirectionSegmentWhereUniqueInputObjectSchema }).strict();