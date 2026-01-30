import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopIncludeObjectSchema as GeoDirectionStopIncludeObjectSchema } from './objects/GeoDirectionStopInclude.schema';
import { GeoDirectionStopUpdateInputObjectSchema as GeoDirectionStopUpdateInputObjectSchema } from './objects/GeoDirectionStopUpdateInput.schema';
import { GeoDirectionStopUncheckedUpdateInputObjectSchema as GeoDirectionStopUncheckedUpdateInputObjectSchema } from './objects/GeoDirectionStopUncheckedUpdateInput.schema';
import { GeoDirectionStopWhereUniqueInputObjectSchema as GeoDirectionStopWhereUniqueInputObjectSchema } from './objects/GeoDirectionStopWhereUniqueInput.schema';

export const GeoDirectionStopUpdateOneSchema: z.ZodType<Prisma.GeoDirectionStopUpdateArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), data: z.union([GeoDirectionStopUpdateInputObjectSchema, GeoDirectionStopUncheckedUpdateInputObjectSchema]), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateArgs>;

export const GeoDirectionStopUpdateOneZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), include: GeoDirectionStopIncludeObjectSchema.optional(), data: z.union([GeoDirectionStopUpdateInputObjectSchema, GeoDirectionStopUncheckedUpdateInputObjectSchema]), where: GeoDirectionStopWhereUniqueInputObjectSchema }).strict();