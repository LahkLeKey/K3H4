import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';

export const GeoDirectionStopFindUniqueOrThrowSchema: z.ZodType<Prisma.GeoDirectionStopFindUniqueOrThrowArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopFindUniqueOrThrowArgs>;

export const GeoDirectionStopFindUniqueOrThrowZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict();