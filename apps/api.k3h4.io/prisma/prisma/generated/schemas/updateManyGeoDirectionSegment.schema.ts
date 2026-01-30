import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSegmentUpdateManyMutationInputObjectSchema as GeoDirectionSegmentUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionSegmentUpdateManyMutationInput.schema';
import { GeoDirectionSegmentWhereInputObjectSchema as GeoDirectionSegmentWhereInputObjectSchema } from './objects/GeoDirectionSegmentWhereInput.schema';

export const GeoDirectionSegmentUpdateManySchema: z.ZodType<Prisma.GeoDirectionSegmentUpdateManyArgs> = z.object({ data: GeoDirectionSegmentUpdateManyMutationInputObjectSchema, where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionSegmentUpdateManyArgs>;

export const GeoDirectionSegmentUpdateManyZodSchema = z.object({ data: GeoDirectionSegmentUpdateManyMutationInputObjectSchema, where: GeoDirectionSegmentWhereInputObjectSchema.optional() }).strict();