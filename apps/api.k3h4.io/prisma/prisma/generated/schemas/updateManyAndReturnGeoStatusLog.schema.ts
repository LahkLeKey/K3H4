import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoStatusLogSelectObjectSchema as GeoStatusLogSelectObjectSchema } from './objects/GeoStatusLogSelect.schema';
import { GeoStatusLogUpdateManyMutationInputObjectSchema as GeoStatusLogUpdateManyMutationInputObjectSchema } from './objects/GeoStatusLogUpdateManyMutationInput.schema';
import { GeoStatusLogWhereInputObjectSchema as GeoStatusLogWhereInputObjectSchema } from './objects/GeoStatusLogWhereInput.schema';

export const GeoStatusLogUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoStatusLogUpdateManyAndReturnArgs> = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), data: GeoStatusLogUpdateManyMutationInputObjectSchema, where: GeoStatusLogWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoStatusLogUpdateManyAndReturnArgs>;

export const GeoStatusLogUpdateManyAndReturnZodSchema = z.object({ select: GeoStatusLogSelectObjectSchema.optional(), data: GeoStatusLogUpdateManyMutationInputObjectSchema, where: GeoStatusLogWhereInputObjectSchema.optional() }).strict();