import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogUpdateManyMutationInputObjectSchema as GeoStatusLogUpdateManyMutationInputObjectSchema } from './objects/GeoStatusLogUpdateManyMutationInput.schema';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './objects/GeoStatusLogWhereInput.schema';

export const GeoStatusLogUpdateManySchema: z.ZodType<Prisma.GeoStatusLogUpdateManyArgs> = z.object({ data: GeoStatusLogUpdateManyMutationInputObjectSchema, where: GeoStatusLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateManyArgs>;

export const GeoStatusLogUpdateManyZodSchema = z.object({ data: GeoStatusLogUpdateManyMutationInputObjectSchema, where: GeoStatusLogWhereInputObjectSchema.optional() }).strict();