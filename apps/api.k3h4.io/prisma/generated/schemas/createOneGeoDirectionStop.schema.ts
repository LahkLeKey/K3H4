import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopCreateInputObjectSchema as GeoDirectionStopCreateInputObjectSchema } from './objects/GeoDirectionStopCreateInput.schema';
import { GeoDirectionStopUncheckedCreateInputObjectSchema as GeoDirectionStopUncheckedCreateInputObjectSchema } from './objects/GeoDirectionStopUncheckedCreateInput.schema';

export const GeoDirectionStopCreateOneSchema: z.ZodType<Prisma.GeoDirectionStopCreateArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), data: z.union([GeoDirectionStopCreateInputObjectSchema, GeoDirectionStopUncheckedCreateInputObjectSchema]) }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopCreateArgs>;

export const GeoDirectionStopCreateOneZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), data: z.union([GeoDirectionStopCreateInputObjectSchema, GeoDirectionStopUncheckedCreateInputObjectSchema]) }).strict();