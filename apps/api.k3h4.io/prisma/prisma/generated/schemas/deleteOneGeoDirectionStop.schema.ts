import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';

export const GeoDirectionStopDeleteOneSchema: z.ZodType<Prisma.GeoDirectionStopDeleteArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopDeleteArgs>;

export const GeoDirectionStopDeleteOneZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict();