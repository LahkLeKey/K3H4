import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';

export const GeoDirectionStopFindUniqueSchema: z.ZodType<Prisma.GeoDirectionStopFindUniqueArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopFindUniqueArgs>;

export const GeoDirectionStopFindUniqueZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict();