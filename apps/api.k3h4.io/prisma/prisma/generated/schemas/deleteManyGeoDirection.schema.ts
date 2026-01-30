import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './objects/GeoDirectionWhereInput.schema';

export const GeoDirectionDeleteManySchema: z.ZodType<Prisma.GeoDirectionDeleteManyArgs> = z.object({ where: GeoDirectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionDeleteManyArgs>;

export const GeoDirectionDeleteManyZodSchema = z.object({ where: GeoDirectionWhereInputObjectSchema.optional() }).strict();