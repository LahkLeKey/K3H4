import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentSelectObjectSchema as GeoDirectionSegmentSelectObjectSchema } from './objects/GeoDirectionSegmentSelect.schema';
import { GeoDirectionSegmentUpdateManyMutationInputObjectSchema as GeoDirectionSegmentUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionSegmentUpdateManyMutationInput.schema';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './objects/GeoDirectionSegmentWhereInput.schema';

export const GeoDirectionSegmentUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateManyAndReturnArgs> = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), data: GeoDirectionSegmentUpdateManyMutationInputObjectSchema, where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateManyAndReturnArgs>;

export const GeoDirectionSegmentUpdateManyAndReturnZodSchema = z.object({ select: GeoDirectionSegmentSelectObjectSchema.optional(), data: GeoDirectionSegmentUpdateManyMutationInputObjectSchema, where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict();