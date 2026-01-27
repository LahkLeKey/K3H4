import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './objects/GeoDirectionSegmentWhereInput.schema';

export const GeoDirectionSegmentDeleteManySchema: z.ZodType<Prisma.GeoDirectionSegmentDeleteManyArgs> = z.object({ where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentDeleteManyArgs>;

export const GeoDirectionSegmentDeleteManyZodSchema = z.object({ where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict();