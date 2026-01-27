import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopSelectObjectSchema as GeoDirectionStopSelectObjectSchema } from './objects/GeoDirectionStopSelect.schema';
import { GeoDirectionStopUpdateManyMutationInputObjectSchema as GeoDirectionStopUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionStopUpdateManyMutationInput.schema';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './objects/GeoDirectionStopWhereInput.schema';

export const GeoDirectionStopUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionStopUpdateManyAndReturnArgs> = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), data: GeoDirectionStopUpdateManyMutationInputObjectSchema, where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateManyAndReturnArgs>;

export const GeoDirectionStopUpdateManyAndReturnZodSchema = z.object({ select: GeoDirectionStopSelectObjectSchema.optional(), data: GeoDirectionStopUpdateManyMutationInputObjectSchema, where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict();