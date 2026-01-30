import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionUpdateManyMutationInputObjectSchema as GeoDirectionUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionUpdateManyMutationInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './objects/GeoDirectionWhereInput.schema';

export const GeoDirectionUpdateManySchema: z.ZodType<Prisma.GeoDirectionUpdateManyArgs> = z.object({ data: GeoDirectionUpdateManyMutationInputObjectSchema, where: GeoDirectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyArgs>;

export const GeoDirectionUpdateManyZodSchema = z.object({ data: GeoDirectionUpdateManyMutationInputObjectSchema, where: GeoDirectionWhereInputObjectSchema.optional() }).strict();