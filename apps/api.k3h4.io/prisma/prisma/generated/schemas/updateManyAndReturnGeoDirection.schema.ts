import type { Prisma } from '@prisma/client';
import * as z from 'zod';
import { GeoDirectionSelectObjectSchema as GeoDirectionSelectObjectSchema } from './objects/GeoDirectionSelect.schema';
import { GeoDirectionUpdateManyMutationInputObjectSchema as GeoDirectionUpdateManyMutationInputObjectSchema } from './objects/GeoDirectionUpdateManyMutationInput.schema';
import { GeoDirectionWhereInputObjectSchema as GeoDirectionWhereInputObjectSchema } from './objects/GeoDirectionWhereInput.schema';

export const GeoDirectionUpdateManyAndReturnSchema: z.ZodType<Prisma.GeoDirectionUpdateManyAndReturnArgs> = z.object({ select: GeoDirectionSelectObjectSchema.optional(), data: GeoDirectionUpdateManyMutationInputObjectSchema, where: GeoDirectionWhereInputObjectSchema.optional() }).strict() as unknown as z.ZodType<Prisma.GeoDirectionUpdateManyAndReturnArgs>;

export const GeoDirectionUpdateManyAndReturnZodSchema = z.object({ select: GeoDirectionSelectObjectSchema.optional(), data: GeoDirectionUpdateManyMutationInputObjectSchema, where: GeoDirectionWhereInputObjectSchema.optional() }).strict();