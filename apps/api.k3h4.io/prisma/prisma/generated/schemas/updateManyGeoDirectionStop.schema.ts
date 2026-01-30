import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionStopUpdateManyMutationInputObjectSchema as GeoDirectionStopUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionStopUpdateManyMutationInput.schema';
import { GeoDirectionStopWhereInputObjectSchema as GeoDirectionStopWhereInputObjectSchema } from './objects/GeoDirectionStopWhereInput.schema';

export const GeoDirectionStopUpdateManySchema: z.ZodType<Prisma.GeoDirectionStopUpdateManyArgs> = z.object({ data: GeoDirectionStopUpdateManyMutationInputObjectSchema, where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionStopUpdateManyArgs>;

export const GeoDirectionStopUpdateManyZodSchema = z.object({ data: GeoDirectionStopUpdateManyMutationInputObjectSchema, where: GeoDirectionStopWhereInputObjectSchema.optional() }).strict();